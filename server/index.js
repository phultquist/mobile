const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

const defaults = {
    contrast: 10,
    brightness: 99,
    animation: 12,
    fromServer: true
}

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`${message}`)
  })
  ws.send(JSON.stringify(defaults))
})