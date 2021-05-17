import React from 'react';
import { Row, Col, Form, ButtonGroup, Button } from 'reactstrap';
import auth from '../../_utilities/auth';
import FormControl from '../FormControl';
import ShoppingCart from './ShoppingCart';
import Router from 'next/router';

export default class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shipping: {
                name: null,
                address: null,
                address2: null,
                city: null,
                state: null,
                zip: null,
                country: null,
                method: null
            },
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isSubmitDisabled = this.isSubmitDisabled.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.calcShipping = this.calcShipping.bind(this);
    }

    componentDidMount() {
        let userInfo = auth.get('user');
        this.setState({
            shipping: {
                name: userInfo.fullName,
                address: userInfo.address,
                address2: userInfo.address2,
                city: userInfo.city,
                state: userInfo.state,
                zip: userInfo.zip,
                country: userInfo.country
            }
        });
    }

    calcShipping(selected) {
        const method = {
            'usps': 10,
            'ups': 20,
            'ups_nextday': 40 
        }

        return method[selected];
    }

    onRadioBtnClick(v) {
        this.setState({
            shipping: Object.assign({}, this.state.shipping, {method: v})
        });
    }    

    handleChange(e) {
        let state = {};
        state[e.target.name] = e.target.value;

        this.setState({
            shipping: Object.assign({}, this.state.shipping, state)
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ redirect: true });
        localStorage.removeItem('cart');
    }

    isSubmitDisabled() {
        let info = this.state.shipping;
        if ( info.name && info.address && info.city && info.state && info.zip && info.country && info.method ) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        const shippingFields = [
            {id: 'name', type: 'text', label: 'Name', data: this.state.shipping.name},
            {id: 'address', type: 'text', label: 'Address', data: this.state.shipping.address},
            {id: 'address2', type: 'text', label: 'Address2', data: this.state.shipping.address2},
            {id: 'city', type: 'text', label: 'City', data: this.state.shipping.city},
            {id: 'state', type: 'text', label: 'State', data: this.state.shipping.state},
            {id: 'zip', type: 'text', label: 'Zip', data: this.state.shipping.zip},
            {id: 'country', type: 'text', label: 'Country', data: this.state.shipping.country}
        ];

        if ( this.state.redirect ) {
            //return <Redirect to={`/stuff-shop/order-confirmation`} />;
            Router.push(`/stuff-shop/order-confirmation`);
        }

        return (
            <div id="checkout">
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md="8">
                            <div id="shipping-info" className="mb-5">
                                <p className="h3">Shipping Information</p>
                                {
                                    shippingFields.map((field, index) => 
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
                            </div>
                            <div id="shipping-method">
                                <p className="h3">Shipping Method</p>
                                <ButtonGroup>
                                    <Button
                                        color="info"
                                        size="lg"
                                        onClick={() => this.onRadioBtnClick('usps')}
                                        active={this.state.shipping.method === 'usps'}
                                        className="text-left">
                                        <b>USPS</b>
                                        <br/>
                                        $10.00 USD
                                    </Button>
                                    <Button
                                        color="info"
                                        size="lg"
                                        onClick={() => this.onRadioBtnClick('ups')}
                                        active={this.state.shipping.method === 'ups'}
                                        className="text-left">
                                        <b>UPS Ground</b>
                                        <br/>
                                        $20.00 USD
                                    </Button>
                                    <Button
                                        color="info"
                                        size="lg"
                                        onClick={() => this.onRadioBtnClick('ups_nextday')}
                                        active={this.state.shipping.method === 'ups_nextday'}
                                        className="text-left">
                                        <b>UPS Next Day Air</b>
                                        <br/>
                                        $40.00 USD
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </Col>
                        <Col>
                            <ShoppingCart checkout shippingCost={this.calcShipping(this.state.shipping.method)}/>
                            <Button
                                className="mt-5"
                                type="submit"
                                color="success"
                                disabled={this.isSubmitDisabled()}
                                size="lg"
                                block
                            >Complete Order</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}