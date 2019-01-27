import React from 'react';
import { Form, Input, Button, Drawer, Icon, message } from 'antd';
import firebase from '../../firebase';

class NewCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      name: "", 
      details: "",
      ref: {
        collections: firebase.database().ref('collections'),
        user:firebase.database().ref(`users/${this.props.user.uid}`)
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ loading: true, visible: false });
      this.addCollection()
      .then(() => {
        this.setState({
          loading: false,
          name: "", 
          details: ""
        });
      })
      .catch(err => {
        console.error(err);
        message.error(err.message);
      });
    } else {
      message.error("Missing fields");
    }
  };

  addCollection = () => {
    let newCollectionRef = this.state.ref.collections.push();
    let newCollectionName = safeString(this.state.name);
    const newCollectionData = {
      name: this.state.name,
      safename: newCollectionName,
      details: this.state.details,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      owner: this.props.user.displayName,
      roles: { [this.props.user.uid]: "owner" }
    };

    return Promise.all([
      this.state.ref.collections.child(newCollectionRef.key).set(newCollectionData),
      this.state.ref.user.child(`collections/owner`).child(newCollectionName).set(newCollectionRef.key)
    ]);

  };

  handleChange = event => { this.setState({ [event.target.name]: event.target.value }); }
  isFormValid = ({ name, details }) => {
    return name && details
  }
  showDrawer = () => this.setState({ visible: true });
  closeDrawer = () => this.setState({ visible: false });

  render() {
    return(
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> New collection
        </Button>

        <Drawer
          title="Create a collection"
          width={480}
          onClose={this.closeDrawer}
          visible={this.state.visible}
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
                name="name"
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
                name="details"
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
    )
  }
}


function safeString(unsafeString) {
  //https://stackoverflow.com/questions/14107522/producing-seo-friendly-url-in-javascript   
  return unsafeString.toString().toLowerCase()
    .split(/\&+/).join("-and-")
    .split(/[^a-z0-9]/).join("-")
    .split(/-+/).join("-")
    .trim('-');
}


export default NewCollection