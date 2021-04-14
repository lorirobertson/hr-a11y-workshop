import React from 'react';
import Link from 'next/link';
import { Row, Col, Button } from 'reactstrap';
import _ from 'lodash';
import cart from './cart';
import FormControl from '../FormControl';

export default class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            shippingCost: 0,
            subtotal: 0
        }
    }

    componentDidMount() {
        cart.get()
            .then(cart => {
                this.setState({
                    cart: cart,
                    subtotal: this.calcSubtotal(cart)
                })
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shippingCost !== this.state.shippingCost) {
          this.setState({ shippingCost: nextProps.shippingCost});
        }
    }

    calcSubtotal(c) {
        let cart = c || this.state.cart;
        return _.sumBy(cart, (i) => i.quantity * i.price);
    }

    updateQuantity(item, newQuantity) {
        item.quantity = parseInt(newQuantity);
        cart.update(item)
            .then(cart => {
                this.setState({
                    cart: cart,
                    subtotal: this.calcSubtotal(cart)
                })
            });
    }

    removeItem(item) {
        cart.remove(item)
            .then((cart)=>{
                this.setState({
                    cart: cart,
                    subtotal: this.calcSubtotal(cart)
                })
            });
    }

    render() {
        return (
            <div id="shopping-cart">
                <div id="cart-header" className="clearfix">
                    <p className="h3 float-left">
                        { this.props.checkout ? 'Item Details' : 'Shopping Cart' }
                    </p>
                </div>
                <div id="cart-total">
                    <p className="h1">
                        <small className="text-muted">Total</small>
                        <br/>
                        {
                            (this.state.subtotal+ this.state.shippingCost).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
                        }
                    </p>
                    {
                        ( this.props.checkout ) ?
                            null
                        :
                            <Link href={`/stuff-shop/checkout`}>
                                <Button
                                    color="primary"
                                    block
                                    hidden={this.props.checkout}
                                    disabled={ !this.state.cart.length }
                                >Checkout</Button> 
                            </Link>
                    }
                </div>
                <div id="cart-list">
                    {
                        this.state.cart
                            .map((item, index)=>
                                <div className="cart-item" key={index}>
                                    <Row>
                                        <Col lg="9">
                                            <p className="font-weight-bold mb-0">{item.name}, {item.color}</p>
                                            <p className="mb-0">
                                                Unit Price: {' '}
                                                {
                                                    (item.price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
                                                }
                                            </p>
                                        </Col>
                                        <Col>
                                            { 
                                                ( this.props.checkout ) ? 
                                                    <p className="h5">
                                                        Qty: {item.quantity}
                                                    </p>
                                                :
                                                    <FormControl
                                                        id={`quantity_${item.id}`}
                                                        name="quantity"
                                                        type="number"
                                                        label="Quantity"
                                                        value={item.quantity}
                                                        onChange={(e)=>this.updateQuantity(item, e.target.value)}
                                                        
                                                    />
                                            }
                                        </Col>
                                    </Row>
                                    {
                                        ( this.props.checkout ) ?
                                            null
                                        :
                                            <Button
                                                className="text-right"
                                                color="link"
                                                block
                                                onClick={()=>this.removeItem(item)}
                                            >Remove</Button> 
                                    }
                                    <hr/>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}

ShoppingCart.defaultProps = {
    checkout: false,
    shippingCost: 0
}