"""
Makes the web-sized copies of the project images, polaroids and Archive pieces.

Full-size originals live in media-src/ (outside site/, so they are never deployed).
For each image this writes WebP copies 512, 1024 and 2048 px wide into
site/assets/media/ as <name>-512.webp etc., never upscaling: a width is only made
when the original is wider than half of it, the same rule fx() and srcset() use in
site/js. MP4s are copied across as they are.

Run from the project root:  python tools/prepare_media.py
To add or swap an image: save it as media-src/<name>.png (or .jpg), run this, then
use im('<name>', width, height, 'alt') in site/js/data.js with the original's size.
"""
import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "media-src"
OUT = ROOT / "site" / "assets" / "media"
WIDTHS = (512, 1024, 2048)
QUALITY = 84
OUT.mkdir(parents=True, exist_ok=True)


def widths_for(w):
    return [s for i, s in enumerate(WIDTHS) if i == 0 or s / 2 < w]


def fresh(dest, src):
    return dest.exists() and dest.stat().st_mtime >= src.stat().st_mtime


made, kept, total = 0, 0, 0
for src in sorted(SRC.iterdir()):
    ext = src.suffix.lower()
    if ext == ".mp4":
        dest = OUT / src.name
        if not fresh(dest, src):
            shutil.copy2(src, dest)
            made += 1
        total += dest.stat().st_size
        continue
    if ext not in (".png", ".jpg", ".jpeg", ".webp"):
        continue
    with Image.open(src) as im:
        im.load()
        w, h = im.size
        alpha = im.mode in ("RGBA", "LA", "P") and im.convert("RGBA").getchannel("A").getextrema()[0] < 255
        im = im.convert("RGBA" if alpha else "RGB")
        for s in widths_for(w):
            dest = OUT / f"{src.stem}-{s}.webp"
            if fresh(dest, src):
                kept += 1
            else:
                tw = min(s, w)
                out = im if tw == w else im.resize((tw, round(h * tw / w)), Image.LANCZOS)
                out.save(dest, "WEBP", quality=QUALITY, method=6, alpha_quality=90)
                made += 1
            total += dest.stat().st_size
    if "-v" in sys.argv:
        print(f"{src.stem:28} {w}x{h}{' alpha' if alpha else ''} -> {widths_for(w)}")

print(f"{made} written, {kept} up to date, {total / 1e6:.1f} MB in {OUT.relative_to(ROOT)}")
