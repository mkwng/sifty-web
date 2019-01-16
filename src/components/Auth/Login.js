import React from 'react';
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import firebase from '../../firebase';
import { Link } from "react-router-dom";
import './Login.css'

class NormalLoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false,
    errors: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ errors: [], loading: true });
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(signedInUser => {
            console.log(signedInUser)
          })
          .catch(err => {
            console.error(err);
            this.setState({
              errors: this.state.errors.concat(err),
              loading:false
            })
          });
      }
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
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
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
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
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Link className="login-form-forgot"  to="/">Forgot password</Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link  to="/login">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login;
