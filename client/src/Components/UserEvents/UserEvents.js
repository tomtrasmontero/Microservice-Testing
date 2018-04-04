import React, { Component } from 'react';
import { Header, Segment, Grid, Icon, Button, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';
import classes from './UserEvents.scss';

class EventList extends Component {
  state = {
    backendData: [],
    saved: [],
    data: [],
  }

  componentDidMount() {
    this.getSavedEvents()
      .then(() => this.filterData());
  }

  getSavedEvents = async () => {
    const eventsList = {};
    const url = '/events';
    const result = await axios.get(url);

    // exit when result is empty
    if (result.data.length === 0) {
      this.setState({ data: [] });
    }

    const filtered = result.data.filter(event => (event.userId * 1) === this.props.personId);
    const eventCollection = filtered.reduce((accum, event) => {
      if (!eventsList[event.eventId]) {
        eventsList[event.eventId] = event.eventId;
        return [...accum, event.eventId];
      }
      return accum;
    }, []);

    this.setState({ saved: eventCollection, backendData: result.data });
  }

  filterData = async () => {
    if (this.state.saved) {
      const savedEvents = this.state.saved.join(', ');
      const url = `https://data.cityofnewyork.us/resource/8end-qv57.json?$where=event_id in(${savedEvents})`;
      const result = await axios.get(url);
      this.setState({ data: result.data });
    }
  }

  deleteEventHandler = async (id) => {
    let eventId = 0;
    this.state.backendData.forEach((event) => {
      if (event.eventId === id) {
        eventId = event.id;
      }
    });
    await axios.delete(`/events/${eventId}`)
      .then(err => console.log(err));

    // get data only when there is item saved in the backend
    await this.getSavedEvents();
    await this.filterData();
  };

  broadcastHandler = (eventId) => {
    // random number
    const roomId = Math.floor(Math.random() * 999999999) + 100000000;
    this.props.history.push(`/broadcast/${roomId}`, { eventId });
  }

  render() {
    const list = this.state.data.map(event => (
      <Segment raised key={event.event_id + event.end_date_time} className={classes.Event}>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={16}>
              <Header textAlign="center">
                <Header.Content className={classes.EventHeader}>
                  <Icon
                    color="red"
                    name="remove circle"
                    onClick={() => this.deleteEventHandler(event.event_id)}
                  />
                  {event.event_name}
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={4}>
            <Grid.Column>
              <p><span>Location:</span> {event.event_borough}</p>
            </Grid.Column>
            <Grid.Column>
              <p><span>Event Type:</span> {event.event_type}</p>
            </Grid.Column>
            <Grid.Column>
              <p>
                <span>Dates: </span>
                {new Date(event.start_date_time).toLocaleString('en-US')} :
                {new Date(event.end_date_time).toLocaleString('en-US')}
              </p>
            </Grid.Column>
            <Grid.Column>
              <p><span>Address: </span> {event.event_location}</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Container textAlign="center">
              <Button circular size="big" onClick={() => this.broadcastHandler(event.event_id)}>
                Broadcast Live
              </Button>
            </Container>
          </Grid.Row>
        </Grid>
      </Segment>
    ));

    return (
      <Aux>
        <Header textAlign="center" size="huge" block inverted color="blue">
          Saved Events:
        </Header>
        {list}
      </Aux>
    );
  }
}

EventList.propTypes = {
  personId: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape().isRequired,
  }).isRequired,
};

EventList.defaultProps = {
  personId: 0,
};

export default withRouter(EventList);
