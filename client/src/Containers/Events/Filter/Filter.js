import React, { Component } from 'react';

class Filter extends Component {
  state = {
    event_borough: '',
    event_type: '',
    start_date: '',
    end_date: '',
  }

  render() {
    const {
      event_borough, event_type, start_date, end_date,
    } = this.state;
    console.log(event_borough, event_type, start_date, end_date);
    return (
      <div>
        test
      </div>
    );
  }
}

export default Filter;
