import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import MenuBar from './Components/MenuBar/MenuBar';
import Aux from './hoc/Aux/Aux';

class App extends Component {
  componentWillMount() {
    console.log('');
  }
  render() {
    // const routes = (
    //   <Switch>
    //     <Route path="/home" exact component={Home} />
    //     <Redirect to="/home" />
    //   </Switch>
    // );
    return (
      <Aux>
        <MenuBar />
        {/* {routes} */}
      </Aux>
    );
  }
}

export default App;
