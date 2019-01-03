import React from 'react';
import { Route, Link } from 'react-router-dom';
import request from '../../_utilities/request';
import moment from 'moment';

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
      request.get(`/posts/${id}`)
        .then(resp => {
            this.setState({...resp.data});
        })

    return false;
  }

  fetchLatestPost() {
      request.get(`/posts`, {params: {_sort: 'created:desc', _limit: 1}})
        .then(resp => {
            this.setState({...resp.data[0]});
        })
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
            <Link to={`/blog/post/${this.state.id}`} >Read More</Link>
        </p>
    );
  }

  render() {
    return (
        <div id={this.state.id} className="blog-post">
            <img src={this.state.img.src} alt={this.state.img.alt} className="post-image" />
            <div className="post-content">
                <Link
                    to={`/blog/post/${this.state.id}`}
                    className="h3 post-title"
                >{this.state.title}</Link>

                
                {
                    ( this.props.teaser ) ? this.truncate(this.state.body) : <p className="post-body">{this.state.body}</p>
                }

                <div className="post-footer">
                    <Link
                        to={`/blog/category/${this.state.category}`}
                        className="float-right"
                    >{this.state.category}</Link>
                    
                    <div className="post-date">
                       Posted on {moment(this.state.created).format('MMMM Do, YYYY')}
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