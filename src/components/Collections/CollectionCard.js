import React from 'react';
import { Link } from 'react-router-dom';


class CollectionCard extends React.Component {
  render() {
    return(
      <div>
        <Link to={this.props.username + "/" + this.props.safename}>{this.props.name}</Link>
      </div>
    );
  }
}

export default CollectionCard;