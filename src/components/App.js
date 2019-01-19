import React from 'react';
import { Layout } from 'antd';
import './App.css';
import { connect } from 'react-redux';

// import SidePanel from './SidePanel/SidePanel';
import Content from './Content/Content';
// import ContentHeader from './Content/ContentHeader';
// import ContentFooter from './Content/ContentFooter';
import TopNav from './TopNav/TopNav';

class App extends React.Component {
  render() {
    return(
      <Layout>
        <TopNav currentUser={this.props.currentUser} />
        <Content isLoading={!this.props.isAuthed} />
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App)