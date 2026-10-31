"""
Turns the hero girl's two short films (one drawn on paper, one on the blue) into transparent
animated WebPs for the site, so her lines sit straight on the page in either theme with no
background box, plus a still of the last frame for reduced motion.

    python tools/prepare_girl.py <paper film.mp4> <blue film.mp4>

Writes site/assets/media/girl-{paper,blue}.webp (plays once, stops on the last frame) and
girl-{paper,blue}-end.webp. Lines are deepened and thickened very slightly (SPREAD) so they match the site's drawings when shown small.
"""
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

OUT = Path(__file__).resolve().parent.parent / "site" / "assets" / "media"
SIZE = 440      # px; shown at most 220 css px wide, so this is 2x
BOOST = 1.4     # how much deeper the ink gets
SPREAD = .4     # how much each line grows into its neighbours (0 = as drawn, .8 was too heavy beside the other drawings)
FPS = 13.78


def ffmpeg():
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        return shutil.which("ffmpeg") or sys.exit("needs ffmpeg (or: pip install imageio-ffmpeg)")


def frames(film, tmp):
    subprocess.run([ffmpeg(), "-v", "error", "-i", str(film), "-fps_mode", "passthrough", str(tmp / "%03d.png")], check=True)
    return sorted(tmp.glob("*.png"))


def paper_colour(a):
    edge = np.concatenate([a[:6].reshape(-1, 3), a[-6:].reshape(-1, 3), a[:, :6].reshape(-1, 3), a[:, -6:].reshape(-1, 3)])
    return np.median(edge, axis=0)


def to_rgba(a, bg, dark_ink):
    """Separate the ink from the film's paper: alpha is how much ink a pixel holds, colour is the ink itself."""
    ink = np.clip(bg - a, 0, None) if dark_ink else np.clip(a - bg, 0, None)
    spread = np.stack([np.asarray(Image.fromarray(ink[..., c].astype(np.uint8)).filter(ImageFilter.MaxFilter(3))) for c in range(3)], axis=-1)
    ink = np.minimum(np.maximum(ink, spread * SPREAD) * BOOST, 255)
    room = np.maximum(bg if dark_ink else 255 - bg, 1)          # how far each channel can travel from the paper
    # on the blue the blue channel has almost no room to brighten, so it would only add noise: read the ink from red and green
    alpha = np.clip((ink / room).max(axis=2) if dark_ink else (ink / room)[..., :2].max(axis=2), 0, 1)
    alpha = np.where(alpha < .06, 0, alpha)
    a3 = np.maximum(alpha[..., None], 1e-3)
    colour = bg - ink / a3 if dark_ink else bg + ink / a3
    rgba = np.dstack([np.clip(colour, 0, 255), alpha * 255]).round().astype(np.uint8)
    rgba[alpha == 0] = 0
    return Image.fromarray(rgba, "RGBA")


def build(film, theme):
    with tempfile.TemporaryDirectory() as t:
        paths = frames(film, Path(t))
        imgs = [np.asarray(Image.open(p).convert("RGB").resize((SIZE, SIZE), Image.LANCZOS)).astype(np.float32) for p in paths]
    bg = paper_colour(imgs[0])
    out = [to_rgba(a, bg, dark_ink=(theme == "paper")) for a in imgs]
    anim = OUT / f"girl-{theme}.webp"
    out[0].save(anim, save_all=True, append_images=out[1:], duration=round(1000 / FPS), loop=1, lossless=False, quality=92, alpha_quality=100, method=6, minimize_size=True)
    out[-1].save(OUT / f"girl-{theme}-end.webp", lossless=True, method=6)
    print(f"{anim.name}: {len(out)} frames, {anim.stat().st_size // 1024} KB (paper was {bg.round().astype(int).tolist()})")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    build(Path(sys.argv[1]), "paper")
    build(Path(sys.argv[2]), "blue")
