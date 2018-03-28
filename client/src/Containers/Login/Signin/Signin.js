import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = async () => {
    const authResult = await this.props.checkAuth(this.state.email);

    if (authResult) {
      this.props.history.push('/home');
    } else {
      this.setState({ email: '', password: '' });
    }
  }
  // add error handler
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <Container as={Form} onSubmit={this.handleSubmit}>
        <Form.Input
          name="email"
          type="email"
          label="E-Mail"
          value={this.state.email}
          placeholder="Email@sample.com"
          onChange={this.handleChange}
        />
        <Form.Input
          name="password"
          type="password"
          label="Password"
          value={this.state.password}
          placeholder="Password"
          onChange={this.handleChange}
        />
        <Form.Button positive disabled={this.invalid} type="submit" >Log In</Form.Button>
      </Container>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  checkAuth: PropTypes.func.isRequired,
};

export default withRouter(SignIn);
