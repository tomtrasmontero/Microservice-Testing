import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class MenuBar extends Component {
  state = { activeItem: 'dashboard' };

  componentDidMount() {
    this.checkState();
  }

  checkState() {
    const activeAddress = this.props.history.location.pathname.split('/')[1];
    this.setState({ activeItem: activeAddress });
  }

  handleItemClick = (e, { name }) => {
    this.props.history.push(name);
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item name="dashboard" active={activeItem === 'dashboard'} onClick={this.handleItemClick} />
          <Menu.Item name="detail" active={activeItem === 'detail'} onClick={this.handleItemClick} />
          <Menu.Item name="summary" active={activeItem === 'summary'} onClick={this.handleItemClick} />
          <Menu.Item name="employee" active={activeItem === 'employee'} onClick={this.handleItemClick} />
          <Menu.Menu position="right">
            <Menu.Item name="login" active={activeItem === 'login'} />
            <Menu.Item name="help" active={activeItem === 'help'} />
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

MenuBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape().isRequired,
  }).isRequired,
};

export default withRouter(MenuBar);
