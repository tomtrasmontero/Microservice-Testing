import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import EventDetail from '../../../Components/EventsDetail/EventsDetail';
import classes from './EventAccordion.scss';

class EventAccordion extends Component {
  state = {
    activeIndex: 0,
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };


  render() {
    return (
      <Accordion className={classes.Accordion}>
        <Accordion.Title
          active={this.state.activeIndex === this.props.event_id}
          index={this.props.event_id}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          <span >
            { this.state.activeIndex !== this.props.event_id ?
                'Show Details'
              :
                'Hide Details'
            }
          </span>
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === this.props.event_id}>
          <EventDetail {...this.props} />
        </Accordion.Content>
      </Accordion>
    );
  }
}

EventAccordion.propTypes = {
  event_id: PropTypes.string,
};

EventAccordion.defaultProps = {
  event_id: '',
};

export default EventAccordion;
