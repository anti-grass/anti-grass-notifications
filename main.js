const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const notifier = require('node-notifier');

let mainWindow;
let notificationInterval;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (notificationInterval) clearInterval(notificationInterval);
  });
});

ipcMain.on('start-notifications', (event, { preset, frequency }) => {
  const presets = {
    reminder1: { title: 'Reminder', message: 'Don\'t forget to exterminate grass!' },
    reminder2: { title: 'Reminder', message: 'Make sure you don\'t leave the house today!' },
    reminder3: { title: 'Reminder', message: 'Take a second and pray to the grass killing gods.' },
  };

  const notification = presets[preset] || { title: 'Default', message: 'This is a default notification.' };

  if (notificationInterval) clearInterval(notificationInterval);

  const intervalMs = frequency * 60 * 1000;
  notificationInterval = setInterval(() => {
    notifier.notify({
      title: notification.title,
      message: notification.message,
      sound: true,
    });
  }, intervalMs);
});
