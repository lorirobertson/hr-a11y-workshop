import React from 'react';
import { Redirect, Link } from 'react-router-dom';

export default class RegistrationSuccess extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div id="registration-form-container">
                <form id="registration-form">
                    <span className="fa-stack fa-5x mb-4">
                        <i className="fas fa-circle fa-stack-2x" style={{color: 'green'}}></i>
                        <i className="fas fa-check fa-inverse fa-stack-1x"></i>
                    </span>
                    <h1>Account created!</h1>
                    <br/>
                    <Link to="/login">Return to Login</Link>
                </form>
            </div>
        )
    }

}