import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MenuBar from './Components/MenuBar/MenuBar';
import Home from './Containers/Home/Home';
import Events from './Containers/Events/Events';
import Footer from './Components/Footer/Footer';
import Aux from './hoc/Aux/Aux';

class App extends Component {
  state = {
    loggedIn: true,
  }

  render() {
    const routes = (
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/events" exact component={Events} />
        <Redirect to="/home" />
      </Switch>
    );
    return (
      <Aux>
        <MenuBar loggedIn={this.state.loggedIn} />
        {routes}
        <Footer />
      </Aux>
    );
  }
}

export default App;
