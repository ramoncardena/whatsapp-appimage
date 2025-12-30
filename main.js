const { app, BrowserWindow, shell, Tray, Menu, globalShortcut } = require('electron');
const path = require('path');

// Disable sandbox to avoid "The SUID sandbox helper binary was found, but is not configured correctly" issues on some distros.
// These must be set before app.ready.
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-setuid-sandbox');

let mainWindow;
let tray = null;
let isQuitting = false;

function createTray() {
  tray = new Tray(path.join(__dirname, 'icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show WhatsApp',
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: 'Toggle Privacy Blur (Ctrl+Shift+P)',
      click: () => {
        togglePrivacy();
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);
  tray.setToolTip('WhatsApp');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

function togglePrivacy() {
  if (mainWindow) {
    mainWindow.webContents.executeJavaScript(`
      if (document.body.style.filter === 'blur(10px)') {
        document.body.style.filter = 'none';
      } else {
        document.body.style.filter = 'blur(10px)';
        document.body.style.transition = 'filter 0.3s ease';
      }
    `);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // preload: path.join(__dirname, 'preload.js') 
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icon.png')
  });

  // correct User Agent is often crucial for WhatsApp Web to work in Electron
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  mainWindow.webContents.setUserAgent(userAgent);

  mainWindow.loadURL('https://web.whatsapp.com');

  // Open links in external browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  // Hide instead of close
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
      return false;
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();

  // Register global shortcut for Privacy Mode
  globalShortcut.register('CommandOrControl+Shift+P', () => {
    togglePrivacy();
    if (!mainWindow.isVisible()) {
      mainWindow.show();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      mainWindow.show();
    }
  });
});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

// We don't want the default window-all-closed behavior because of the tray
app.on('window-all-closed', () => {
  // Do nothing
});
