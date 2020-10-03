const WebSocket = require('ws')
const fs = require('fs')
const util = require('util');
const { kStringMaxLength } = require('buffer');

const wss = new WebSocket.Server({ port: 8080 })

let defaults;

fs.readFile('settings.json', 'utf8', (err, data) => {
  console.log(data);
  defaults = JSON.parse(data);

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      // console.log(message)
      defaults = JSON.parse(message);
      defaults.fromServer = true;
      if (defaults.length == 0) return
      fs.writeFile('settings.json', JSON.stringify(defaults, null, 2), () => {})
    })
    console.log('connection established', defaults);
    ws.send(JSON.stringify(defaults))

    fs.watch('settings.json', (type, filename) => {
      fs.readFile('settings.json', 'utf8', (err, data) => {
        ws.send(data)
      });
      // console.log('file changed');
    })
  })
})

