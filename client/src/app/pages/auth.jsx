import React, { Fragment } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { LoginForm, RegistrationForm } from '../components/authentication';

class Auth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  } 

  render() {
    return (
      <Fragment>
        <Route path={`/login`} exact component={LoginForm}/>
        <Route path={`/register`} exact component={RegistrationForm}/>
      </Fragment>
    );
  }
}

export default Auth;