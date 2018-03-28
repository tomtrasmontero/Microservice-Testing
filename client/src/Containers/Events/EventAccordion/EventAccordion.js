import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import EventDetail from '../../../Components/EventsDetail/EventsDetail';
import classes from './EventAccordion.scss';

class EventAccordion extends Component {
  state = {
    activeIndex: 0,
  }

  shouldComponentUpdate(nextProps) {
    if ([...nextProps].length === [...this.props].length) {
      return false;
    }
    return true;
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };


  render() {
    console.log(this.props);
    return (
      <Accordion className={classes.Accordion}>
        <Accordion.Title
          active={this.state.activeIndex === this.props.id}
          index={this.props.id}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          <span >
            { this.state.activeIndex !== this.props.id ?
                'Show Details'
              :
                'Hide Details'
            }
          </span>
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === this.props.id}>
          <EventDetail {...this.props} />
        </Accordion.Content>
      </Accordion>
    );
  }
}

EventAccordion.propTypes = {
  id: PropTypes.string,
};

EventAccordion.defaultProps = {
  id: '',
};

export default EventAccordion;
