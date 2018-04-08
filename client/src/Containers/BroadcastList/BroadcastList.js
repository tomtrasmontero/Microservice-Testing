import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Grid, Segment, Loader, List, Button, Icon } from 'semantic-ui-react';
import broadcastHeader from '../../assets/ImageBroadcast.jpg';
import Aux from '../../hoc/Aux/Aux';
import classes from './BroadcastList.scss';

class BroadcastList extends Component {
  state = {
    liveBroadcast: [],
    data: [],
  }

  componentDidMount() {
    this.getLiveData()
      .then(() => this.filterData())
      .catch(err => console.log(err));
  }

  getLiveData = async () => {
    const url = `${process.env.REACT_APP_HOST}/broadcast`;
    const request = await axios.get(url);

    this.setState({ liveBroadcast: request.data });
  }

  filterData = async () => {
    if (this.state.liveBroadcast) {
      const savedEvents = this.state.liveBroadcast.reduce((accum, event) => [...accum, event.eventId], []).join(', ');
      const url = `https://data.cityofnewyork.us/resource/8end-qv57.json?$where=event_id in(${savedEvents})`;
      const result = await axios.get(url);
      const combinedData = result.data.reduce((accum, eventData) => {
        for (let i = 0; i < this.state.liveBroadcast.length; i += 1) {
          if (this.state.liveBroadcast[i].eventId === eventData.event_id) {
            const aggregateData = Object.assign(eventData, this.state.liveBroadcast[i]);
            return [...accum, aggregateData];
          }
        }
        return [...accum];
      }, []);

      this.setState({ data: combinedData });
    }
  }

  watchBroadcast = (roomId) => {
    this.props.history.push(`/broadcast/${roomId}?join`);
  }

  render() {
    let broadcastList = <Loader size="massive">Loading</Loader>;
    if (this.state.liveBroadcast.length > 0) {
      broadcastList = this.state.data.map(broadcast => (
        <Grid.Column key={broadcast.id}>
          <Segment>
            <List>
              <List.Item>
                <List.Header>{broadcast.event_name}</List.Header>
                Event Name
              </List.Item>
              <List.Item>
                <List.Header>{broadcast.event_borough}</List.Header>
                Event Location
              </List.Item>
            </List>
            <Button color="youtube" onClick={() => this.watchBroadcast(broadcast.roomId)}>
              <Icon name="tv" />
              Watch Live Event!
            </Button>
          </Segment>
        </Grid.Column>
      ));
    }
    return (
      <Aux>
        <div className={classes.EventsContainer} style={{ backgroundImage: `url(${broadcastHeader})` }}>
          <div className={classes.EventsText}>
            <h2 className={classes.Header}>
              Broadcast
            </h2>
          </div>
        </div>
        <Container className={classes.BroadcastList}>
          <Segment raised >
            <Grid>
              <Grid.Row columns={2}>
                { broadcastList }
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </Aux>
    );
  }
}

BroadcastList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(BroadcastList);
