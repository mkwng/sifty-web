import React from 'react';
// import DocumentGrid from '../Documents/DocumentGrid';
import Collections from '../Collections/Collections';
import { Layout } from 'antd';

class Content extends React.Component {
  render () {
    return(
        <Layout style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            <Collections
              key={this.props.currentUser && this.props.currentUser.uid} 
              currentUser={this.props.currentUser}
             />
          </div>
        </Layout>
    );
  }
}

export default Content