import React from 'react';
import { Layout } from 'antd';
import './App.css';

import SidePanel from './SidePanel/SidePanel';
import ContentHeader from './ContentHeader/ContentHeader';
import Content from './Content/Content';
import ContentFooter from './ContentFooter/ContentFooter';

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