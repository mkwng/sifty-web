import React from 'react';
import firebase from '../../firebase';
import { connect } from "react-redux";
import { setCurrentCollection } from "../../actions";
import { Drawer, Form, Button, Input, Icon, message } from 'antd';
import CollectionCard from './CollectionCard';
import NewCollection from './NewCollection';

class Collections extends React.Component {
  state = {
    activeCollection: "",
    user: this.props.currentUser,
    collections: [],
    collectionName: "",
    collectionDetails: "",
    collectionsRef: firebase.database().ref(`users/${this.props.currentUser.uid}/collections`),
    drawer: false,
    firstLoad: true
  }

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedCollections = [];
    this.state.collectionsRef.on("child_added", snap => {
      loadedCollections.push(snap.val());
      this.setState({ collections: loadedCollections }, () => this.setFirstCollection());
    });
  };

  removeListeners = () => {
    this.state.collectionsRef.off();
  };

  setFirstCollection = () => {
    const firstCollection = this.state.collections[0];
    if (this.state.firstLoad && this.state.collections.length > 0) {
      this.props.setCurrentCollection(firstCollection);
      this.setActiveCollection(firstCollection);
    }
    this.setState({ firstLoad: false });
  };

  addCollection = () => {
    const { collectionsRef, collectionName, collectionDetails, user } = this.state;

    const newCollection = collectionsRef.push()

    const newCollectionData = {
      name: collectionName,
      details: collectionDetails,
      createdBy: {
        id: user.uid,
        name: user.displayName,
      },
      roles: {
        [user.uid]: "owner"
      }
    };

    collectionsRef
      .child(newCollection.key)
      .set(newCollectionData)
      .then(() => {
        this.setState({ collectionName: "", collectionDetails: "" });
        this.closeDrawer();
        message.success("New collection added!");
        console.log("collection added");
      })
      .catch(err => {
        console.error(err);
        message.error(err.message);
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addCollection();
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeCollection = collection => {
    this.setActiveCollection(collection);
    this.props.setCurrentCollection(collection);
  };

  setActiveCollection = collection => {
    this.setState({ activeCollection: collection.id });
  };

  isFormValid = ({ collectionName, collectionDetails }) =>
    collectionName && collectionDetails;

  showDrawer = () => this.setState({ drawer: true });

  closeDrawer = () => this.setState({ drawer: false });

  render() {
    const { collections, drawer } = this.state;

    return (
      <div>
        {
          collections.map( collection => (
            <CollectionCard collection={collection} />
          ))
        }
        <NewCollection />
      </div>

    );
  }
}

export default connect(
  null,
  { setCurrentCollection }
)(Collections);

