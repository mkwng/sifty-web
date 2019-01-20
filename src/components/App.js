import React from 'react';
import { Layout } from 'antd';
import './App.css';
import { connect } from 'react-redux';

import TopNav from './TopNav/TopNav';
import Content from './Content/Content';

const App = ({ currentUser, currentCollection }) => (
  <Layout>
    <TopNav 
      key={currentUser && currentUser.uid} 
      currentUser={currentUser} 
    />
    <Content 
      key={currentCollection && currentCollection.id}
      collection={currentCollection}
      currentUser={currentUser} 
    />
  </Layout>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentCollection: state.collection.currentCollection
})

export default connect(mapStateToProps)(App)