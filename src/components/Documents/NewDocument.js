import React from 'react';
import { Modal, Button, Icon, Input, Form, message } from 'antd';
import firebase from '../../firebase';
import axios from 'axios';

class NewDocument extends React.Component{
  constructor(props) {
    super(props)
    this.state = { 
      visible: false,
      loading: false,
      url: "",
      metadata: null,
      ref: {
        documents: firebase.database().ref(`documents`),
        collection: firebase.database().ref(`collections/${this.props.collectionId}`)
      }
    }
  }

  handleChange = event => { this.setState({ [event.target.name]: event.target.value }); }
  showModal = () => { this.setState({ visible: true }); }
  handleCancel = () => { this.setState({ visible: false }) }
  isFormValid = ({ url }) => isValidUrl(url);

  handleOk = () => { 
    if(this.isFormValid(this.state)){
      this.setState({ loading: true });
      this.addDocument()
      .then(() => {
        this.setState({
          loading: false,
          url: "", 
          metadata: null
        });
      })
      .catch(err => {
        message.error(err.message);
        console.error(err);
      });
    } else {
      message.error("URL is not valid");
    }
  }

  addDocument = () => {
    let newDocumentRef = this.state.ref.documents.push();

    return this.getUrlMetadata(this.state.url)
    .then(result => {
      this.setState({ metadata: result.data })
      if(!(this.state.metadata && this.state.metadata.image)) { this.captureImage(this.state.url, newDocumentRef); }
      return Promise.all([
        this.state.ref.documents.child(newDocumentRef.key).set(this.state.document),
        this.state.ref.collection.child(`documents/${newDocumentRef.key}`).set(this.props.collectionSize + 1)
      ]);
    })
  }

  captureImage = (url, documentId) => {
    return axios.get('https://api.sifty.space/grabScreen?url=' + url + '&key=' + documentId)
    .catch(err => {
      message.error("Error");
      console.error(err);
    });
  }

  getUrlMetadata = (url) => {
    return axios.get('https://api.sifty.space/getUrlMetadata?url=' + url);
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

function isValidUrl(str) {
  //https://stackoverflow.com/questions/1303872/trying-to-validate-url-using-javascript
  var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(str);
}

export default NewDocument;