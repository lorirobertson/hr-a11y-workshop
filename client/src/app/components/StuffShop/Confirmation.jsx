import React from 'react';
import { CardColumns } from 'reactstrap';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {}

    render() {
        return (
            <div id="order-confirmation">
                <h1>Order Confirmation</h1>
                <p>Congrats! Your order has been placed. Your stuff will be on the way soon enough.</p>
                <p>Please contact us if you have any questions!</p>
            </div>
        )
    }
}