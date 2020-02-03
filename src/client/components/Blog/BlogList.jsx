import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import request from '../../_utilities/request';
import BlogPost from './BlogPost';
import PaginationControl from '../PaginationControl';

class BlogList extends React.Component {
  constructor(props) {
    super(props)

    this.fetchPosts = this.fetchPosts.bind(this);
    this.changePage = this.changePage.bind(this);
    this.toggleSort = this.toggleSort.bind(this);

    this.state = {
      loading: true,
      posts: [],
      paging: {
        totalNumPosts: 0,
        currentIndex: 0
      },
      sort: this.props.sort,
      filter: this.props.filter,
      category: this.props.category,
    }
  }

  componentDidMount() {
    this.fetchPosts();   
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.state.filter) {
      this.setState({ filter: nextProps.filter}, ()=> this.fetchPosts());
    }

    if (nextProps.category !== this.state.category) {
      this.setState({ category: nextProps.category}, ()=> this.fetchPosts());
    }
  }

  buildParamsObject() {
    let params = {};

    if ( this.state.category )
      params.category = this.state.category

    return params;
  }

  countPosts() {
    // get the total number of posts
    request.get(`/posts/count`, this.buildParamsObject())
      .then((resp)=>{
        let paging = {...this.state.paging}
        paging.totalNumPosts = resp.count;
        this.setState({ paging });
      }) 
  }

  sort(data, direction='desc') {
    return data.sort((a,b) => {
      if ( direction === 'desc' ) {
        return new Date(b.created) - new Date(a.created);
      } else {
        return new Date(a.created) - new Date(b.created);
      }
    });
  }

  fetchPosts() {
    this.setState({ loading: true });

    request.get(`/posts`, this.buildParamsObject())
      .then((resp)=>{
        this.setState({ posts: [] });
        this.countPosts();
        return resp.data;
      })
      .then(data => this.sort(data,this.state.sort))
      .then(data => {
        this.setState({ posts: data, loading: false });
      })
      .catch(err=>console.log(err));
  }

  toggleSort() {
    let sort = ( this.state.sort === 'desc' ) ? 'asc' : 'desc';
    this.setState({ sort }, ()=> this.fetchPosts());
  }

  changePage(el) {
    el.preventDefault();
    let value = el.target.value ? el.target.value : el.target.parentNode.value;
    let currentIndex = this.state.paging.currentIndex;
    let totalNumPosts = this.state.paging.totalNumPosts;

    if ( Number.isInteger(parseInt(value)) ) {
      currentIndex = parseInt(value) * this.props.itemsPerPage;
    } else {
      if ( value == 'next' ) {
        currentIndex = currentIndex + this.props.itemsPerPage;
      } else if ( value == 'prev' ) {
        currentIndex = currentIndex - this.props.itemsPerPage;
      }
    }

    if ( currentIndex >= 0 && currentIndex <= totalNumPosts ) {
      let paging = {...this.state.paging}
      paging.currentIndex = currentIndex;
      this.setState({ paging }, ()=> this.fetchPosts());
    }

    return false;
  }

  render() {
    if ( this.state.loading ) {
      return (
        <div className="text-center fa-10x">
          <i className="fas fa-circle-notch fa-spin"></i>
        </div>
      );
    }
    
    const sortDirectionClass = ( this.state.sort !== 'desc' ) ? 'up' : 'down';
    return (
        <div id="posts">
          <Row hidden={ !this.state.posts.length }>
            <Col>
              <PaginationControl 
                Hidden={ 
                  this.props.itemsPerPage > this.state.paging.totalNumPosts
                }
                Label="Blog list paging"
                NumberOfItems={this.state.paging.totalNumPosts}
                ActiveIndex={Math.round(this.state.paging.currentIndex/this.props.itemsPerPage)}
                Action={this.changePage}
              />
            </Col>
            <Col>
              <Button
                className="float-right"
                type="button"
                onClick={this.toggleSort}
                color="link"
              >
                Sort by Posted Date{' '}
                <i className={'fas fa-sort-' + sortDirectionClass}></i>
              </Button>
            </Col>
          </Row>

          {
            this.state.posts
              .map((post,index) => 
                <BlogPost key={index} {...post} />)
          }

          {
            !this.state.posts.length ? <p className="h1 text-center">No posts found!</p> : ''
          }
        </div>
    );
  }
}

export default BlogList;

BlogList.defaultProps = {
  sort: 'desc',
  filter: null,
  itemsPerPage: 5 
}