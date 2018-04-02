import React, { Component } from 'react';
import { Container, Segment, Button, Grid, Header, Divider, Input } from 'semantic-ui-react';
import 'rtcmulticonnection-v3/dist/RTCMultiConnection.min';
import classes from './Broadcast.scss';


class Broadcast extends Component {
  state = {
    connection: null,
    visible: true,
    input: '',
    chatLog: [
      { text: 'filler', id: 1 },
      { text: 'filler', id: 12 },
      { text: 'filler', id: 13 },
      { text: 'filler', id: 14 },
      { text: 'filler', id: 15 },
      { text: 'filler', id: 16 },
      { text: 'filler', id: 17 },
      { text: 'filler', id: 18 },
      { text: 'filler', id: 19 },
      { text: 'filler', id: 10 },
      { text: 'filler', id: 11 },
      { text: 'filler', id: 21 },
      { text: 'filler', id: 31 },
      { text: 'filler', id: 41 },
      { text: 'filler', id: 51 },
      { text: 'filler', id: 61 },
      { text: 'filler', id: 71 },
      { text: 'filler', id: 81 },
    ],
  }

  componentDidMount() {
    this.createWebRTC();
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
      console.log(event.target.value, this.state.connection);
      this.state.connection.send({ message: event.target.value });
    }
  }

  onChangeHandler = (event) => {
    this.setState({ input: event.target.value });
  }

  createWebRTC = () => {
    const connection = new window.RTCMultiConnection();
    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
    connection.session = {
      audio: true,
      video: true,
      data: true,
    };
    connection.socketMessageEvent = 'video-broadcast';
    // connection.mainContainer = this.BroadcastContainer;

    connection.session.broadcast = true;
    connection.session.oneway = true;

    connection.onstream = (event) => {
      connection.mainContainer = document.getElementById('main-broadcast');
      connection.mainContainer.src = event.blobURL;
      connection.mainContainer.muted = false;
    };

    connection.onmessage = (event) => {
      console.log(event.data);
    };

    this.setState({ connection });
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
                <div className={classes.TextContainer}>
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
