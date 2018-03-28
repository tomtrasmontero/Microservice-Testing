import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';
import classes from './MenuBar.scss';

class MenuBar extends Component {
  state = { activeItem: 'home' };

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

  logout = () => {
    this.props.logOut();
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu inverted color="blue" className={classes.MenuBar}>
        <Container>
          <Menu.Item header>NYC</Menu.Item>
          <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name="events" active={activeItem === 'events'} onClick={this.handleItemClick} />
          <Menu.Menu position="right">
            { this.props.loggedIn ?
              <Aux>
                <Menu.Item name="userEvents" active={activeItem === 'userEvents'} onClick={this.handleItemClick} />
                <Menu.Item name="logout" active={activeItem === 'logout'} onClick={this.logout} />
              </Aux>
              :
              <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleItemClick} />
            }
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

MenuBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape().isRequired,
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default withRouter(MenuBar);
