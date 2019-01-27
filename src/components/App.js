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
          user={this.props.user} 
        />
        <div>
            <Route exact path={this.props.match.path} render={(routeProps) => {
              return this.props.user ? (
                <Collections {...routeProps} user={this.props.user} collection={this.props.collection}/>
              ) : (<div />);
            }} />
            <Route path={`${this.props.match.path}/:collection`} render={(routeProps) => (
              <Documents {...routeProps} user={this.props.user} collection={this.props.collection}/>
            )} />
        </div>
    
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  collection: state.collection.collection
})

export default connect(mapStateToProps)(App)