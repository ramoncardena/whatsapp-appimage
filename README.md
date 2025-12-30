# WhatsApp AppImage for Linux

A lightweight, unofficial Electron wrapper for WhatsApp Web, packaged as an AppImage for easy usage on Linux distributions.

## Features

- 🚀 **Zero Install**: Just download (or build) the AppImage and run.
- 📱 **Native Experience**: Runs in its own window, separate from your browser tabs.
- 🔒 **Sandboxed**: Isolate WhatsApp from your main browser context.
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
    ./WhatsApp-1.0.2.AppImage
    ```

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
