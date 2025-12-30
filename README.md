# WhatsApp AppImage for Linux

![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)
![Electron](https://img.shields.io/badge/Electron-39.x-47848F?logo=electron&logoColor=white)
![Platform](https://img.shields.io/badge/platform-linux-lightgrey.svg)
![AppImage](https://img.shields.io/badge/Package-AppImage-red.svg)


**The ultimate unofficial WhatsApp Desktop client for Linux.** 

A privacy-focused, lightweight Electron wrapper packaged as a universal **AppImage**. Runs instantly on **Ubuntu**, **Debian**, **Fedora**, **Arch Linux**, **Linux Mint**, **Manjaro**, and more—no installation required. 

Includes essential features missing from the web version, like **System Tray support**, **Native Notifications**, and a unique **Privacy "Boss Mode"** to instantly blur your chats.

## Features

- 🚀 **Zero Install**: Just download (or build) the AppImage and run.
- 📱 **Native Experience**: Runs in its own window, separate from your browser tabs.
- � **System Tray**: Minimizes to tray to keep running in the background.
- 🕵️ **Privacy "Boss Mode"**: Instantly blur the screen with `Ctrl+Shift+P` (or `Cmd+Shift+P`).
- �🔒 **Sandboxed**: Isolate WhatsApp from your main browser context.
- 🔧 **Customizable**: Open source, so you can tweak the Electron wrapper as needed.

## Usage

### Running the AppImage

1.  Download the latest `.AppImage` from the [releases page](#) (or build it yourself).
2.  Make it executable:
    ```bash
    chmod +x WhatsApp-1.0.2.AppImage
    ```
3.  Run it:
    ```bash
    ./WhatsApp-1.2.0.AppImage
    ```

### Shortcuts & Tips

- **Privacy Blur**: Press `Ctrl+Shift+P` (or `Cmd` on Mac) to instantly blur/unblur the window. Great for privacy!
- **Minimize to Tray**: Closing the window will minimize it to the system tray. Right-click the tray icon to Quit completely.

### Troubleshooting: Sandbox Errors

If you encounter an error like:
`The SUID sandbox helper binary was found, but is not configured correctly...`

This is common on newer Linux distributions (like Ubuntu 24.04+) that restrict unprivileged user namespaces. You have two options:

**Option A (Recommended for one-off): Run with `--no-sandbox`**
```bash
./WhatsApp-1.0.2.AppImage --no-sandbox
```

**Option B (System Fix): Enable unprivileged user namespaces**
```bash
sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
```

## Building from Source

Requirements: Node.js (v14+ recommended) and `npm`.

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/whatsapp-appimage.git
    cd whatsapp-appimage
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Build the AppImage:
    ```bash
    npm run dist
    ```
    The output file will be in the `dist/` directory.

## Development

To run the app in development mode without building:

```bash
npm start
```

## Disclaimer

This project is an unofficial wrapper and is not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with WhatsApp or Meta. The official WhatsApp website can be found at https://www.whatsapp.com.
