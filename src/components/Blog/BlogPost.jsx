import styles from "../../styles/components/BlogPost.module.scss";
import React from 'react';
import Link from 'next/link';
import request from '../../_utilities/request';
import { format } from 'date-fns';
import styled from 'styled-components';

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
        <div id={this.state.id} className={styles.post}>
            <img src={this.state.img.src}/>
            <div>
                <Link href={`/news/post/${this.state.id}`}>
                    <a className="post-title">{this.state.title}</a>
                </Link>
                
                {
                    ( this.props.teaser ) ? this.truncate(this.state.body) : <p>{this.state.body}</p>
                }

                <div className="post-footer">
                    <Link href={`/news/category/${this.state.category}`}>
                        <a className="float-right">{this.state.category}</a>
                    </Link>
                    
                    <div className="post-date">
                       {/* Posted on {format(new Date(this.state.created), 'MMMM Do, YYYY')} */}
                    </div>
                </div>
            </div>
        </div>
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