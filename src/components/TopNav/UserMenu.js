import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from "react-router-dom";
import firebase from '../../firebase'



class UserMenu extends React.Component {

  handleSignout = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
  }

  render () {

    let dropdownMenu = (
      <Menu>
        <Menu.Item key="0">
          <Link to="/"><Icon type="user" /> View Profile</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/"><Icon type="setting" /> Settings</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" >
          <Link to="/" onClick={this.handleSignout}><Icon type="poweroff" /> Log out</Link>
        </Menu.Item>
      </Menu>
    );

    return(
        <div>
          <Dropdown overlay={dropdownMenu}>
            <Link to="/" className="ant-dropdown-link" href="#" >
              { this.props.user ? this.props.user.displayName : "Loading..." } <Icon type="down" />
            </Link>
          </Dropdown>
        </div>
    );
  }
}

export default UserMenu;