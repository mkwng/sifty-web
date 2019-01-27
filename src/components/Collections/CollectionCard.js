import React from 'react';
import { Link } from 'react-router-dom';

class CollectionCard extends React.Component {
  render() {
    return(
      <div>
        <Link to={this.props.path}>{this.props.path}</Link>
      </div>
    );
  }
}

export default CollectionCard;