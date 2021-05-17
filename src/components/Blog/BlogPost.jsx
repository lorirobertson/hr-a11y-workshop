import React from 'react';
import Link from 'next/link';
import request from '../../_utilities/request';
import moment from 'moment';
import styled from 'styled-components';
import { ScenarioAttributes } from '@components/Scenario';

const PostContainer = styled.div`
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(51, 51, 51, 0.08);
    margin-bottom: 50px;
`;

const PostImg = styled.img`
    max-width: 100%;
    height: auto;
    display: block;
`;

const PostTitle = styled.a`
    text-align: center;
    font-size: 24px;
    letter-spacing: 0.5px;
    margin-bottom: 24px;
    display: block;
    font-family: 'ProximaNova', sans-serif;
    text-transform: uppercase;
    color: #000;
`;

const PostContent = styled.div`
    padding: 40px;
`;

const PostBody = styled.p`
    white-space: pre-line;
`;

const PostFooter = styled.div`
    border-top: 1px solid #e2e2e2;
    padding-top: 20px;
`;

const PostDate = styled.div`
    color: #666;
    font-style: italic;
`;

class BlogPost extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        category: '',
        title: '',
        body: '',
        created: '',
        id: null,
        img: {
            src: null,
            alt: null
        }
    }
  }

  componentDidMount() {
    if ( this.props.id && !this.props.title ) {
        this.fetchPost(this.props.id);
    } else if ( this.props.latest ) {
        this.fetchLatestPost();
    } else {
        this.setState({...this.props});
    }
      
  }

  fetchPost(id) {
    if (id)
      fetch(`/api/v1/posts/${id}`)
        .then(resp => resp.json())
        .then(data => this.setState({...data}))

    return false;
  }

  fetchLatestPost() {
    fetch(`/api/v1/posts`)
        .then(resp => resp.json())
        .then(data => 
            this.setState({...data[data.length - 1]})    
        )
  }

  truncate(str) {
    const max = 30;
    const arr = str.split(' ');
    let output = '';

    for (let i=0; i <= max; i++ ) {
        if ( arr[i] !== undefined ) output += `${arr[i]} `;
    }

    output = output.trim();

    if ( output.substr(output.length - 1) !== '.' ) {
        output += '...';
    }

    return (
        <p className="post-body">
            {output}{' '}
            <Link href={`/news/post/${this.state.id}`}>
                <a>Read More</a>
            </Link>
        </p>
    );
  }

  render() {
    return (
        <PostContainer id={this.state.id}>
            <PostImg src={this.state.img.src} className="post-image"
                {...ScenarioAttributes("complete", {
                    alt: this.state.img.alt
                })}
            />
            <PostContent>
                <Link href={`/news/post/${this.state.id}`}>
                    <PostTitle>{this.state.title}</PostTitle>
                </Link>
                
                {
                    ( this.props.teaser ) ? this.truncate(this.state.body) : <PostBody>{this.state.body}</PostBody>
                }

                <PostFooter>
                    <Link href={`/news/category/${this.state.category}`}>
                        <a className="float-right">{this.state.category}</a>
                    </Link>
                    
                    <PostDate>
                       Posted on {moment(this.state.created).format('MMMM Do, YYYY')}
                    </PostDate>
                </PostFooter>
            </PostContent>
        </PostContainer>
    )
  }
}

export default BlogPost;

BlogPost.defaultProps = {
    category: 'Uncategorized',
    teaser: true,
    latest: false,
    title: null,
    body: 'blah blah blah...',
    created: new Date('11/06/1988'),
    id: 0,
    img: {
        src: null,
        alt: null
    }
};