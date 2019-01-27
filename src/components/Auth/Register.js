import React from 'react';
import { Form, Input, Checkbox, Button, Icon } from 'antd';
import './Register.css';
import firebase from '../../firebase';
import { Link } from "react-router-dom";


class NormalRegisterForm extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    loading: false,
    errors: [],
    usersRef: firebase.database().ref("users"),
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => { if (!err) {
      this.setState({ errors: [], loading: true }); 
      firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          return Promise.all([
            createdUser.user.updateProfile({ displayName: this.state.username }),
            this.state.usersRef.child(this.state.username).set({ 
              displayName: this.state.username,
              uid: createdUser.user.uid,
              email: this.state.email
            })
          ])
        })
        .catch(err => { console.log(err) });
    }})
  }

  isFormValid = function() {
    this.props.form.validateFields((err, values) => {
      if (!err) { return true; }
      else { return false; }
    })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="register-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid e-mail',
            }, {
              required: true, message: 'Please provide your e-mail address',
            }],
          })(
            <Input 
              name="email"
              prefix={<Icon 
                type="mail" 
                style={{ color: 'rgba(0,0,0,.25)' }} />
              } 
              placeholder="Email" 
              onChange={this.handleChange} 
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: 'Please choose a username',
            }],
          })(
            <Input 
              name="username"
              prefix={<Icon 
                type="user" 
                style={{ color: 'rgba(0,0,0,.25)' }} />
              } 
              placeholder="Display name" 
              onChange={this.handleChange} 
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please choose a password',
            }],
          })(
            <Input.Password 
              name="password"
              prefix={
                <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
              } 
              type="password" 
              placeholder="Password" 
              onChange={this.handleChange} 
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('agreement',  {
            rules: [{
              required: true, message: 'Please agree to the terms and conditions',
            }],
            initialValue: false,
          })(
            <Checkbox>Agree to <Link to="/">terms and conditions</Link></Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="register-form-button">
            Register
          </Button>
          Or <Link to="/">login now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const Register = Form.create({ name: 'normal_register' })(NormalRegisterForm);

export default Register
