# 🔄 v2.2.0 - Easy Updates

## ✨ Added

- **Delta updates**: the AppImage now carries update information, and every release ships a `.zsync` file next to it. Tools like [AppImageUpdate](https://github.com/AppImageCommunity/AppImageUpdate) and [Gear Lever](https://flathub.org/apps/it.mijorus.gearlever) can now update WhatsDesk for you, downloading only the parts that changed.

## 📦 Packaging

- **No more libfuse2 requirement**: the AppImage uses the current static AppImage runtime, so it runs on systems without `libfuse2` installed.
- **Smaller download**: about 106 MB instead of 115 MB.

No changes to the app itself: your session, settings and privacy features stay exactly as they were.

---

## 🚀 Upgrading

1. Quit WhatsDesk (right-click the tray icon → **Quit**)
2. Download `WhatsDesk-2.2.0.AppImage` below
3. Make it executable and run it:
   ```bash
   chmod +x WhatsDesk-2.2.0.AppImage
   ./WhatsDesk-2.2.0.AppImage
   ```

From this version on, you can also update with AppImageUpdate or Gear Lever instead of downloading by hand.

Upgrading from v2.0.0 or earlier? Your session moves automatically from `~/.config/WhatsApp` to `~/.config/WhatsDesk`, see the [v2.1.0 release notes](https://github.com/ramoncardena/whatsdesk/releases/tag/v2.1.0).

---

## ⚖️ Disclaimer

WhatsDesk is an unofficial wrapper around WhatsApp Web and is not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with WhatsApp or Meta. WhatsApp is a trademark of WhatsApp LLC.
