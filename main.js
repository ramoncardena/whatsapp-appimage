const { app, BrowserWindow, shell, Tray, Menu, globalShortcut, nativeImage } = require('electron');
const path = require('path');

// Fix notifications on Windows/Linux
if (process.platform === 'linux' || process.platform === 'win32') {
  app.setAppUserModelId('com.whatsapp.appimage');
}

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

  // Handle Notifications permission
  mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
    if (permission === 'notifications') {
      return true;
    }
    return false;
  });
  mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'notifications') {
      callback(true);
    } else {
      callback(false);
    }
  });

  // Update Tray Tooltip with unread count
  mainWindow.on('page-title-updated', (event, title) => {
    // WhatsApp title format: "(3) WhatsApp" or just "WhatsApp"
    const countMatch = title.match(/^\((\d+)\)/);
    const count = countMatch ? countMatch[1] : '';

    console.log(`Title updated: "${title}" | Parsed count: ${count}`);

    // Update badge on Dock/Taskbar directly
    if (process.platform === 'darwin' && app.dock) {
      app.dock.setBadge(count);
    } else {
      app.setBadgeCount(count ? parseInt(count, 10) : 0);
    }

    // Force Badge Update via Canvas Generation (Nuclear Option)
    // Uses the page's favicon to draw a red badge over it
    mainWindow.webContents.executeJavaScript(`
      new Promise((resolve) => {
        try {
          const count = ${count ? parseInt(count, 10) : 0};
          const canvas = document.createElement('canvas');
          canvas.width = 64;
          canvas.height = 64;
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          // Get current favicon
          const link = document.querySelector("link[rel*='icon']");
          img.crossOrigin = "Anonymous";
          img.src = link ? link.href : '';
          
          img.onload = () => {
             ctx.drawImage(img, 0, 0, 64, 64);
             
             if (count > 0) {
                 // Red circle
                 ctx.fillStyle = '#f44336'; // Material Red
                 ctx.beginPath();
                 ctx.arc(48, 16, 18, 0, 2 * Math.PI);
                 ctx.fill();
                 
                 // Count text
                 ctx.fillStyle = 'white';
                 ctx.font = 'bold 22px Arial';
                 ctx.textAlign = 'center';
                 ctx.textBaseline = 'middle';
                 // Handle large numbers
                 const text = count > 99 ? '99+' : count.toString();
                 ctx.fillText(text, 48, 17);
             }
             resolve(canvas.toDataURL());
          };
          img.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      })
    `).then((dataUrl) => {
      if (dataUrl) {
        const img = nativeImage.createFromDataURL(dataUrl);
        mainWindow.setIcon(img);
        if (tray) tray.setImage(img);
      }
    }).catch(e => console.error("Badge generation failed:", e));


    if (tray) {
      if (count) {
        tray.setToolTip(`WhatsApp (${count} unread)`);
      } else {
        tray.setToolTip('WhatsApp');
      }
    }
  });

  // Dynamic Icon Sync (Legacy fallback)
  mainWindow.webContents.on('page-favicon-updated', (event, favicons) => {
    // Keep this as fallback, but the canvas method above is superior
    if (favicons && favicons.length > 0) {
      // ...
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
