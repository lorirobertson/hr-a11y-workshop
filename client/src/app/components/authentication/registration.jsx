import React from 'react';
import labels from '../../_utilities/labels';
import auth from '../../_utilities/auth';
import request from '../../_utilities/request';

export default class RegistrationForm extends React.Component {

    // Using a class based component here because we're accessing DOM refs
    constructor(props) {
        super(props)
        // the initial application state
        this.state = {
            user: null,
            login: {
                success: null
            }
        }
    }

    // App "actions" (functions that modify state)
    register(userInfo) {
        request.post('/api/v1/register', userInfo)
            .then(resp => {
                if ( resp.data.jwt ) {
                    auth.setToken(resp.data.jwt, true);
                    //auth.set(resp.data.user, 'user', true);
                    this.setState({
                        user: {username,password}
                    });
                } else {
                    this.setState({
                        login: {success: user.success}
                    });
                }
            })
            .catch(err=>console.log(err));
    }    

    handleRegistration(e) {
        e.preventDefault();
        console.log(this.refs);
        //this.register(username, password);
    }

    render() {
        const loginSuccess = this.state.login.success;
        let loginFailureAlert = '';
        if ( loginSuccess == false && loginSuccess !== null) {
            loginFailureAlert = <div>{labels.login.authenticationFailure}</div>;//<UncontrolledAlert className="mt-3 mb-0" color="danger"> {labels.login.authenticationFailure} </UncontrolledAlert>
        }

        if ( localStorage.getItem('access-token') ) {
            return (
                <a onClick={() => {
                        auth.clearAppStorage();
                        this.signOut();
                    }} href="javascript:void(0)">Logout</a>
            );
        } else {
            return (
                <form id="registration-form" onSubmit={this.handleRegistration.bind(this)}>
                    <h4>Register</h4>
                    <div className="form-group">
                        <label htmlFor="email" className="sr-only">{labels.login.email}</label>
                        <input type="text" ref="email" placeholder={labels.login.email} className="form-control" id="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullName" className="sr-only">Full Name</label>
                        <input type="text" ref="fullName" placeholder="John H. Doe" className="form-control" id="fullName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="sr-only">{labels.login.password}</label>
                        <input type="password" ref="password" placeholder={labels.login.password} className="form-control" id="password" />
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Register!</button>
                    {loginFailureAlert}
                </form>
            )
        }
    }

}