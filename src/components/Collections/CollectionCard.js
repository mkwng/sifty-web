import React from 'react';
import { Link } from 'react-router-dom';


class CollectionCard extends React.Component {
  render() {
    return(
      <div 
        key={this.props.collection.id}
        name={this.props.collection.name}
      >
        <Link to={"/collection/" + this.props.collection.id}>{this.props.collection.name}</Link>
      </div>
    );
  }
}

export default CollectionCard;