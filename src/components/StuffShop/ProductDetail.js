import React from 'react';
import Link from 'next/link';
import request from '../../_utilities/request';
import cart from './cart';
import Ratings from 'react-ratings-declarative';
import images from '../../_utilities/placeholderImages';
import { Alert, UncontrolledCarousel, Row, Col, Button } from 'reactstrap';
import FormControl from '../FormControl';

export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: null,
                description: null,
                colors: null,
                price: 0,
                img: {
                    src: null,
                    alt: null
                },
                rating: 0
            },
            options: {
                quantity: null,
                color: null
            },
            alertVisible: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidMount() {
        request.get(`/products/${this.props.id}`)
            .then(resp => {
                this.setState({
                    product: resp.data
                });
            })
            .catch(err => console.log(err));
    }

    onDismiss() {
        this.setState({ alertVisible: false });
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

    scrollToElement(id) {
        var el = document.getElementById(id);
        el.scrollIntoView();        
    }

    renderColorOptionsFromString(str) {
        if ( str ) {
            let colorOptions = str.split(',').map(color=>{ return {value:color, label: color}; });
            colorOptions.unshift({value:'', label: 'Select a color...'});

            return colorOptions;
        } else {
            return [];
        }
    }

    addToCart() {
        if ( this.state.options.quantity && this.state.options.color ) {
            cart.add({
                id: this.props.id,
                name: this.state.product.name,
                price: this.state.product.price,
                quantity: parseInt(this.state.options.quantity),
                color: this.state.options.color
            })
            .then((cart)=>{
                this.setState({ alertVisible: true });
            });
        } else {
            // show error message
            console.log('err');
        }
    }

    handleChange(e) {
        let state = {};
        state[e.target.name] = e.target.value;

        this.setState({
            options: Object.assign({}, this.state.options, state)
        });
    }

    render() {
        const items = [
            {
                src: `/${this.state.product.img.filename}`,
                altText: this.state.product.img.alt,
                caption: ' ',
                header: 'Product Image 1'
            },
            {
                src: images['350x450'].src+' ',
                altText: 'Image 2',
                caption: ' ',
                header: 'Product Image 2'
            },
            {
                src: images['350x450'].src+'  ',
                altText: 'Image 3',
                caption: ' ',
                header: 'Product Image 3'
            }
        ];

        return (
            <div id="product-detail">
                <Row>
                    <Col md={6}>
                        <UncontrolledCarousel items={items} />
                    </Col>
                    <Col>
                        <h1>{this.state.product.name}</h1>
                        <p id="price">{(this.state.product.price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                        <p id="description-teaser">
                            {this.truncate(this.state.product.description, 15)}
                            <Button color="link" onClick={()=>this.scrollToElement('description')}>Read More</Button>
                        </p>
                        <Row>
                            <Col lg={4} md={6}>
                                <FormControl
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    placeholder="Quantity"
                                    label="Quantity"
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col>
                                <FormControl
                                    id="color"
                                    name="color"
                                    type="select"
                                    label="Color"
                                    options={
                                        this.renderColorOptionsFromString(this.state.product.colors)
                                    }
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>

                        <Button
                            type="button"
                            id="btnAddToCart"
                            onClick={() => this.addToCart() }
                            color="primary"
                            block
                            disabled={ !(this.state.options.color && this.state.options.quantity) }
                        >Add to Cart!</Button>

                        <Alert color="success" isOpen={this.state.alertVisible} toggle={this.onDismiss} className="mt-3">
                            Added to your cart! <Link href="/stuff-shop/cart"><a>Click here to view your cart.</a></Link>
                        </Alert>
                        
                        <hr className="mt-4 mb-4"/>

                        <p className="h5">Overall Customer Rating</p>
                        <Ratings
                            rating={this.state.product.rating}
                            widgetRatedColors="#DBCC16"
                        >
                            <Ratings.Widget />
                            <Ratings.Widget />
                            <Ratings.Widget />
                            <Ratings.Widget />
                            <Ratings.Widget />
                        </Ratings>
                        <div id="top-customer-reviews" className="mt-4">
                            <blockquote className="blockquote mb-4">
                                <p className="mb-0">
                                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti et dolorum fuga.
                                </p>
                                <footer className="blockquote-footer">
                                    Mary Sue
                                </footer>
                            </blockquote>

                            <blockquote className="blockquote">
                                <p className="mb-0">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <footer className="blockquote-footer">
                                    Johnny Appleseed
                                </footer>
                            </blockquote>
                        </div>
                    </Col>
                </Row>
                <hr style={{margin: '5em 0'}} />
                <div id="details">
                    <Row>
                        <Col md="6">
                            <div id="description" style={{whiteSpace: 'pre-line'}}>
                                <h3>Description</h3>
                                <p>{this.state.product.description}</p>
                            </div>                    
                        </Col>
                        <Col>
                            <div id="specs">
                                <h3>Specifications</h3>
                                <p><b>Weight:</b> 8.5 lbs</p>
                                <p><b>Height:</b> 15 inches</p>
                                <p><b>Width:</b> 10 inches</p>
                                <p><b>Package Dimensions:</b> 5 inches x 20 inches x 12 inches</p>
                                <p><b>Manufacturer:</b> Awesome Labs, Inc.</p>
                            </div>
                            <br/>
                            <div id="shipping">
                                <h3>Shipping Options</h3>
                                <p>USPS Shipping: $10.00</p>
                                <p>UPS Ground Shipping: 2 - 4 days, $18.00</p>
                                <p>Pony Express: 5 - 10 days, $40.00</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}