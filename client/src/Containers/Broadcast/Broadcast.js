import React, { Component } from 'react';
import { Container, Segment, Button, Grid, Header, Divider, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import createWebRTC from '../../RTCMultiConnection';
import classes from './Broadcast.scss';

class Broadcast extends Component {
  state = {
    connection: null,
    visible: true,
    input: '',
    isLive: false,
    chatLog: [
      { text: 'Welcome to NYCLive! Chat', id: 1 },
    ],
  }

  componentDidMount() {
    this.createConnection();
  }

  componentWillUnmount() {
    const url = `${process.env.REACT_APP_HOST}/broadcast`;
    // clear cache, local streams, close socket, and connection to signaling server
    this.state.connection.attachStreams.forEach((stream) => {
      stream.stop();
    });
    this.state.connection.getAllParticipants().forEach((p) => {
      this.state.connection.disconnectWith(p);
    });
    this.state.connection.closeSocket();

    // if broadcast leaves, delete from backend;
    if (!this.props.location.search && this.state.isLive) {
      axios.delete(`${url}/${this.props.match.params.roomId}`);
    }
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

    // check if user is joining or broadcasting
    this.setState({ connection }, () => {
      if (this.props.location.search === '?join') {
        this.joinRoom(this.props.match.params.roomId);
      }
    });
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
    const { eventId } = this.props.location.state;
    const { roomId } = this.props.match.params;
    const url = `${process.env.REACT_APP_HOST}/broadcast`;
    const reqBody = {
      roomId,
      eventId,
    };
    broadcast.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false,
    };

    axios.post(url, reqBody).catch(err => console.log(err));
    this.setState({ isLive: true }, broadcast.open(roomId));
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
                <video id="main-broadcast" track="sdf" muted controls autoPlay>
                  <track kind="captions" />
                  Your browser does not support the video tag.
                </video>
              </Segment>
              <Segment>
                <Button onClick={() => this.startRoom()}>Start</Button>
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
        </Grid>
      </Container>
    );
  }
}

Broadcast.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
    state: PropTypes.shape(),
  }).isRequired,
};

export default withRouter(Broadcast);
