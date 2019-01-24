import React from 'react';
import { Modal, Button, Icon, Input, Form, message } from 'antd';
import firebase from '../../firebase';
import axios from 'axios';


class DocumentAdder extends React.Component{
  state = { 
    visible: false,
    documentsRef: firebase.database().ref("documents"),
    collection: this.props.collection,
    user: this.props.user,
    loading: false,
    url: "",
    metadata: null,
    errors: []
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.newDocument();
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  createDocument = () => {
    const document = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
      },
      url: this.state.url,
      metadata: this.state.metadata,
      sort: this.props.collectionSize + 1,
      lastVisited: firebase.database.ServerValue.TIMESTAMP,
    }
    return document;
  }

  newDocument = () => {
    const { documentsRef, collection } = this.state;
    if (this.state.url) {
      this.setState({ loading: true });
      this.getUrlMetadata(this.state.url)
      .then(result => {
        this.setState({
          metadata: result.data
        })
        const newDocData = this.createDocument();
        return documentsRef.child(collection.id).push(newDocData)
      })
      .then((snap) => {
        if(!(this.state.metadata && this.state.metadata.image)) {
          console.log("about to capture this image")
          this.captureImage(this.state.url, this.props.collection.id, snap.key);
        }
        return this.setState({ loading: false, visible: false, url: "", metadata: null, errors: [] })
      })
      .catch(err => {
        message.error(err.message);
      });
    } else {
      message.error("Please input a URL to save");
    }
  }

  captureImage = (url, collectionId, documentId) => {
    return axios.get('https://api.sifty.space/grabScreen?url=' + url + '&key=' + collectionId + '/' + documentId)
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        message.error("Error");
        console.error(err);
      });
  }

  getUrlMetadata = (url) => {
    return axios.get('https://api.sifty.space/getUrlMetadata?url=' + url)
      .then(res => {
        return res;
      })
      .catch(err => {
        message.error(err.message);
        console.error(err);
        return;
      });
  }

  render() {
    return(
      <div>
        <Button type="primary" onClick={this.showModal}>
          <Icon type="plus" /> Add document
        </Button>
        &nbsp;

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          
          <Form.Item>
            <Input
              prefix={<Icon 
                type="global" 
                style={{ color: 'rgba(0,0,0,.25)' }} />
              } 
              placeholder="Paste or type the URL"
              label="URL"
              name="url"
              onChange={this.handleChange}
            />
          </Form.Item>
        </Modal>
      </div>
    )
  }
}

export default DocumentAdder;