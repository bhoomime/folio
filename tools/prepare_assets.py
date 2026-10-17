"""
Turns Bhoomie's hand-drawn PNGs into transparent, separable layers for the site.

Each drawing is split into an "ink" layer (black lines) and an "accent" layer
(red ink), saved as transparent PNGs. The site uses them as CSS masks, so the
same drawing can be recoloured per theme (paper: black/red, blueprint: white/yellow).
Moving parts (pupils, flower heads, wall frames) are cut into their own files.

Run from the project root:  python tools/prepare_assets.py
"""
import json
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "site" / "assets" / "art"
OUT.mkdir(parents=True, exist_ok=True)
BG = 247  # the paper colour of the source drawings (#F7F7F7)
manifest = {}


def load(name):
    return np.asarray(Image.open(ROOT / name).convert("RGB")).astype(float)


def split(a):
    """Return (ink_alpha, red_alpha) in 0..1 using a colour-to-alpha against the paper."""
    r, g = a[..., 0], a[..., 1]
    dg, dr = BG - g, BG - r
    red_m = (dg > 6) & (dr < 0.45 * dg)
    red_a = np.clip(dg / (BG - 41), 0, 1) * red_m
    lum = a.mean(2)
    dark = np.percentile(lum[(BG - lum) > 60], 5) if ((BG - lum) > 60).any() else 0
    ink_a = np.clip((BG - lum) / (BG - dark), 0, 1) * (~red_m)
    ink_a[ink_a < 0.04] = 0
    return ink_a ** 0.9, red_a


def save(alpha, rgb, name, box=None, pad=4):
    if box is not None:
        x0, y0, x1, y1 = box
        alpha = alpha[y0:y1, x0:x1]
    h, w = alpha.shape
    img = np.zeros((h, w, 4), np.uint8)
    img[..., 0], img[..., 1], img[..., 2] = rgb
    img[..., 3] = (alpha * 255).round().astype(np.uint8)
    Image.fromarray(img, "RGBA").save(OUT / f"{name}.png", optimize=True)
    manifest[name] = {"w": w, "h": h}
    return w, h


def components(mask, minsize=1):
    h, w = mask.shape
    lab = np.zeros((h, w), np.int32)
    out, n = [], 0
    for y0, x0 in zip(*np.nonzero(mask)):
        if lab[y0, x0]:
            continue
        n += 1
        q = deque([(y0, x0)])
        lab[y0, x0] = n
        cnt, xs, ys = 0, [], []
        while q:
            y, x = q.popleft()
            cnt += 1
            xs.append(x)
            ys.append(y)
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    yy, xx = y + dy, x + dx
                    if 0 <= yy < h and 0 <= xx < w and mask[yy, xx] and not lab[yy, xx]:
                        lab[yy, xx] = n
                        q.append((yy, xx))
        if cnt >= minsize:
            out.append({"id": n, "size": cnt, "box": [int(min(xs)), int(min(ys)), int(max(xs)) + 1, int(max(ys)) + 1]})
    return lab, out


def grow(box, p, w, h):
    x0, y0, x1, y1 = box
    return [max(0, x0 - p), max(0, y0 - p), min(w, x1 + p), min(h, y1 + p)]


INK, RED = (17, 17, 17), (254, 41, 23)

# ---------------------------------------------------------------- gallery wall
wall = load("WhatsApp Image 2026-05-13 at 9.52.44 PM 1.png")
ink, red = split(wall)
H, W = ink.shape
frames = {
    "mushroom": (150, 204, 434, 640), "smiley": (478, 243, 627, 478),
    "board": (660, 222, 1191, 659), "cat": (1228, 231, 1504, 697),
    "square": (114, 676, 475, 1025), "big": (529, 702, 967, 1262),
    "waves": (1014, 735, 1295, 966), "pot": (1019, 1026, 1198, 1252),
}
wall_layout = {"w": W, "h": H, "frames": {}}
for k, b in frames.items():
    b = grow(b, 5, W, H)
    save(ink, INK, f"wall-{k}-ink", b)
    has_red = red[b[1]:b[3], b[0]:b[2]].max() > 0.3
    if has_red:
        save(red, RED, f"wall-{k}-red", b)
    wall_layout["frames"][k] = {"box": b, "red": bool(has_red)}

# ---------------------------------------------------------------- fire-hair portrait
fire = load("WhatsApp Image 2026-05-10 at 5.11.36 PM (4) 1.png")
ink, red = split(fire)
H, W = ink.shape
lab, rc = components(red > 0.25, 30)
rc.sort(key=lambda c: -c["size"])
flame, pupils = rc[0], sorted(rc[1:3], key=lambda c: c["box"][0])
flame_a = red * np.isin(lab, [flame["id"]]).astype(float)
# keep the soft anti-aliased fringe around the flame
flame_a = np.where(red > 0, red, 0) * (1 - np.isin(lab, [p["id"] for p in pupils]))
for p in pupils:
    x0, y0, x1, y1 = grow(p["box"], 6, W, H)
    flame_a[y0:y1, x0:x1] = 0
save(ink, INK, "fire-ink")
save(flame_a, RED, "fire-flame")
fire_layout = {"w": W, "h": H, "pupils": []}
for i, p in enumerate(pupils):
    b = grow(p["box"], 6, W, H)
    save(red, RED, f"fire-pupil-{'lr'[i]}", b)
    fire_layout["pupils"].append(b)

# ---------------------------------------------------------------- resume girl
res = load("WhatsApp Image 2026-05-10 at 5.11.36 PM (3) 1.png")
ink, red = split(res)
H, W = ink.shape
lab, kc = components(ink > 0.25, 8)
# the two "+" sparkle pupils inside the lenses
pupil_boxes = sorted([c for c in kc if 200 < c["size"] < 450 and 330 < c["box"][1] < 440], key=lambda c: c["box"][0])
res_layout = {"w": W, "h": H, "pupils": []}
ink_wo = ink.copy()
for i, p in enumerate(pupil_boxes):
    b = grow(p["box"], 5, W, H)
    save(ink, INK, f"resume-pupil-{'lr'[i]}", b)
    ink_wo[b[1]:b[3], b[0]:b[2]] = 0
    res_layout["pupils"].append(b)
save(ink_wo, INK, "resume-ink")
save(red, RED, "resume-red")

# ---------------------------------------------------------------- vase of flowers
vase = load("WhatsApp Image 2026-05-09 at 10.32.24 PM 1.png")
ink, red = split(vase)
H, W = ink.shape
rlab, rc = components(red > 0.25, 5000)
klab, kc = components(ink > 0.25, 4)
dots = [c for c in kc if c["size"] < 60]
vase_ink = ink.copy()
vase_layout = {"w": W, "h": H, "flowers": []}
for i, f in enumerate(sorted(rc, key=lambda c: c["box"][0])):
    b = grow(f["box"], 6, W, H)
    petal = red * 0
    sl = (slice(b[1], b[3]), slice(b[0], b[2]))
    petal[sl] = red[sl] * (rlab[sl] == f["id"]) + red[sl] * (rlab[sl] == 0) * (red[sl] < 0.25)
    dot = ink * 0
    for d in dots:
        x0, y0, x1, y1 = d["box"]
        if b[0] <= x0 and x1 <= b[2] and b[1] <= y0 and y1 <= b[3]:
            g = grow(d["box"], 2, W, H)
            dot[g[1]:g[3], g[0]:g[2]] = ink[g[1]:g[3], g[0]:g[2]]
            vase_ink[g[1]:g[3], g[0]:g[2]] = 0
    save(petal, RED, f"vase-flower-{i}-petal", b)
    save(dot, INK, f"vase-flower-{i}-dots", b)
    vase_layout["flowers"].append(b)
save(vase_ink, INK, "vase-ink")

# ---------------------------------------------------------------- red flower mark
mark = np.asarray(Image.open(ROOT / "WhatsApp Image 2026-05-10 at 5.48.09 PM.jpeg").convert("RGB")).astype(float)
g = mark[..., 1]
ma = np.clip((255 - g) / (255 - 41), 0, 1) * ((255 - mark[..., 0]) < 0.45 * (255 - g) + 3)
ys, xs = np.nonzero(ma > 0.1)
b = grow([xs.min(), ys.min(), xs.max() + 1, ys.max() + 1], 8, *ma.shape[::-1])
small = Image.fromarray((ma[b[1]:b[3], b[0]:b[2]] * 255).astype(np.uint8)).resize((256, 256), Image.LANCZOS)
img = np.zeros((256, 256, 4), np.uint8)
img[..., :3] = RED
img[..., 3] = np.asarray(small)
Image.fromarray(img, "RGBA").save(OUT / "flower-mark.png", optimize=True)

layout = {"wall": wall_layout, "fire": fire_layout, "resume": res_layout, "vase": vase_layout, "files": manifest}
(OUT / "layout.json").write_text(json.dumps(layout, indent=1))
print(json.dumps({k: v for k, v in layout.items() if k != "files"}))
print("wrote", len(manifest) + 1, "images to", OUT)
