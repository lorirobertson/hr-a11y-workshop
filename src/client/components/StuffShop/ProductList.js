import React from 'react';
import { CardColumns } from 'reactstrap';
import Link from 'next/link';
import request from '../../_utilities/request';
import ProductCard from './ProductCard';

export default class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        request.get(`/products`)
            .then(resp => {
                this.setState({
                    products: resp.data
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div id="product-list">
                <h1>Stuff Shop</h1>
                <CardColumns>
                    {
                        this.state.products
                            .map((product, index) => <ProductCard key={index} {...product} /> )
                    }
                </CardColumns>
            </div>
        )
    }
}