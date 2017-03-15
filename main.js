const {app, globalShortcut} = require('electron')
const {BrowserWindow, ipcMain} = require('electron')
//var server = require('./server');
//server.run();
const ipp = require("ip");
const ip = ipp.address();
console.log(ip);

ipcMain.on('synchronous-message', (event, arg) => {
  //console.log(arg)  // prints "ping"
  event.returnValue = ip;
})

app.on('ready', () => {
  const {screen} = require('electron')
  const {width, height} = screen.getPrimaryDisplay().workAreaSize
  let win = new BrowserWindow({width: width, height: height * .5, x: 0, y:0})
  win.on('closed', () => {
    win = null
  })

  // Load a remote URL
  win.loadURL('http://localhost:8080/controller');
  const ret = globalShortcut.register('F10', () => {
    console.log('F10 is pressed')
    if (win.isVisible())
      win.hide()
    else
      win.show()
  })

  if (!ret) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('F10'))
})

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('F10')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

//repl = require("repl")
//r = repl.start("node> ")
//r.context.pause = pauseHTTP;
//r.context.resume = resumeHTTP;