import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Row, Col, Card, CardBody, CardTitle, CardHeader, Button } from 'reactstrap';
import request from '../../_utilities/request';

export default class WeeklyTotal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: 0
        }
        
        this.week = {
            start: moment().startOf('week').format('MM/DD/YYYY'),
            startUrlEncoded: moment().startOf('week').format('MM-DD-YYYY'),
            end: moment().endOf('week').format('MM/DD/YYYY')
        }
    }

    componentDidMount() {
        request
            .get('/timesheets/grouped', { params: {date_gte: this.week.start} })
            .then(resp => {
                if ( resp.data.length ) this.setState({hours: resp.data[0].hours});
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Row>
                <Col>
                    <div className="text-center">
                        <p className="h1 mb-0">{this.state.hours}</p>
                        <p className="mb-0">Hours logged this week</p>
                        <p className="mb-0">{this.week.start} through {this.week.end}</p>
                    </div>
                </Col>
                <Col>
                    <Button
                        block
                        size="lg"
                        color="success"
                        tag={Link}
                        to={`/timesheets/week/${this.week.startUrlEncoded}/new`}>
                        Log Time
                    </Button>

                    <Button
                        block
                        size="lg"
                        color="secondary"
                        tag={Link}
                        to="/timesheets">
                        View All Timesheets
                    </Button>
                </Col>
            </Row>
        );
    }
}