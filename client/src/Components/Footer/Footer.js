import React from 'react';
import { Icon, Grid, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import classes from './Footer.scss';

const footer = () => (
  <footer className={classes.Footer}>
    <Grid centered>
      <Grid.Column computer={5} tablet={5}>
        <Grid.Row>
          <List celled>
            <List.Item><Link to="/about">About</Link></List.Item>
            <List.Item><Link to="/contact">Contact</Link></List.Item>
          </List>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column textAlign="center" verticalAlign="middle" computer={6} tablet={11}>
        <p>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/tomtrasmontero/Cryptofolio">
            <Icon inverted name="github" size="big" />Made by TT 2018
          </a>
        </p>
      </Grid.Column>
      <Grid.Column computer={5} tablet={16} verticalAlign="bottom" textAlign="right" />
    </Grid>
  </footer>
);

export default footer;
