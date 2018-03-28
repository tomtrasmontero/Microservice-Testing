import React from 'react';
import { Container, Tab, Segment } from 'semantic-ui-react';
import SignUp from './SignUp/SignUp';
import SignIn from './Signin/Signin';
import classes from './Login.scss';

const signUpForm = (props) => {
  const panes = [
    {
      menuItem: 'Log In',
      render: () => (
        <Tab.Pane className={classes.MenuForm}>
          <SignIn {...props} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Sign Up',
      render: () => (
        <Tab.Pane className={classes.MenuForm}>
          <SignUp {...props} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container textAlign="center" className={classes.Form}>
      <Segment raised className={classes.Menu} >
        <Tab
          panes={panes}
          menu={{
            attached: true,
            widths: 2,
            pointing: true,
            className: classes.MenuItem,
            color: 'green',
          }}
        />
      </Segment>
    </Container>
  );
};


export default signUpForm;
