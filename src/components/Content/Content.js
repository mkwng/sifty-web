import React from 'react';
import { Skeleton, Layout } from 'antd';

class Content extends React.Component {
  render () {
    console.log(this.props);
    return(
        <Layout style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            <Skeleton active loading={this.props.isLoading}/>
          </div>
        </Layout>
    );
  }
}

export default Content