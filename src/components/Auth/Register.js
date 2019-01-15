import React from 'react';
import {
  Form, Input, Checkbox, Button, Icon
} from 'antd';
import './Register.css';
import firebase from '../../firebase';


class NormalRegisterForm extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        firebase 
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then(createdUser => {
            console.log(createdUser);
          }).catch(err => {
            console.error(err);
          });
      }
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="register-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input 
              name="username"
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
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input 
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
          {getFieldDecorator('passwordConfirmation', {
            rules: [{ required: true, message: 'Please confirm your Password!' }],
          })(
            <Input 
              name="passwordConfirmation"
              prefix={
                <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
              } 
              type="password" 
              placeholder="Confirm password"
              onChange={this.handleChange} 
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Agree to <a href="">terms and conditions</a></Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="register-form-button">
            Register
          </Button>
          Or <a href="">login now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const Register = Form.create({ name: 'normal_register' })(NormalRegisterForm);

export default Register
