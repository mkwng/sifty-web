import React from 'react';
import Logo from '../Common/Logo';
import TopMenu from './TopMenu';
import UserMenu from './UserMenu';


class TopNav extends React.Component {
  state = {
    isExpanded: false
  }

  handleToggle = (e) => {
    e.preventDefault();
    console.log("click");
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  render() {
    console.log(this.state.isExpanded);
    return (
      <div>

        <a href="#" onClick={this.handleToggle}> <Logo /> </a>

        <UserMenu currentUser={this.props.currentUser} />

        <TopMenu isVisible={this.state.isExpanded} />

      </div>
    )
  }
}

export default TopNav;