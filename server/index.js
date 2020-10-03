const WebSocket = require('ws')
const fs = require('fs')
const util = require('util');
const { kStringMaxLength } = require('buffer');

const wss = new WebSocket.Server({ port: 8080 })

// const readFile = util.promisify(fs.readFile);
let defaults;

fs.readFile('settings.json', 'utf8', (err, data) => {
  console.log(data);
  defaults = JSON.parse(data);

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      // console.log(message)
      defaults = JSON.parse(message);
      defaults.fromServer = true;
      fs.writeFile('settings.json', JSON.stringify(defaults, null, 2), () => {})
    })
    console.log('connection established', defaults);
    ws.send(JSON.stringify(defaults))
  })
})