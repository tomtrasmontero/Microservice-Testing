import React, { Component } from 'react';
import { Container, Segment, Button, Grid, Header, Divider, Input } from 'semantic-ui-react';
import createWebRTC from '../../RTCMultiConnection';
import classes from './Broadcast.scss';

class Broadcast extends Component {
  state = {
    connection: null,
    visible: true,
    input: '',
    chatLog: [
      { text: 'Welcome to NYCLive! Chat', id: 1 },
    ],
  }

  componentDidMount() {
    this.createConnection();
  }

  componentWillUnmount() {
    // clear cache, local streams, close socket, and connection to signaling server
    this.state.connection.attachStreams.forEach((stream) => {
      stream.stop();
    });
    this.state.connection.getAllParticipants().forEach((p) => {
      this.state.connection.disconnectWith(p);
    });
    this.state.connection.closeSocket();
  }

  onKeyPressHandler = (event) => {
    if (event.key === 'Enter') {
      this.state.connection.send({ message: event.target.value });
      this.updateChat(event.target.value);
    }
  }

  onChangeHandler = (event) => {
    this.setState({ input: event.target.value });
  }

  createConnection() {
    const connection = createWebRTC();
    // add specific configuration here
    connection.onmessage = (event) => {
      this.updateChat(event.data.message);
    };

    this.setState({ connection });
  }

  updateChat = (message) => {
    const currentLog = [...this.state.chatLog];
    const chatData = {
      text: message,
      id: new Date() + message,
    };
    currentLog.push(chatData);
    // when message is sent, reset input value
    this.setState({ chatLog: currentLog, input: '' });
  }

  joinRoom = (roomId) => {
    const broadcast = this.state.connection;

    broadcast.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
    };

    broadcast.connect(roomId);
  }

  startRoom = () => {
    const broadcast = this.state.connection;

    broadcast.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false,
    };

    broadcast.open('testId1');
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const chatList = this.state.chatLog.map(chat => <p key={chat.id}>{chat.text}</p>);

    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={11} mobile={16}>
              <Segment className={classes.Broadcast}>
                <video id="main-broadcast" track="sdf" controls muted autoPlay>
                  <track kind="captions" />
                  Your browser does not support the video tag.
                </video>
              </Segment>
            </Grid.Column>
            <Grid.Column computer={5} mobile={16}>
              <Segment color="blue" className={classes.ChatContainer}>
                <Header textAlign="center" inverted color="blue">
                  Chat
                </Header>
                <Divider />
                <div className={classes.TextContainer} ref={this.chat} >
                  {chatList}
                </div>
                <Input
                  fluid
                  placeholder="Press Enter to Send"
                  onKeyPress={this.onKeyPressHandler}
                  onChange={this.onChangeHandler}
                  className={classes.TextInput}
                  value={this.state.input}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row textAlign="center">
            <Button onClick={() => this.joinRoom('testId1')}>Join</Button>
            <Button onClick={() => this.startRoom()}>Start</Button>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Broadcast;
