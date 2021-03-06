let {
  app,
  BrowserWindow,
  Tray,
  Menu
} = require('electron')

let path = require('path')
let url = require('url')
let win

// Icons
let imageFolder = __dirname + '/img'
let platform = require('os').platform()
let iconPath = path.join(imageFolder, '/icon/icon.png')
let trayImage

// Determine appropriate icon for platform
if (platform == 'darwin') {
  trayImage = path.join(imageFolder, '/tray/mac/icon.png')
  app.dock.hide()
}
else if (platform == 'win32') {
  trayImage = path.join(imageFolder, '/tray/win/icon.ico')
}

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 800,
    icon: iconPath
  })

  win.loadURL(
    url.format(
      {
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
      }
    )
  )

  if (platform != "darwin") {
    let appIcon = new Tray(trayImage)
    appIcon.setPressedImage(imageFolder + '/tray/mac/iconHighlight.png');
  }

  let contextMenu = Menu.buildFromTemplate(
    [
      {
        label: 'Show Gladius Manager',
        click: function() {
          win.show()
        }
      },
      {
        label: 'Quit',
        click: function() {
          // gladius-controld stop
          app.isQuiting = true
          app.quit()
        }
      }
    ]
  )

  if (platform != "darwin") {
    appIcon.setContextMenu(contextMenu)
  }

  win.on('close', function(event) {
    if (platform == "darwin") {
      app.isQuiting = true
      app.quit()
      return true
    }

    if(!app.isQuiting) {
      event.preventDefault()
      win.hide()
    }

    return false
  })

  win.on('minimize', function(event) {
    event.preventDefault()
    win.hide()
  })

  win.on('show', function() {
    if (platform != "darwin") {
      appIcon.setHighlightMode('selection')
    }
  })
}

app.on('ready', createWindow)
