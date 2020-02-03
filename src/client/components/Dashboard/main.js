import React from 'react';
import _ from 'lodash';
import { Row, Col, Card, CardBody, CardTitle, CardHeader, Button } from 'reactstrap';
import { BlogPost as LatestBlogPost } from '../Blog';
import { ProductCard } from '../StuffShop';
// import { WeeklyTotal } from '../Timesheets';
import PTOModal from './PTOModal';
import request from '../../_utilities/request';
import WeeklyTotal from '../Timesheets/WeeklyTotal';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        request
            .get('/products')
            .then(resp => {
                this.setState({products: resp.data.slice(0,2)});
            })
            .catch(err => console.log(err));
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


                    <div className="embed-responsive embed-responsive-16by9 mb-4">
                        <iframe
                            className="embed-responsive-item"
                            scrolling="no"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-78.33675742149354%2C38.381679017781465%2C-76.37295126914978%2C39.36102540645581&amp;layer=mapnik">
                        </iframe>
                    </div>                    
                </Col>
                <Col lg="6">
                    <div className="embed-responsive embed-responsive-16by9 mb-4">
                        <iframe
                            className="embed-responsive-item"
                            src="https://www.youtube.com/embed/2dHXGiOwBBQ"
                            allowFullScreen>
                        </iframe>
                    </div>

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