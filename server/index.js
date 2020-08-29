const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

const defaults = {
    contrast: 10,
    brightness: 33,
    animation: 12,
    ready: true
}

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`${message}`)
  })
  ws.send(JSON.stringify(defaults))
})