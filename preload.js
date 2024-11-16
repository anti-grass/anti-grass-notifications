const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  startNotifications: (data) => ipcRenderer.send('start-notifications', data),
});
