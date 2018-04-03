/* eslint-disable */
import React, { Component } from 'react';
import { Header, Segment, Grid, Divider, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Aux from '../../../hoc/Aux/Aux';
import EventAccordion from '../EventAccordion/EventAccordion';
import classes from './EventList.scss';

class EventList extends Component {
  state = {
    saved: [],
    data: [],
  }

  componentDidMount() {
    this.getSavedEvents();
  }

  getSavedEvents = async () => {
    const url = '/events';
    const result = await axios.get(url);
    const filtered = result.data.filter(event => (event.userId * 1) === this.props.personId);
    const eventCollection = filtered.reduce((accum, event) => [...accum, event.eventId], []);
    this.setState({ saved: eventCollection, data: filtered });
  }

  handleSave = async (eventId, check) => {
    if (check) {
      const trxId = this.state.data.filter(e => e.eventId === eventId)[0].id;
      const url = `/events/${trxId}`;
      await axios.delete(url);
      this.getSavedEvents();
    } else {
      const url = '/events';
      const request = await axios.post(url, {
        userId: this.props.personId,
        eventId,
      });
      const newSaved = [...this.state.saved, request.data.eventId];
      this.setState({ saved: newSaved });
    }
  }

  render() {
    const list = this.props.eventList.map((event) => (
        <Segment raised key={event.event_id + event.end_date_time} className={classes.Event}>
          <Grid>
            <Grid.Row>
              <Grid.Column computer={16}>
                <Header textAlign="center">
                  { this.props.loggedIn ?
                      this.state.saved.includes(event.event_id) ?
                      <Icon
                        name="star"
                        color="yellow"
                        personid={this.props.personId}
                        onClick={() => this.handleSave(event.event_id, true)}
                      />
                      :
                      <Icon name="empty star" onClick={() => this.handleSave(event.event_id, false)} />
                    :
                    null
                  }
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
                  {...event}
                  id={this.props.personId}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      ));

    return (
      <Aux>
        <Header textAlign="center" size="huge" block inverted color="blue">
          Current:
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
