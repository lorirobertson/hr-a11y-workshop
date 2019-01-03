import React, { Fragment } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import auth from '../../_utilities/auth';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap';
import ProfileDetails from './ProfileDetails';

export default class ProfileHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        document.title = 'Profile Home';
        const user = auth.getToken('user');
        this.setState({
            user
        });
    }

    formatAddress() {
        let user = this.state.user;
        let address = <div>
            <span>
                {user.address}{user.address2 ? ' ' + user.address2 : ''}
            </span>
            <span style={{ display: 'block' }}>
                {user.city}, {user.state} {user.zip}
            </span>
            <span>{user.country}</span>
        </div>;
        return address;
    }

    render() {
        return (
            <Fragment>
                <h1>My Profile</h1>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle>Information</CardTitle>
                                <Row>
                                    <Col>
                                        <ProfileDetails id="user-fullName" label="Name" data={this.state.user.fullName} />
                                        <ProfileDetails id="user-dob" label="Date of Birth" data={moment(new Date(this.state.user.dob)).format('MM/DD/YYYY')} />
                                        <ProfileDetails id="user-position" label="Position" data={this.state.user.position} />
                                    </Col>
                                    <Col>
                                        <ProfileDetails id="user-email" label="Email" data={this.state.user.email} />
                                        <ProfileDetails id="user-fullAddress" label="Address" data={this.formatAddress()} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="3">
                        <Button size="lg" color="primary" block tag={Link} to="/account/edit">Update Profile</Button>
                        <Button size="lg" color="primary" block tag={Link} to="/account/password">Change Password</Button>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}