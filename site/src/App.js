import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Content from './Content.js'

const client = new W3CWebSocket('ws://192.168.68.109:8080');

class App extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this)
  }
  
  sendMessage(msg) {
    client.send(msg)
  }

  render() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
      this.defaults = JSON.parse(message.data);
      console.log(this.defaults);
    };

    return (
      <>
        <div style={{
          backgroundColor: 'black',
          color: 'white',
          height: '70px',
          textAlign: 'center',
        }}>
          <h1 style={{
            margin: '0px',
            paddingTop: '12px'
          }}>
            Patrick's Frame
      </h1>
        </div>
        <Content onChange={this.sendMessage} defaults={this.defaults} />
        <div>
        </div>
      </>
    );
  }
}

export default App;