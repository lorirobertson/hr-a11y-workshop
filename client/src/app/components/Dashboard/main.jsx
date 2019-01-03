import React from 'react';
import _ from 'lodash';
import { Row, Col, Card, CardBody, CardTitle, CardHeader, Button } from 'reactstrap';
import { BlogPost as LatestBlogPost } from '../Blog';
import { ProductCard } from '../StuffShop';
import { WeeklyTotal } from '../Timesheets';
import PTOModal from './PTOModal';
import request from '../../_utilities/request';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        request
            .get('/products', { params: {_limit: 2} })
            .then(resp => {
                this.setState({products: resp.data});
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Row>
                <Col lg="6">
                    <Card className="mb-4">
                        <CardBody>
                            <WeeklyTotal/>
                        </CardBody>
                    </Card>

                    <Card outline color="primary" className="mb-4">
                        <CardHeader>
                            <h5>Corporate Message</h5>
                        </CardHeader>
                        <CardBody>
                            Hello Everyone! Just as a reminder that stock bootstrapping series A financing channels user experience virality business-to-business. Early adopters first mover advantage hypotheses.
                        </CardBody>
                    </Card>

                    <Row>
                        { 
                            this.state.products
                                .map((product, index) => {
                                    return <Col key={index}>
                                                <ProductCard {...product} />
                                            </Col>
                                })
                        }
                    </Row>
                </Col>
                <Col lg="6">
                    <LatestBlogPost latest teaser />

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>Request PTO</CardTitle>
                            <p>You have a PTO balance of 32 hours.</p>
                            <PTOModal/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}