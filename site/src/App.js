import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Content from './Content.js'

const client = new W3CWebSocket('ws://192.168.68.117:8080');

class App extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this)
    this.state = {defaults: {
      contrast: 30,
      brightness: 20,
      animation: 90
    }}
  }

  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      this.setState({
        defaults: JSON.parse(message.data)
      })
      // console.log(this.state.defaults);
      this.render()
      return this.state.defaults
    };
  }
  
  sendMessage(msg) {
    client.send(msg)
  }

  render() {
    // console.log('rendering app', this.state.defaults);
    // while (!this.state.ready){} 
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
        <Content onChange={this.sendMessage} defaults={this.state.defaults} />
      </>
    );
  }
}

export default App;