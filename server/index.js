const WebSocket = require('ws')
const fs = require('fs')
const https = require('https')
const wss = new WebSocket.Server({ port: 8080 })

let defaults;
// r = requests.get("https://patrick.today/frame/set", params={'ip': ip_address_url, 'frameId': FRAME_ID})
https.get("https://patrick.today/frame/set?ip=1.1.1.1&frameId=poop", res => {
  console.log(res);
})

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

