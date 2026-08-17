#!/usr/bin/env bash
#
# Encodes the frames from scripts/record-hero-mockup.js into the hero
# background loop: VP9 primary, H.264 fallback for Safari, WebP poster.
#
# ffmpeg is not a project dependency. Point FFMPEG at a binary, or install one:
#   npx -y ffmpeg-static-cli --version        # or
#   npm i -g ffmpeg-static && export FFMPEG=$(node -p "require('ffmpeg-static')")
#
# Usage:
#   node scripts/record-hero-mockup.js
#   bash scripts/encode-hero-mockup.sh
set -euo pipefail

FFMPEG="${FFMPEG:-ffmpeg}"
FRAME_DIR="${FRAME_DIR:-${TMPDIR:-/tmp}/rosterlab-hero-frames}"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/landing"
FPS="${FPS:-30}"

# Source frames are 1476x1141. The hero box is ~70vw on desktop and ~1.5x a
# phone viewport on mobile, so 1280 wide covers both without paying for pixels
# nobody sees. -2 keeps the height even, which yuv420p requires.
WIDTH="${WIDTH:-1280}"

if ! command -v "$FFMPEG" >/dev/null 2>&1 && [ ! -x "$FFMPEG" ]; then
  echo "ffmpeg not found. Set FFMPEG=/path/to/ffmpeg" >&2
  exit 1
fi

if [ ! -d "$FRAME_DIR" ]; then
  echo "No frames at $FRAME_DIR — run scripts/record-hero-mockup.js first" >&2
  exit 1
fi

echo "Encoding from $FRAME_DIR ($(ls "$FRAME_DIR" | wc -l | tr -d ' ') frames)"

IN=(-framerate "$FPS" -i "$FRAME_DIR/frame-%05d.png")

# The hero letterboxes this video against a solid #3779DD section background,
# so the blue in the video has to decode to exactly #3779DD or the video's box
# shows up as a lighter rectangle against the section.
#
# The transfer tag is what matters: the frames came out of a browser already in
# sRGB, so tagging the transfer as sRGB (iec61966-2-1) stops Chrome converting
# BT.709 -> sRGB on the way to the screen and shifting the blue.
#
# Keep the range limited ("tv"). Tagging full range measures *worse* in Chrome,
# which does not honour it here. Measured background against a #3779DD backdrop:
#   untagged 3784e7 | bt709 trc, tv 3f84e2 | bt709 trc, pc 3485ef
#   sRGB trc, pc 2e7aed | sRGB trc, tv 3779de  <-- 1/255 off, the rest are visible
SCALE="scale=${WIDTH}:-2:flags=lanczos:out_color_matrix=bt709"
COLOR=(-colorspace bt709 -color_primaries bt709 -color_trc iec61966-2-1 -color_range tv)

echo "→ VP9 webm"
"$FFMPEG" -y -loglevel error "${IN[@]}" \
  -vf "$SCALE" \
  -c:v libvpx-vp9 -crf 36 -b:v 0 \
  -row-mt 1 -deadline good -cpu-used 2 \
  -pix_fmt yuv420p "${COLOR[@]}" -an \
  "$OUT_DIR/hero-mockup.webm"

echo "→ H.264 mp4"
"$FFMPEG" -y -loglevel error "${IN[@]}" \
  -vf "$SCALE" \
  -c:v libx264 -crf 27 -preset slow -profile:v high \
  -pix_fmt yuv420p "${COLOR[@]}" -movflags +faststart -an \
  "$OUT_DIR/hero-mockup.mp4"

echo "→ WebP poster"
"$FFMPEG" -y -loglevel error -i "$FRAME_DIR/frame-00000.png" \
  -vf "$SCALE" -c:v libwebp -quality 82 \
  "$OUT_DIR/hero-mockup-poster.webp"

echo
ls -lh "$OUT_DIR"/hero-mockup.webm "$OUT_DIR"/hero-mockup.mp4 "$OUT_DIR"/hero-mockup-poster.webp \
  | awk '{print "  " $9 "  " $5}'
