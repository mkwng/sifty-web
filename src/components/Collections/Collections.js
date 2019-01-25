import React from 'react';
import firebase from '../../firebase';
import { connect } from "react-redux";
import { setCurrentCollection } from "../../actions";
import { Drawer, Form, Button, Input, Icon, message } from 'antd';
import { Link } from "react-router-dom";

class Collections extends React.Component {
  state = {
    activeCollection: "",
    user: this.props.currentUser,
    collections: [],
    collectionName: "",
    collectionDetails: "",
    collectionsRef: firebase.database().ref("users/" + this.props.currentUser.uid + "/collections"),
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

    const key = collectionsRef.push()

    const newCollection = {
      id: key,
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
      .child(key)
      .update(newCollection)
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

  displayCollections = collections =>
    collections.length > 0 &&
    collections.map(collection => (
      <div 
        key={collection.id}
        onClick={() => this.changeCollection(collection)}
        name={collection.name}
        style={{ opacity: "0.7" }}
        active={collection.id === this.state.activeCollection ? "true" : "false"}
      >
        <Link to={"/collection/" + collection.id}>{collection.name}</Link>
      </div>
    ));

  isFormValid = ({ collectionName, collectionDetails }) =>
    collectionName && collectionDetails;

  showDrawer = () => this.setState({ drawer: true });

  closeDrawer = () => this.setState({ drawer: false });

  render() {
    const { collections, drawer } = this.state;

    return (
      <div>
        {this.displayCollections(collections)}
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> New collection
        </Button>

        <Drawer
          title="Create a collection"
          width={480}
          onClose={this.closeDrawer}
          visible={drawer}
          style={{
            overflow: 'auto',
            height: 'calc(100% - 108px)',
            paddingBottom: '108px',
          }}
        >
          <div>
            
            <Form.Item>
              <Input
                prefix={<Icon 
                  type="book" 
                  style={{ color: 'rgba(0,0,0,.25)' }} />
                } 
                placeholder="Name of collection"
                label="Name of Collection"
                name="collectionName"
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input.TextArea
                prefix={<Icon 
                  type="align-left" 
                  style={{ color: 'rgba(0,0,0,.25)' }} />
                } 
                placeholder="Description"
                label="About the Collection"
                name="collectionDetails"
                onChange={this.handleChange}
                autosize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.closeDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>

    );
  }
}

export default connect(
  null,
  { setCurrentCollection }
)(Collections);

