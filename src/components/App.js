import React from 'react';
import { Layout } from 'antd';
import './App.css';
import { connect } from 'react-redux';

// import SidePanel from './SidePanel/SidePanel';
// import Content from './Content/Content';
// import ContentHeader from './Content/ContentHeader';
// import ContentFooter from './Content/ContentFooter';
import TopNav from './TopNav/TopNav';

const App = ({currentUser}) => (
  <Layout>
    <TopNav currentUser={currentUser} />
  </Layout>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App)