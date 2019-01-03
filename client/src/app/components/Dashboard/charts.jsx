import React from 'react';
import _ from 'lodash';
import { ResponsivePie, ResponsiveCalendar } from 'nivo';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { pie, calendar } from './data';

export default class Charts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {}

    clickHandler(e) {
        console.log(e);
    }

    render() {
        return (
            <Row>
                <Col lg="6">
                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>Pie Chart</CardTitle>
                            <div style={{height: '400px'}}>
                                <ResponsivePie
                                    data={pie}
                                    margin={{
                                        "top": 40,
                                        "right": 0,
                                        "bottom": 0,
                                        "left": 0
                                    }}
                                    innerRadius={0.8}
                                    padAngle={0.7}
                                    cornerRadius={3}
                                />                
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6">
                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>Calendar</CardTitle>
                            <div style={{height: '200px'}}>
                                <ResponsiveCalendar
                                    data={calendar}
                                    from="2015-03-01"
                                    to="2016-07-12"
                                    emptyColor="#eeeeee"
                                    colors={[
                                        "#61cdbb",
                                        "#97e3d5",
                                        "#e8c1a0",
                                        "#f47560"
                                    ]}
                                    yearSpacing={40}
                                    monthBorderColor="#ffffff"
                                    monthLegendOffset={10}
                                    dayBorderWidth={2}
                                    dayBorderColor="#ffffff"
                                    onClick={(e) => this.clickHandler(e)}
                                    legends={[
                                        {
                                            "anchor": "bottom-right",
                                            "direction": "row",
                                            "translateY": 36,
                                            "itemCount": 4,
                                            "itemWidth": 34,
                                            "itemHeight": 36,
                                            "itemDirection": "top-to-bottom"
                                        }
                                    ]}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}