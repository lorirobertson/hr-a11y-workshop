import React from 'react';
import { UncontrolledAlert, Button } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import labels from '../../_utilities/labels';
import auth from '../../_utilities/auth';
import request from '../../_utilities/request';

export default class LoginForm extends React.Component {

    // Using a class based component here because we're accessing DOM refs
    constructor(props) {
        super(props)
        // the initial application state
        this.state = {
            user: null,
            identifier: null,
            password: null,
            login: {
                success: null
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    // App "actions" (functions that modify state)
    signIn(username, password) {
        const identifier = username;
        if ( username && password )
            request.post('/auth/local', { identifier, password }, false)
                .then(resp => {
                    if ( resp.data.user && resp.data.jwt ) {
                        auth.setToken(resp.data.jwt, true);
                        auth.set(resp.data.user, 'user', true);
                        request.setAuthorization();
                        this.setState({
                            user: {username,password}
                        });
                    } else {
                        this.setState({
                            login: {success: false}
                        });
                    }
                })
                .catch(err => {
                    this.setState({
                        login: {success: false}
                    });
                });
    }    

    handleSignIn(e) {
        e.preventDefault()
        let username = this.refs.username.value
        let password = this.refs.password.value
        this.signIn(username, password);
    }

    handleChange(e) {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });

        //identifier: e.currentTarget.value,
        if ( this.state.login.success !== null )
            this.setState({
                login: {success: null},
            });
    }
    
    signOut() {
        auth.clearAppStorage();
        // clear out user from state
        this.setState({ user: null })
    }

    render() {
        const loginSuccess = this.state.login.success;
        let loginFailureAlert = '';
        if ( loginSuccess == false && loginSuccess !== null) {
            loginFailureAlert = <UncontrolledAlert className="my-3" color="danger">
                                    {labels.login.authenticationFailure}
                                </UncontrolledAlert>;
        }

        if ( localStorage.getItem('access-token') ) {
            return <Redirect to={`/`} />;
        } else {
            return (
                <div id="login-form-container">
                    <form id="login-form" onSubmit={this.handleSignIn.bind(this)}>
                        <h4>Please Sign In</h4>

                        {/* <label htmlFor="email" className="sr-only">{labels.login.email}</label> */}
                        <input
                            type="text"
                            ref="username"
                            placeholder={labels.login.email}
                            className="form-control"
                            id="email"
                            name="identifier"
                            onChange={this.handleChange}
                        />

                        {/* <label htmlFor="password" className="sr-only">{labels.login.password}</label> */}
                        <input
                            type="password"
                            ref="password"
                            placeholder={labels.login.password}
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={this.handleChange}
                        />

                        {loginFailureAlert}

                        <button
                            className="btn btn-lg btn-primary btn-block"
                            type="submit"
                            disabled={ !(this.state.identifier && this.state.password) }
                            >{labels.login.submitButton}</button>
                        
                        <Button
                            tag={Link}
                            to={`/register`}
                            color="link"
                            block
                            className="mt-4"
                            >Need an account? Register here.
                        </Button>
                    </form>
                </div>
            )
        }
    }

}