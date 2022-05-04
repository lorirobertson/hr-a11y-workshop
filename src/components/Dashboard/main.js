import React from 'react';
import _ from 'lodash';
// TODO: REMOVE LODASH -> GRAB INDIVIDUAL FUNCTIONALITY {}
import { Row, Col, Card, CardBody, CardTitle, CardHeader, Button } from 'reactstrap';
import { BlogPost as LatestBlogPost } from '../Blog';
import { ProductCard } from '../StuffShop';
import PTOModal from './PTOModal';
import WeeklyTotal from '../Timesheets/WeeklyTotal';
import request from '../../_utilities/request';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        // request.get(`/products`).then(data2=>{
        //     console.log('data2',data2);
        // });

        fetch(`/api/v1/products`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({products: data?.slice(2,4)});
            })
    }

    render() {
        return (
            <Row>
                <Col lg="6">
                    <Card className="mb-4">
                        <CardBody>
                            {/* <WeeklyTotal/> */}
                            <WeeklyTotal />
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

                    <Row className="mb-4">
                        {
                            this.state.products
                                .map((product, index) => {
                                    return <Col key={index}>
                                                <ProductCard {...product} />
                                            </Col>
                                })
                        }
                    </Row>


                    {/* <div className="embed-responsive embed-responsive-16by9 mb-4">
                        <iframe
                            className="embed-responsive-item"
                            scrolling="no"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-78.33675742149354%2C38.381679017781465%2C-76.37295126914978%2C39.36102540645581&amp;layer=mapnik">
                        </iframe>
                    </div>                     */}
                </Col>
                <Col lg="6">
                    <Card className="mb-4">
                        <CardHeader>
                            <p className="h5">
                                Request PTO
                            </p>
                        </CardHeader>
                        <CardBody>
                            <p>You have a PTO balance of 32 hours.</p>
                            <PTOModal/>
                        </CardBody>
                    </Card>

                    {/* <div className="embed-responsive embed-responsive-16by9 mb-4">
                        <iframe
                            src="https://www.youtube.com/embed/dyU9yrRJ5Eg"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            className="embed-responsive-item">
                        </iframe>
                    </div> */}

                    <LatestBlogPost latest teaser />
                </Col>
            </Row>
        );
    }
}
