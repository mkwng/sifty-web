import React from 'react';
import DocumentGrid from '../DocumentGrid/DocumentGrid';
import { Skeleton, Layout } from 'antd';

class Content extends React.Component {
  render () {
    return(
        <Layout style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            <DocumentGrid />
          </div>
        </Layout>
    );
  }
}

export default Content