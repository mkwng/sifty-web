import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class CollectionCard extends React.Component {
  render() {
    return(
      <div>
        <Link to={this.props.owner + "/" + this.props.safename}>{this.props.name}</Link>
      </div>
    );
  }
}

export default CollectionCard;