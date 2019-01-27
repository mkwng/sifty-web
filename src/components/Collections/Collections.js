import React from 'react';
import firebase from '../../firebase';
import CollectionCard from './CollectionCard';
import NewCollection from './NewCollection';
import TopNav from '../TopNav/TopNav';

class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      ref: {
        collections: firebase.database().ref(`collections`),
      }
    };
  }
  componentDidMount() { this.addListeners() }
  componentWillUnmount() { this.removeListeners() }

  addListeners = () => {
    let loadedCollections = [];
    this.state.ref.collections.on("child_added", snap => {
      let newC = snap.val();
      newC.key = snap.key;
      loadedCollections.push(newC);
      this.setState({ collections: loadedCollections });
    });
  };

  removeListeners = () => {
    this.state.ref.collections.off();
  };

  render() {
    const { collections } = this.state;
    return (
      <div>
        <TopNav></TopNav>
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