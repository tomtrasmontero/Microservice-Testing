import React, { Component } from 'react';
import { Segment, Container, Image, Button } from 'semantic-ui-react';
import axios from 'axios';
import classes from './Events.scss';
import EventList from '../../Components/EventList/EventList';
import Aux from '../../hoc/Aux/Aux';
import eventsHeader from '../../assets/events.jpg';
import Filter from './Filter/Filter';

class Events extends Component {
  state = {
    currentBaseUrl: 'https://data.cityofnewyork.us/resource/8end-qv57.json',
    // historicalBaseUrl: 'https://data.cityofnewyork.us/resource/gsff-kav8.json',
    currentEvents: [],
    offset: 0,
    limit: 10,
  }

  componentDidMount() {
    this.getCurrentEvents();
  }

  getCurrentEvents = async (eventType) => {
    let { offset } = this.state;
    if (eventType === 'next') {
      offset = this.state.offset + this.state.limit;
    } else if (eventType === 'previous' && this.state.offset !== 0) {
      offset = this.state.offset - this.state.limit;
    }

    const url = `${this.state.currentBaseUrl}?$limit=${this.state.limit}&$offset=${offset}`;
    const request = await axios.get(url)
      .catch(err => console.log(err, 'unable to get nyc data'));

    this.setState({ currentEvents: request.data, offset });
  }

  render() {
    return (
      <Aux>
        <div className={classes.EventsContainer}>
          <Image src={eventsHeader} />
          <div className={classes.EventsText}>
            <h2 className={classes.Header}>
              EVENTS
            </h2>
          </div>
        </div>
        <Filter />
        <Container>
          <Segment raised className={classes.Events}>
            <Container>
              <Button floated="right" onClick={() => this.getCurrentEvents('next')}>Next</Button>
              <Button
                floated="left"
                disabled={this.state.offset === 0}
                onClick={() => this.getCurrentEvents('previous')}
              >Previous
              </Button>
            </Container>
            <br />
            <EventList
              eventList={this.state.currentEvents}
            />
          </Segment>
        </Container>
      </Aux>
    );
  }
}

export default Events;
