import React from 'react';
import { Layout } from 'antd';
import './App.css';

import SidePanel from './SidePanel/SidePanel';
import Content from './Content/Content';
import ContentHeader from './Content/ContentHeader';
import ContentFooter from './Content/ContentFooter';

class App extends React.Component {
render() {
  return (
    <Layout>
      <SidePanel />
      <Layout>
        <ContentHeader />
        <Content />
        <ContentFooter />
      </Layout>
    </Layout>
  )}
}

export default App