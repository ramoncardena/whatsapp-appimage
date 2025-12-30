const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

// Disable sandbox to avoid "The SUID sandbox helper binary was found, but is not configured correctly" issues on some distros.
app.commandLine.appendSwitch('no-sandbox');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') // We might need this later, but for now it's optional
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icon.png')
  });

  // correct User Agent is often crucial for WhatsApp Web to work in Electron
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  win.webContents.setUserAgent(userAgent);

  win.loadURL('https://web.whatsapp.com');

  // Open links in external browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
