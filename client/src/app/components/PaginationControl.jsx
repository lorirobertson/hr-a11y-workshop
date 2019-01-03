import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class PaginationControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: 0,
      itemsPerPage: 0,
      items: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.NumberOfItems !== this.state.items) {
      this.setState({
        items: nextProps.NumberOfItems,
        pages: Math.round(nextProps.NumberOfItems/this.state.itemsPerPage)
      });
    }
  }

  componentDidMount() {
    let itemsPerPage = this.props.ItemsPerPage;
    let items = this.props.NumberOfItems;
    let pages = Math.round(items/itemsPerPage);
    
    this.setState({
      pages,
      itemsPerPage,
      items 
    });
  }

  render() {
    return (
      <Pagination aria-label={this.props.Label} hidden={this.props.Hidden}>
        <PaginationItem>
          <PaginationLink previous value="prev" onClick={this.props.Action} />
        </PaginationItem>

        { 
          Array(this.state.pages)
            .fill()
            .map((_, i) => {
              let isActive = this.props.ActiveIndex == i ? true : false; 
              return <PaginationItem active={isActive} key={i}>
                        <PaginationLink value={i} onClick={this.props.Action}>{i+1}</PaginationLink>
                      </PaginationItem>
            })
        }

        <PaginationItem>
          <PaginationLink next value="next" onClick={this.props.Action} />
        </PaginationItem>
      </Pagination>
    )
  }
}

PaginationControl.defaultProps = {
  ItemsPerPage: 5,
  Label: null,
  NumberOfItems: 0,
  ActiveIndex: 0,
  Hidden: false,
  Action: () => {}
}