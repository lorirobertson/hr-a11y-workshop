import React from 'react';
import labels from '../../_utilities/labels';
import auth from '../../_utilities/auth';
import request from '../../_utilities/request';
import FormControl from '../FormControl';

export default class RegistrationForm extends React.Component {
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
    }

    render() {
        return (
            <div id="registration-form-container">
                <form id="registration-form" onSubmit={this.handleRegistration.bind(this)}>
                    <h1>Register</h1>
                    <fieldset>
                        <legend>User Credentials</legend>
                        <FormControl
                            type="text"
                            id="username"
                            name="username"
                            label="Username"
                            onChange={()=>{}}
                        />
                        <FormControl
                            type="text"
                            id="password"
                            name="password"
                            label="Password"
                            onChange={()=>{}}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Profile Details</legend>
                        <FormControl
                            type="text"
                            id="email"
                            name="email"
                            label="Email Address"
                            onChange={()=>{}}
                        />
                        <FormControl
                            type="text"
                            id="fullName"
                            name="fullName"
                            label="Full Name"
                            onChange={()=>{}}
                        />
                        <FormControl
                            type="datepicker"
                            id="dob"
                            name="dob"
                            label="Birth Date"
                            onChange={()=>{}}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                        <FormControl
                            type="text"
                            id="position"
                            name="position"
                            label="Position"
                            onChange={()=>{}}
                        />
                    </fieldset>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Register!</button>
                </form>
            </div>
        )
    }

}