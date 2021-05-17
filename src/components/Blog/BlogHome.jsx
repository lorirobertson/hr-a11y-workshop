import React from 'react';
import { Row, Col, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import _ from 'lodash';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import Router from 'next/router';
import Link from 'next/link';

export default class BlogHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: null,
            filterValue: null,
            category: null
        }

        this.filter = this.filter.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
    }

    componentDidMount() {
        if ( this.props.category ) {
            this.setState({
                category: this.props.category
            });
        }
    }

    handleChange(e) {
        this.setState({
            filterValue: e.target.value
        });
    }

    filter() {
        this.setState({
            filter: this.state.filterValue
        });
    }
    
    changeCategory(e) {
        this.setState({ category: e });
    }

    render() {
        const categories = ['Events', 'Product', 'Synergy', 'Innovation', 'Management', 'Sales', 'Support', 'Services', 'Marketing', 'Administrative'];
        
        return (
            <div id="blog-container">
                <h1>Blog Posts & News</h1>
                <Row>
                    <Col lg="9">
                        {
                            this.props.id ?
                                    <BlogPost teaser={false} id={this.props.id} /> :
                                    <BlogList category={this.state.category} filter={this.state.filter} params={this.state.params} />
                        }
                    </Col>
                    <Col lg="3">
                        <InputGroup className="mb-4" hidden={(this.props.id)}>
                            <Input
                                id="filter"
                                placeholder="Search..."
                                onChange={(e)=>this.handleChange(e)}
                            />
                            <InputGroupAddon addonType="prepend">
                                <Button
                                    color="info"
                                    onClick={()=>this.filter()}
                                >Search</Button>
                            </InputGroupAddon>
                        </InputGroup>

                        <p className="h5 text-center">Categories</p>
                        <div className="list-group">
                            <Link href="/news">
                                <a
                                    href="/news"
                                    className="list-group-item list-group-item-action"
                                >All Categories</a>
                            </Link>
                            {
                                categories
                                    .sort((a,b) => {
                                        if(a < b) { return -1; }
                                        return 0;
                                    })
                                    .map((category, index) => {
                                        let isActive = category == this.state.category ? 'active' : '';
                                        return (
                                            <Link
                                                key={index}
                                                href="/news/category/[category]"
                                                as={`/news/category/${category}`}
                                            >
                                                <a
                                                    className={'list-group-item list-group-item-action ' + isActive}
                                                    onClick={() => this.changeCategory(category)}
                                                >{category}</a>
                                            </Link>
                                        )
                                    })
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}