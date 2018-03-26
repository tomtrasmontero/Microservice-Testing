import React from 'react';
import { Header, Segment, Grid, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux/Aux';
import EventAccordion from '../../Containers/EventAccordion/EventAccordion';
import classes from './EventList.scss';

const eventList = (props) => {
  const list = props.eventList.map(event => (
    <Segment raised key={event.event_id + event.end_date_time} className={classes.Event}>
      <Grid>
        <Grid.Row>
          <Grid.Column computer={16}>
            <Header textAlign="center" className={classes.EventHeader}>
              {event.event_name}
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
};

eventList.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.object),
};

eventList.defaultProps = {
  eventList: [],
};

export default eventList;
