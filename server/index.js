const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

const defaults = {
    contrast: 50,
    brightness: 33,
    animation: 12
}

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`${message}`)
  })
  ws.send(JSON.stringify(defaults))
})