import React from 'react';
import firebase from '../../firebase';
import CollectionCard from './CollectionCard';
import NewCollection from './NewCollection';
import TopNav from '../TopNav/TopNav';

class Collections extends React.Component {
  constructor(props) {
    super(props);
    let collectionProps = Object.keys(this.props.user.collections).map(key => {
      return { key: key, path: this.props.user.collections[key] }
    })
    this.state = {
      collections: collectionProps,
      ref: {
        collections: firebase.database().ref(`collections`),
      }
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div>
        <TopNav user={this.props.user}></TopNav>
        {
          collections.map( (collection) => (
            <CollectionCard {...collection} />
          ))
        }
        <NewCollection user={this.props.user} />
      </div>

    );
  }
}

export default Collections