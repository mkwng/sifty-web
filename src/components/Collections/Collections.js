import React from 'react';
import firebase from '../../firebase';
import CollectionCard from './CollectionCard';
import NewCollection from './NewCollection';

class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.currentUser,
      collections: [],
      collectionsRef: firebase.database().ref(`collections`),
    };
  }
  componentDidMount() { this.addListeners() }
  componentWillUnmount() { this.removeListeners() }

  addListeners = () => {
    let loadedCollections = [];
    this.state.collectionsRef.on("child_added", snap => {
      let newC = snap.val();
      newC.key = snap.key;
      loadedCollections.push(newC);
      this.setState({ collections: loadedCollections });
    });
  };

  removeListeners = () => {
    this.state.collectionsRef.off();
  };

  render() {
    const { collections } = this.state;
    return (
      <div>
        {
          collections.map( (collection) => (
            <CollectionCard username={this.state.user.displayName} safename={collection.key} {...collection} />
          ))
        }
        <NewCollection username={this.state.user.displayName} />
      </div>

    );
  }
}

export default Collections