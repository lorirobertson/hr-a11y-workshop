import React from 'react';
import { CardColumns } from 'reactstrap';
import Link from 'next/link';
import request from '../../_utilities/request';
import ProductCard from './ProductCard';
import { ScenarioTagWrapper } from '../Scenario';

export default class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        fetch(`/api/v1/products`)
            .then(resp => resp.json())
            .then(data =>
                this.setState({
                    products: data
                })
            )
    }

    render() {
        return (
            <div id="product-list">
                <ScenarioTagWrapper as="h1" original="h2" minScenario="stage3">
                    Stuff Shop
                </ScenarioTagWrapper>
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
