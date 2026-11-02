#!/usr/bin/env bash
# Repack the AppImage built by electron-builder with appimagetool, so it embeds update
# information and gets a .zsync file next to it (used by AppImageUpdate, Gear Lever, etc.).
# This also switches it to the current static AppImage runtime, which doesn't need libfuse2.
# Upload the .zsync file to the GitHub release together with the AppImage.
set -euo pipefail

cd "$(dirname "$0")/.."

VERSION=$(node -p "require('./package.json').version")
APPIMAGE="$PWD/dist/WhatsDesk-$VERSION.AppImage"
UPDATE_INFO="gh-releases-zsync|ramoncardena|whatsdesk|latest|WhatsDesk-*.AppImage.zsync"
ARCH=$(uname -m)
APPIMAGETOOL="$PWD/node_modules/.cache/appimagetool-$ARCH.AppImage"

if [ ! -f "$APPIMAGE" ]; then
  echo "AppImage not found: $APPIMAGE (run electron-builder first)" >&2
  exit 1
fi

if [ ! -x "$APPIMAGETOOL" ]; then
  echo "Downloading appimagetool..."
  mkdir -p "$(dirname "$APPIMAGETOOL")"
  curl -fsSL -o "$APPIMAGETOOL" \
    "https://github.com/AppImage/appimagetool/releases/download/continuous/appimagetool-$ARCH.AppImage"
  chmod +x "$APPIMAGETOOL"
fi

WORKDIR=$(mktemp -d)
trap 'rm -rf "$WORKDIR"' EXIT

# --appimage-extract always extracts into ./squashfs-root
(cd "$WORKDIR" && "$APPIMAGE" --appimage-extract >/dev/null)
# electron-builder packs directories as 0700, which appimagetool rejects since other users couldn't run the app
chmod -R a+rX "$WORKDIR/squashfs-root"

# Build in the work dir and only replace the original once it succeeded.
# The output keeps the final file name because the .zsync file references it.
(cd "$WORKDIR" && ARCH="$ARCH" "$APPIMAGETOOL" --no-appstream -u "$UPDATE_INFO" squashfs-root "$(basename "$APPIMAGE")")
mv -f "$WORKDIR/$(basename "$APPIMAGE")" "$APPIMAGE"
mv -f "$WORKDIR/$(basename "$APPIMAGE").zsync" "$APPIMAGE.zsync"

echo "Created $APPIMAGE and $APPIMAGE.zsync"
