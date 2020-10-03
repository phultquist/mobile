import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Content from './Content.js'

let url = window.location.href;

//sorry for the complications here. there's probably a better way to do this with regex
let piIp = url.split("://")[1].split(":")[0];

const client = new W3CWebSocket(`ws://${piIp}:8080`);

class App extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this)
    this.state = {defaults: {
      contrast: 0,
      brightness: 0,
      animation: 0,
      fromServer: false
    }}
  }

  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      this.setState({
        defaults: JSON.parse(message.data)
      });
      // console.log(message);
      // console.log(this.state.defaults);
      this.render()
      console.log(this.state.defaults);
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
          textAlign: 'left',
        }}>
          <h1 style={{
            margin: '0px',
            paddingTop: '12px',
            paddingLeft: '12px'
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