import React, { Fragment } from 'react';
import request from '../../_utilities/request';
import { Redirect, Link } from 'react-router-dom';
import { Alert, Form, Row, Col, Button } from 'reactstrap';
import FormControl from '../FormControl';

export default class ProfileHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordValidate: '',
      passwordsMatch: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
  }

  componentDidMount() {
    document.title = 'Change Password';
  }

  checkPasswordMatch() {
    let providedPasswords = this.state.password.length && this.state.passwordValidate.length;
    let providedPasswordsMatch = this.state.password === this.state.passwordValidate;
    if ( providedPasswords && providedPasswordsMatch) {
      this.setState({
        passwordsMatch: true
      })
    } else if ( providedPasswords && !providedPasswordsMatch) {
      this.setState({
        passwordsMatch: false
      })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });

    if ( e.target.name === 'passwordValidate' )
      setTimeout(()=>this.checkPasswordMatch(),0)
  }  

  handleSubmit(e) {
    e.preventDefault();

    request.put('/profile', this.state)
      .then((resp) => {
        if ( this.state.passwordsMatch ) this.setState({ redirect: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    var pageAlert = '';
    if ( this.state.passwordsMatch === false ) {
      pageAlert = <Alert color="danger">Your passwords do not match.</Alert>;
    } else if ( this.state.passwordsMatch === true ) {
      pageAlert = <Alert color="success">Your passwords match!</Alert>;
    }

    if ( this.state.redirect ) {
      return <Redirect to={`/account`} />;
    }

    return (
      <Fragment>
        <h1>Change Password</h1>
        <Form onSubmit={this.handleSubmit}>
          {pageAlert}
          <Row>
            <Col>
              <FormControl
                id="password"
                name="password"
                type="password"
                label="Password"
                onChange={this.handleChange}
              />
            </Col>
            <Col>
              <FormControl
                id="passwordValidate"
                name="passwordValidate"
                type="password"
                label="Password (again)"
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Button type="submit" color="success" disabled={!this.state.passwordsMatch}>Save Password</Button>
        </Form>
      </Fragment>
    )
  }
}