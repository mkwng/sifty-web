import React from 'react';
import { Layout } from 'antd';

const {Footer} = Layout;

class ContentFooter extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        &copy; 2019 Sifty Organization
      </Footer>
    )
  }
}

export default ContentFooter;