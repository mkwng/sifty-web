import React from 'react';
import { Modal, Button, Icon, Input, Form, message } from 'antd';
import firebase from '../../firebase';


class DocumentAdder extends React.Component{
  state = { 
    visible: false,
    documentsRef: firebase.database().ref("documents"),
    collection: this.props.collection,
    user: this.props.user,
    loading: false,
    url: "",
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
      sort: this.props.collectionSize + 1,
      thumbnailUrl: "https://picsum.photos/240/160", 
      title: "Test 1",
      description: "Description",
      lastVisited: "1 hour ago",
      lastUpdated: "6 days ago",
      fileType: null,
    }
    return document;
  }

  newDocument = () => {
    const { documentsRef, collection } = this.state;

    if (this.state.url) {
      this.setState({ loading: true });
      console.log(this.createDocument());
      documentsRef
        .child(collection.id)
        .push()
        .set(this.createDocument())
        .then(() => {
          this.setState({ loading: false, visible: false, url: "", errors: [] })
          message.success("New document added!");
        })
        .catch(err => {
          message.error(err.message);
        })
    } else {
      message.error("Please input a URL to save");
    }
  }

  render() {
    return(
      <div>
        <Button type="primary" onClick={this.showModal}>
          <Icon type="plus" /> Add document
        </Button>
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