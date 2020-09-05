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
      console.log(defaults);
      fs.writeFile('settings.json', message, () => {})
    })
    console.log('connection established', defaults);
    ws.send(JSON.stringify(defaults))
  })
})

// readFile('settings.json', 'utf8')
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   })


// const defaults = {
//     contrast: 10,
//     brightness: 20,
//     animation: 12,
//     fromServer: true
// }

