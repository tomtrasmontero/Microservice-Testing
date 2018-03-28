import React, { Component } from 'react';
import { Image, Container, Divider } from 'semantic-ui-react';
import classes from './Home.scss';
import heroVid from '../../assets/ny_timelapse.webm';
import NYC from '../../assets/NYClogo.png';
import Aux from '../../hoc/Aux/Aux';

class Home extends Component {
  componentDidMount() {
    console.log('mounted');
  }

  render() {
    return (
      <Aux>
        <div className={classes.HomeContainer}>
          <video loop autoPlay className={classes.HomeVid}>
            <track kind="captions" />
            <source src={heroVid} type="video/webm" />
          </video>
          <div className={classes.logo}>
            <Image src={NYC} />
          </div>
        </div>
        <Container className={classes.blurb}>
          <h2>
            The City Record Online
          </h2>
          <Divider />
          <p>
            The City Record Online (CROL) is now a fully searchable database of
            notices published in the City Record newspaper which includes but is
            not limited to: public hearings and meetings, public auctions and sales,
            solicitations and awards and official rules proposed and adopted by
            city agencies.
          </p>
          <p>
            Visitors can Sign Up to receive notifications by email in their areas
            of interest and also download bid documents (when available). Returning
            Visitors: If you have previously set up an account on CROL please click
            Sign Up to validate your registered account on our new site. You will
            need to complete the sign up process using the email linked to your former
            account to access your previous notification settings. After completing this
            step, you will be able to log in directly on return visits.
          </p>
          <p>
            The City Record print edition and The City Record Online are produced
            by the NYC Department of Citywide Administrative Services.
          </p>
        </Container>
      </Aux>
    );
  }
}

export default Home;
