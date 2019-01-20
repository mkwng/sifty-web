import React from 'react';
import DocumentGrid from '../Documents/DocumentGrid';
import Collections from '../Collections/Collections';
import { Route } from "react-router-dom";
import { Layout } from 'antd';


function Content(props) {
  console.log(props);
  return(
    <Layout style={{ margin: '24px 16px 0', overflow: 'initial' }}>
      <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
        <Route exact path={props.match.path} render={(props) => (
          <Collections
            key={props.currentUser && props.currentUser.uid} 
            currentUser={props.currentUser}
          />
        )} />
        <Route path={`${props.match.path}/:collectionId`} render={(props) => (
          <DocumentGrid
            key={props.currentUser && props.currentUser.uid} 
            currentUser={props.currentUser}
          />
        )} />
      </div>
    </Layout>
  )
}

export default Content

