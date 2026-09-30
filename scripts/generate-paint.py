#!/usr/bin/env python3
"""
Genererar penseldrags-bilder till rubrikerna (src/assets/paint/).

Varje variant består av två bilder med samma vertikala upplägg:
  - body: heltäckande färg med borststrån, sträcks över rubrikens bredd
  - cap:  slutet på draget, med trasiga borstspetsar och stänk

Draget är en enkel penselsimulering: flera överlappande drag, där varje borststrå
har egen färgmängd och egen slutpunkt (torrpensel mot slutet). Höjdkartan belyses
sedan för att få tjock, glansig färg. Kör om skriptet om varumärkesfärgen ändras:

    python3 scripts/generate-paint.py
"""
import math
import os

import numpy as np
from PIL import Image
from scipy.ndimage import distance_transform_edt, gaussian_filter, gaussian_filter1d

OUT = os.path.join(os.path.dirname(__file__), "..", "src", "assets", "paint")
H = 300


def oklch_to_srgb(L, C, h):
    a = C * math.cos(math.radians(h))
    b = C * math.sin(math.radians(h))
    l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s_ = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    rgb = [
        4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
        -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
        -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_,
    ]

    def enc(x):
        x = min(1.0, max(0.0, x))
        return 12.92 * x if x <= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055

    return np.array([enc(v) for v in rgb])


# Samma färg som --primary i src/styles.css
PAINT = oklch_to_srgb(0.336, 0.048, 254)


def norm(a):
    a = a - a.mean()
    return a / (a.std() + 1e-9)


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def make_layer(kind, layout, seed):
    W = {"body": 1400, "cap": 1200, "under": 800}[kind]
    H = 100 if kind == "under" else 300
    rng = np.random.default_rng(seed)
    yy = np.arange(H, dtype=np.float32)[:, None]
    xx = np.arange(W, dtype=np.float32)[None, :]

    # Borststrå-nivå: varje rad har egen färgmängd, och grupper av strån hänger ihop.
    bristle = norm(gaussian_filter1d(rng.standard_normal(H), 0.9))
    clump = norm(gaussian_filter1d(rng.standard_normal(H), 6))
    streak = norm(gaussian_filter(rng.standard_normal((H, W)), (0.9, 55)))
    groove = norm(gaussian_filter(rng.standard_normal((H, W)), (0.7, 38)))
    breakup = norm(gaussian_filter(rng.standard_normal((H, W)), (0.8, 7)))

    alpha_total = np.zeros((H, W), np.float32)
    height_total = np.zeros((H, W), np.float32)
    keep = np.ones((H, W), np.float32)

    for idx, (ya, yb, end) in enumerate(layout):
        seam = 0.35 if idx > 0 else 1.0
        top = ya + seam * (3.2 * norm(gaussian_filter1d(rng.standard_normal(W), 3.0)) + 3.5 * norm(gaussian_filter1d(rng.standard_normal(W), 28)))
        bot = yb + 3.2 * norm(gaussian_filter1d(rng.standard_normal(W), 3.0)) + 3.5 * norm(gaussian_filter1d(rng.standard_normal(W), 28))
        vert = np.clip((yy - top[None, :]) / 2.5, 0, 1) * np.clip((bot[None, :] - yy) / 2.5, 0, 1)

        load = np.clip(0.86 + 0.08 * bristle + 0.06 * clump, 0.5, 1.1)[:, None]

        if kind in ("cap", "under"):
            # Varje strå slutar på sin egen plats: det ger trasiga fingrar.
            n_row = np.tanh(0.7 * clump + 0.8 * norm(gaussian_filter1d(rng.standard_normal(H), 1.4)))
            end_row = (W - end) - 40 - 55 * n_row
            end_row = end_row[:, None]
            span = 95 + 60 * np.abs(n_row)[:, None]
            dec = np.clip((end_row - xx) / span, 0, 1) ** 0.6
            wet = 1 - dec
            if kind == "under":
                # Understrykning: trasig start också.
                st = np.tanh(0.7 * clump + 0.8 * norm(gaussian_filter1d(rng.standard_normal(H), 1.4)))
                start_row = (30 + 40 * st)[:, None]
                dec = dec * np.clip((xx - start_row) / (60 + 40 * np.abs(st)[:, None]), 0, 1) ** 0.6
                wet = 1 - dec
        else:
            dec = np.ones((H, W), np.float32)
            wet = np.zeros((H, W), np.float32)

        tex = 1 + 0.15 * streak
        thick = vert * dec * load * tex
        cover = thick + 0.14 * breakup * wet * vert * np.clip(dec * 5, 0, 1)
        alpha = smoothstep(0.12, 0.26, cover) * smoothstep(0.0, 1.0, vert * 1.2)
        alpha = gaussian_filter(alpha, 0.6).astype(np.float32)

        # Höjd: platå, upphöjd kant längs draget och räfflor efter borststråna.
        inside = distance_transform_edt(alpha > 0.5).astype(np.float32)
        plateau = 0.62 + 0.30 * np.clip(tex, 0.5, 1.5) * dec
        rim = (0.30 if idx == 0 else 0.16) * np.exp(-(((inside - 5.0) / 3.6) ** 2))
        h = alpha * (plateau + rim + 0.05 * groove * dec)

        alpha_total = 1 - (1 - alpha_total) * (1 - alpha)
        height_total = height_total * (1 - 0.35 * alpha) + h
        keep *= 1 - alpha

    if kind == "cap":
        # Stänk runt slutet.
        drops = []
        for _ in range(9):
            x = rng.uniform(W - 340, W - 6)
            y = rng.uniform(layout[0][0] - 22, layout[-1][1] + 34)
            r = rng.uniform(2.2, 6.5)
            drops.append((x, y, r))
        for (x, y, r) in drops:
            if 0 <= int(y) < H and 0 <= int(x) < W and alpha_total[int(y), int(x)] > 0.05:
                continue
            d = np.sqrt((xx - x) ** 2 + (yy - y) ** 2)
            a = smoothstep(r + 0.8, r - 0.6, d)
            dome = np.sqrt(np.clip(1 - (d / r) ** 2, 0, 1)) * 1.2
            alpha_total = 1 - (1 - alpha_total) * (1 - a)
            height_total = height_total + a * dome

    # Belysning från övre vänstra hörnet.
    hs = gaussian_filter(height_total, 0.9)
    gy, gx = np.gradient(hs)
    k = 3.4
    nz = 1.0 / np.sqrt((k * gx) ** 2 + (k * gy) ** 2 + 1)
    nx, ny = -k * gx * nz, -k * gy * nz
    light = np.array([-0.35, -0.65, 0.68])
    light /= np.linalg.norm(light)
    diffuse = np.clip(nx * light[0] + ny * light[1] + nz * light[2], 0, 1)
    shade = np.clip(diffuse / light[2], 0.5, 1.55) ** 1.0
    half = light + np.array([0, 0, 1.0])
    half /= np.linalg.norm(half)
    spec = np.clip(nx * half[0] + ny * half[1] + nz * half[2], 0, 1) ** 30

    hue_var = (1 + 0.035 * bristle[:, None] + 0.025 * norm(gaussian_filter1d(rng.standard_normal(W), 90))[None, :])
    rgb = PAINT[None, None, :] * (0.94 * shade * hue_var)[..., None]
    rgb = rgb + (spec * 0.22)[..., None] * (1 - rgb)
    rgb = np.clip(rgb, 0, 1)

    out = np.dstack([rgb * 255, np.clip(alpha_total, 0, 1) * 255]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


LAYOUTS = {
    # (ovankant, nederkant, slutförskjutning för cap)
    "a": [(38, 128, 200), (104, 200, 60), (172, 262, 300)],
    "b": [(40, 110, 120), (90, 170, 320), (150, 225, 40), (200, 262, 220)],
    "c": [(36, 160, 90), (130, 264, 260)],
}


UNDER = [(34, 66, 0)]

# Sektionsfärger (samma som --background och --tint i src/styles.css)
TONES = {
    "beige": oklch_to_srgb(0.968, 0.006, 85),
    "tint": oklch_to_srgb(0.934, 0.014, 80),
}


def make_edge(color, seed, W=1600, H=110):
    """Kant där färg rullats/penslats över föregående sektion: tjock kant, två överlappande drag."""
    rng = np.random.default_rng(seed)
    yy = np.arange(H, dtype=np.float32)[:, None]
    xs = np.arange(W, dtype=np.float32)

    def curve(base, big):
        e = base + big * norm(gaussian_filter1d(rng.standard_normal(W), 110))
        e += 4.5 * norm(gaussian_filter1d(rng.standard_normal(W), 20))
        e += 1.3 * norm(gaussian_filter1d(rng.standard_normal(W), 2.2))
        # Penselstrån som sticker upp där färgen tagit slut.
        for _ in range(20):
            cx = rng.uniform(0, W)
            w = rng.uniform(5, 14)
            amp = rng.uniform(2, 6)
            e -= amp * np.clip(1 - np.abs(xs - cx) / w, 0, 1) ** 1.1
        return e

    e1 = curve(46, 11)
    e2 = curve(56, 11)
    top = np.minimum(e1, e2)

    streak = norm(gaussian_filter(rng.standard_normal((H, W)), (0.8, 60)))
    height = np.zeros((H, W), np.float32)
    alpha_total = np.zeros((H, W), np.float32)
    for e, gain in ((e1, 1.0), (e2, 0.7)):
        a = smoothstep(0.0, 1.6, yy - e[None, :]).astype(np.float32)
        inside = np.clip(yy - e[None, :], 0, None)
        rim = 0.34 * np.exp(-(((inside - 4.0) / 3.2) ** 2))
        height += a * gain * (0.7 + rim + 0.05 * streak)
        alpha_total = 1 - (1 - alpha_total) * (1 - a)

    hs = gaussian_filter(height, 0.8)
    gy, gx = np.gradient(hs)
    k = 3.0
    nz = 1.0 / np.sqrt((k * gx) ** 2 + (k * gy) ** 2 + 1)
    nx, ny = -k * gx * nz, -k * gy * nz
    light = np.array([-0.3, -0.7, 0.65])
    light /= np.linalg.norm(light)
    diffuse = np.clip(nx * light[0] + ny * light[1] + nz * light[2], 0, 1)
    dev = np.clip(diffuse / light[2], 0.4, 1.6) - 1.0
    fade = np.clip(1 - (yy - top[None, :]) / 30.0, 0, 1) ** 1.3
    # Ljus färg tål inte mer ljus: dämpa högdagrar, behåll skuggorna.
    rgb = color[None, None, :] * (1 + np.where(dev > 0, 0.05, 0.14) * dev * fade)[..., None]
    rgb = np.clip(rgb, 0, 1)

    # Mjuk skugga på föregående sektion, direkt ovanför kanten.
    halo = gaussian_filter(alpha_total, (5, 7))
    sa = np.clip(0.30 * halo * (1 - alpha_total), 0, 1)
    dark = np.array([0.10, 0.11, 0.15])
    a_out = alpha_total + sa * (1 - alpha_total)
    c_out = (rgb * alpha_total[..., None] + dark[None, None, :] * (sa * (1 - alpha_total))[..., None]) / np.maximum(a_out, 1e-4)[..., None]
    out = np.dstack([np.clip(c_out, 0, 1) * 255, np.clip(a_out, 0, 1) * 255]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def main():
    os.makedirs(OUT, exist_ok=True)
    for i, (name, layout) in enumerate(LAYOUTS.items()):
        for kind in ("body", "cap"):
            img = make_layer(kind, layout, seed=101 + i * 17 + (0 if kind == "body" else 5))
            path = os.path.join(OUT, f"{kind}-{name}.webp")
            img.save(path, "WEBP", quality=86, method=6)
            print(path, img.size, os.path.getsize(path) // 1024, "KB")
    for tone, col in TONES.items():
        for j, n in enumerate("abc"):
            img = make_edge(col, seed=500 + j * 31 + (0 if tone == "beige" else 7))
            path = os.path.join(OUT, f"edge-{tone}-{n}.webp")
            img.save(path, "WEBP", quality=92, method=6)
            print(path, img.size, os.path.getsize(path) // 1024, "KB")
    for i in range(2):
        img = make_layer("under", UNDER, seed=300 + i * 13)
        path = os.path.join(OUT, f"under-{'ab'[i]}.webp")
        img.save(path, "WEBP", quality=86, method=6)
        print(path, img.size, os.path.getsize(path) // 1024, "KB")


if __name__ == "__main__":
    main()
