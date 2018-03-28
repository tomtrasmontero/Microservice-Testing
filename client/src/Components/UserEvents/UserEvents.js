import React, { Component } from 'react';
import { Header, Segment, Grid, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';
import EventAccordion from '../../Containers/Events/EventAccordion/EventAccordion';
import classes from './UserEvents.scss';

class EventList extends Component {
  state = {
    saved: [],
    data: [],
  }

  componentDidMount() {
    this.getSavedEvents()
      .then(() => this.filter());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.filter();
    }
  }

  getSavedEvents = async () => {
    const url = '/events';
    const result = await axios.get(url);
    const filtered = result.data.filter(event => (event.userId * 1) === this.props.personId);
    const eventCollection = filtered.reduce((accum, event) => [...accum, event.eventId], []);
    this.setState({ saved: eventCollection });
  }

  filter = async () => {
    const savedEvents = this.state.saved.join(', ');
    const url = `https://data.cityofnewyork.us/resource/8end-qv57.json?$where=event_id in(${savedEvents})`;
    const result = await axios.get(url);
    this.setState({ data: result.data });
  }

  render() {
    const list = this.state.data.map(event => (
      <Segment raised key={event.event_id + event.end_date_time} className={classes.Event}>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={16}>
              <Header textAlign="center">
                <Header.Content className={classes.EventHeader}>
                  {event.event_name}
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <p><span>Location:</span> {event.event_borough}</p>
            </Grid.Column>
            <Grid.Column>
              <p><span>Event Type:</span> {event.event_type}</p>
            </Grid.Column>
            <Grid.Column>
              <p><span>Dates:</span> {new Date(event.start_date_time).toLocaleString('en-US')}</p>
            </Grid.Column>
          </Grid.Row>
          <Divider className={classes.Divider} fitted />
          <Grid.Row>
            <Grid.Column mobile={16}>
              <EventAccordion
                {...this.state}
              />
            </Grid.Column>
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
  eventList: PropTypes.arrayOf(PropTypes.object),
  loggedIn: PropTypes.bool.isRequired,
  personId: PropTypes.number,
};

EventList.defaultProps = {
  eventList: [],
  personId: 0,
};

export default EventList;
