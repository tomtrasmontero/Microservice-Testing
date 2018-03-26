import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Container } from 'semantic-ui-react';
import classes from './EventsDetail.scss';

const eventDetail = (props) => {
  let baseUrl = '';
  if (props.event_location) {
    const location = props.event_location.split(',')[0].trim();
    baseUrl = `//www.google.com/maps/embed/v1/place?q=${location},%20NY&zoom=13&key=AIzaSyCVYQSzfrtbPitLSI5BqlcG34hxjcdc5ik`;
  }

  return (
    <Grid stackable>
      <Grid.Row>
        <Container text>
          <span>Direction:</span> {props.event_location}
        </Container>
      </Grid.Row>
      <Grid.Row columns={4}>
        <Grid.Column>
          <span>Event Agency:</span> {props.event_agency}
        </Grid.Column>
        <Grid.Column>
          <span>Event Type:</span> {props.event_type}
        </Grid.Column>
        <Grid.Column>
          <span>Street Closure:</span> {props.street_closure_type}
        </Grid.Column>
        <Grid.Column>
          <span>End Date:</span> {new Date(props.end_date_time).toLocaleString('en-US')}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Container fluid className={classes.MapContainer}>
          <iframe src={baseUrl} title="map" frameBorder="0" className={classes.Map} allowFullScreen />
        </Container>
      </Grid.Row>
    </Grid>
  );
};

eventDetail.propTypes = {
  event_agency: PropTypes.string,
  event_type: PropTypes.string,
  street_closure_type: PropTypes.string,
  end_date_time: PropTypes.string,
  event_location: PropTypes.string,
};

eventDetail.defaultProps = {
  event_agency: '',
  event_type: '',
  street_closure_type: '',
  end_date_time: '',
  event_location: '',
};

export default eventDetail;
