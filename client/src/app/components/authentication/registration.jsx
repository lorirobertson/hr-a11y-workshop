import React from 'react';
import labels from '../../_utilities/labels';
import auth from '../../_utilities/auth';
import request from '../../_utilities/request';
import FormControl from '../FormControl';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import moment from 'moment';

export default class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            email: null,
            fullName: null,
            dob: null,
            position: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.setDOB = this.setDOB.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    } 

    setDOB(d) {
        this.setState({
            dob: moment(new Date(d)).format('MM/DD/YYYY')
        });
    }

    handleRegistration(e) {
        e.preventDefault();
    }

    render() {
        const hasRequiredData = this.state.username && this.state.password && this.state.email && this.state.fullName && this.state.dob;
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
                            value={this.state.username}
                            onChange={(e)=>this.handleChange(e)}
                        />
                        <FormControl
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                            value={this.state.password}
                            onChange={(e)=>this.handleChange(e)}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Profile Details</legend>
                        <FormControl
                            type="text"
                            id="email"
                            name="email"
                            label="Email Address"
                            value={this.state.email}
                            onChange={(e)=>this.handleChange(e)}
                        />
                        <FormControl
                            type="text"
                            id="fullName"
                            name="fullName"
                            label="Full Name"
                            value={this.state.fullName}
                            onChange={(e)=>this.handleChange(e)}
                        />
                        <FormControl
                            type="datepicker"
                            id="dob"
                            name="dob"
                            label="Birth Date"
                            value={this.state.dob}
                            onChange={(d)=>this.setDOB(d)}
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
                            value={this.state.position}
                            onChange={(e)=>this.handleChange(e)}
                        />
                    </fieldset>

                    <Button
                        disabled={!hasRequiredData}
                        block
                        color="primary"
                        tag={Link}
                        to={`/register/success`}
                        >Register!
                    </Button>

                    <Button
                        tag={Link}
                        to={`/login`}
                        color="link"
                        block
                        className="mt-4"
                        >Already have an account? Login here.
                    </Button>                    
                </form>
            </div>
        )
    }

}