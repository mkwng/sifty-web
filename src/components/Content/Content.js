import React from 'react';
import DocumentGrid from '../Documents/DocumentGrid';
import Collections from '../Collections/Collections';
import { Route } from "react-router-dom";
import { Layout } from 'antd';


class Content extends React.Component {
  render() {
    return (
      <Layout style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          <Route exact path={this.props.match.path} render={() => (
            <Collections
              key={this.props.currentUser ? this.props.currentUser.uid : null} 
              currentUser={this.props.currentUser}
              currentCollection={this.props.currentCollection}
            />
          )} />
          <Route path={`${this.props.match.path}/:collectionId`} render={() => (
            <DocumentGrid
              key={this.props.currentUser ? this.props.currentUser.uid : null} 
              currentUser={this.props.currentUser}
              currentCollection={this.props.currentCollection}
            />
          )} />
        </div>
      </Layout>
    )
  }
}
export default Content
