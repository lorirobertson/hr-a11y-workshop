import React from 'react';
import moment from 'moment';
import auth from '../../_utilities/auth';
import { Redirect, Link } from 'react-router-dom';
import { Alert, Form, Button } from 'reactstrap';
import FormControl from '../FormControl';

export default class ProfileHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        document.title = 'Edit Profile';
        const user = auth.getToken('user');
        this.setState({
            user: {
                fullName: user.fullName,
                dob: moment(user.dob).format('MM/DD/YYYY'),
                address: user.address,
                address2: user.address2,
                city: user.city,
                state: user.state,
                zip: user.zip,
                country: user.country,
                position: user.position
            }
        });
    }

    handleChange(e) {
        let state = {};
        state[e.target.name] = e.target.value;

        this.setState({
            user: Object.assign({}, this.state.user, state)
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        // update user object
        auth.set(this.state.user, 'user', true);

        this.setState({ redirect: true });
    }

    render() {
        var pageAlert = '';
        if ( this.state.redirect ) {
            pageAlert = <Alert color="success">Your profile information has been saved!</Alert>
            return <Redirect to={`/account`} />;
        }

        const fields = [
            {id: 'fullName', type: 'text', label: 'Full Name', data: this.state.user.fullName},
            {id: 'dob', type: 'text', label: 'Date of Birth', data: this.state.user.dob},
            {id: 'address', type: 'text', label: 'Address', data: this.state.user.address},
            {id: 'address2', type: 'text', label: 'Address2', data: this.state.user.address2},
            {id: 'city', type: 'text', label: 'City', data: this.state.user.city},
            {id: 'state', type: 'text', label: 'State', data: this.state.user.state},
            {id: 'zip', type: 'text', label: 'Zip', data: this.state.user.zip},
            {id: 'country', type: 'text', label: 'Country', data: this.state.user.country}
        ];
        return (
            <div className="container">
                {pageAlert}
                <h1>Edit Profile</h1>
                <Form onSubmit={this.handleSubmit}>
                    {
                        fields.map((field, index) => 
                            <FormControl
                                key={index}
                                id={field.id}
                                name={field.id}
                                type={field.type}
                                label={field.label}
                                value={field.data}
                                onChange={this.handleChange}
                            />   
                        )
                    }

                    <Button type="submit" color="success">Save Profile</Button>
                </Form>
            </div>
        )
    }
}