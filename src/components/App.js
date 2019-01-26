import React from 'react';
// import { Layout } from 'antd';
import './App.css';
import { connect } from 'react-redux';
import Documents from './Documents/Documents';
import Collections from './Collections/Collections';
import { Route } from "react-router-dom";

import TopNav from './TopNav/TopNav';

class App extends React.Component {
  render() {
    return (
      <div>
        <TopNav 
          currentUser={this.props.currentUser} 
        />

        <div>
            <Route exact path={this.props.match.path} render={(routeProps) => (
              <Collections {...routeProps} currentUser={this.props.currentUser}/>
            )} />
            <Route path={`${this.props.match.path}/:collection`} render={(routeProps) => (
              <Documents {...routeProps} currentUser={this.props.currentUser}/>
            )} />
        </div>
    
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentCollection: state.collection.currentCollection
})

export default connect(mapStateToProps)(App)