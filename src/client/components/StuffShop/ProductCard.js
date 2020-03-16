import React from 'react';
import Link from 'next/link';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import request from '../../_utilities/request';

export default class ProductCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                id: null,
                name: null,
                description: null,
                colors: '',
                price: 0,
                img: {
                    src: null,
                    alt: null
                }
            }
        }
    }

    componentDidMount() {
        if ( this.props._id && (!this.props.title && !this.props.description && !this.props.price) ) {
            request.get(`/products/${this.props.id}`)
                .then(resp => {
                    this.setState({
                        product: resp.data
                    });
                })
                .catch(err => console.log(err));
        } else {
            const product = this.props;
            this.setState({
                product
            });
        }
    }

    truncate(str, max=30) {
        let output = '';
        if ( str ) {
            const arr = str.split(' ');

            for (let i=0; i <= max; i++ ) {
                output += `${arr[i]} `;
            }
    
            output = output.trim();
    
            if ( output.substr(output.length - 1) !== '.' ) {
                output += '...';
            }
        }

        return output;
    }    

    render() {
        return (
            <Card className="product-card" id={`product-${this.state.product._id}`}>
                <Link
                    href={`/stuff-shop/product/[id]`}
                    as={`/stuff-shop/product/${this.state.product._id}`}
                >
                    <a aria-label={`View product: ${this.state.product.name}`}>
                        <CardImg
                            top
                            width="100%"
                            src={this.state.product.img.src}
                            // alt={this.state.product.img.alt}
                        />
                    </a>
                </Link>
                <CardBody>
                    <p className="h5">{this.state.product.name}</p>

                    <p className="h6">
                        {
                            (this.state.product.price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
                        }
                    </p>

                    <CardText>{this.truncate(this.state.product.description, 15)}</CardText>

                    <CardText>{this.state.product.colors.split(',').length} Colors</CardText>

                    <Link
                        href={`/stuff-shop/product/[id]`}
                        as={`/stuff-shop/product/${this.state.product._id}`}
                    >
                        <Button
                            color="primary"
                            block
                            size="sm"
                        >View Details</Button>
                    </Link>
                </CardBody>
            </Card>
        )
    }
}

ProductCard.defaultProps = {
    colors: '',
    price: 0,
}