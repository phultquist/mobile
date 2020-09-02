const WebSocket = require('ws')
const fs = require('fs')

const wss = new WebSocket.Server({ port: 8080 })

fs.readFile('settings.json', 'utf8', (err, data) => {
  console.log(data);
  const defaults = JSON.parse(data);

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      // console.log(message)
      let values = JSON.parse(message);
      let filetext = `
  # note this only stores the raw values 0 - 100. they are interpreted in the python script
  brightness = "${values.brightness}"
  contrast = "${values.contrast}"
  animation = "${values.animation}"
      `
      fs.writeFile('settings.json', message, function () {
        return true
      })
    })
    ws.send(JSON.stringify(defaults))
  })
})
// const defaults = {
//     contrast: 10,
//     brightness: 20,
//     animation: 12,
//     fromServer: true
// }

