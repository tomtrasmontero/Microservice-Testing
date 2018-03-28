import React, { Component } from 'react';
import { Segment, Container, Button } from 'semantic-ui-react';
import axios from 'axios';
import classes from './Events.scss';
import EventList from './EventList/EventList';
import Aux from '../../hoc/Aux/Aux';
import eventsHeader from '../../assets/events.jpg';
import Filter from './Filter/Filter';

class Events extends Component {
  state = {
    currentBaseUrl: 'https://data.cityofnewyork.us/resource/8end-qv57.json',
    currentEvents: [],
    offset: 0,
    limit: 10,
    q: '',
    borough: '',
  }

  componentDidMount() {
    this.getCurrentEvents();
  }

  // query api based on filters, offset, limit, q params
  getCurrentEvents = async (eventType, q = this.state.q, borough = this.state.borough) => {
    let { offset } = this.state;
    if (eventType === 'next') {
      offset = this.state.offset + this.state.limit;
    } else if (eventType === 'previous' && this.state.offset !== 0) {
      offset = this.state.offset - this.state.limit;
    }

    let url = `${this.state.currentBaseUrl}?$limit=${this.state.limit}&$offset=${offset}`;
    if (borough) {
      url += `&event_borough=${borough}`;
    }
    if (q) {
      url += `&$q=${q}`;
    }

    const request = await axios.get(url)
      .catch(err => console.log(err, 'unable to get nyc data'));

    this.setState({
      currentEvents: request.data,
      offset,
      q,
      borough,
    });
  }

  render() {
    return (
      <Aux>
        <div className={classes.EventsContainer} style={{ backgroundImage: `url(${eventsHeader})` }}>
          <div className={classes.EventsText}>
            <h2 className={classes.Header}>
              EVENTS
            </h2>
          </div>
        </div>
        <Filter clicked={(q, borough) => this.getCurrentEvents(null, q, borough)} />
        <Container>
          <Segment raised className={classes.Events}>
            <Container>
              <Button
                floated="right"
                onClick={() => this.getCurrentEvents('next')}
                disabled={this.state.currentEvents.length === 0}
              >Next
              </Button>
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
              {...this.props}
            />
          </Segment>
        </Container>
      </Aux>
    );
  }
}

export default Events;
