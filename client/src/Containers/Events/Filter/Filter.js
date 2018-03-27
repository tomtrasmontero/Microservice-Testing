import React, { Component } from 'react';
import { Container, Segment, Input, Grid, Accordion, Icon, Dropdown, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import classes from './Filter.scss';

class Filter extends Component {
  state = {
    event_borough: '',
    q: '',
    activeIndex: -1,
    options: [
      { text: 'All', value: '' },
      { text: 'Manhattan', value: 'Manhattan' },
      { text: 'Queens', value: 'Queens' },
      { text: 'Brooklyn', value: 'Brooklyn' },
      { text: 'Staten Island', value: 'Staten Island' },
      { text: 'Bronx', value: 'Bronx' },
    ],
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  handleChange = (e, { value }) => this.setState({ event_borough: value });

  handleSubmit = () => {
    this.props.clicked(this.state.q, this.state.event_borough);
  }

  handleSearchChange = (e, { value }) => this.setState({ q: value })

  render() {
    return (
      <Container>
        <Segment>
          <Grid divided>
            <Grid.Row>
              <Grid.Column computer={7} mobile={16}>
                <Input
                  className={classes.Input}
                  fluid
                  placeholder="Search..."
                  onChange={this.handleSearchChange}
                ><input />
                  <Button type="submit" onClick={this.handleSubmit}>
                    Search
                  </Button>
                </Input>
              </Grid.Column>
              <Grid.Column computer={9} mobile={16}>
                <Container>
                  <Accordion>
                    <Accordion.Title
                      active={this.state.activeIndex === 0}
                      index={0}
                      onClick={this.handleClick}
                    >
                      <Icon name="dropdown" />
                      Advanced Search
                    </Accordion.Title>
                    <Accordion.Content active={this.state.activeIndex === 0}>
                      <Container>
                        <Dropdown
                          onChange={this.handleChange}
                          placeholder="Select a Borough"
                          selection
                          labeled
                          options={this.state.options}
                        />
                      </Container>
                    </Accordion.Content>
                  </Accordion>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

Filter.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default Filter;
