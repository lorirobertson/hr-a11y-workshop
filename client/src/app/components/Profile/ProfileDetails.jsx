import React from 'react';

export default class ProfileDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ( this.props.data!==undefined && this.props.data ) {
      return (
        <div id={this.props.id} className="profile-detail">
            <span className="info-label">{this.props.label}</span>
            <span className="info-data">{this.props.data}</span>
        </div>
      );
    } else {
      return('');
    }
  }
}