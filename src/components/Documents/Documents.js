import React from 'react';
import DocumentCard from './DocumentCard';
import NewDocument from './NewDocument';
import createAbsoluteGrid from 'react-absolute-grid';

import firebase from '../../firebase';
import * as _ from 'lodash';
import { message } from 'antd';

const AbsoluteGrid = createAbsoluteGrid(DocumentCard);

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentsRef: firebase.database().ref("documents"),
      documents: [],
      loading: true,
      user: this.props.currentUser,
      collectionId: "",
      ref: {
        documents: firebase.database().ref("documents"),
        user: firebase.database().ref(`users/${this.props.currentUser.displayName}`)
      }
    }
    this.onMove =  _.debounce(this.onMove, 40).bind(this);
  }

  componentDidMount() {
    if(this.props.currentUser && this.props.match.params.collection) {
      Promise.all([
        this.getCollectionId(),
        this.addListeners(this.props.match.params.collection)
      ]).then(() => {
        this.setState({ loading: false });
      })
    }
  }

  getCollectionId = () => {
    return this.state.ref.user.once('value', snap => {
      let tempUser = snap.val();
      if(tempUser.collections && tempUser.collections[this.props.match.params.collection]) {
        return this.setState({
          collectionId: tempUser.collections[this.props.match.params.collection]
        });
      } else {
        return message.error("No collection found here!");
      }
    });
  }

  addListeners = collectionId => {
    return this.addDocumentListener(collectionId);
  }

  addDocumentListener = collectionId => {
    let loadedDocuments = []
    return this.state.documentsRef.child(collectionId).on('child_added', snap => {
      let newDoc = snap.val();
      newDoc.key = snap.key;
      loadedDocuments.push(newDoc);
      return this.setState({
        documents: loadedDocuments,
      });
    })
  }

  onMove = function(source, target) {
    if(target && source){
      source = _.find(this.state.documents, {key: source});
      target = _.find(this.state.documents, {key: target});
      const targetSort = target.sort;
  
      this.setState({
        documents: this.state.documents.map(function(item) {
          //Decrement sorts between positions when target is greater
          if(item.key === source.key) {
            return {
              ...item,
              sort: targetSort
            }
          } else if(target.sort > source.sort && (item.sort <= target.sort && item.sort > source.sort)){
            return {
              ...item,
              sort: item.sort - 1
            };
          //Increment sorts between positions when source is greater
          } else if (item.sort >= target.sort && item.sort < source.sort){
            return {
              ...item,
              sort: item.sort + 1
            };
          }
          return item;
        }),
      })
    } else {
      console.log("missing target or source");
      return;
    }
  }

  render() {
    return (
      <div id="documents-grid"> 
        <AbsoluteGrid items={this.state.documents}
                      onMove={this.onMove}
                      dragEnabled={true}
                      responsive={true}
                      verticalMargin={8}
                      itemWidth={304}
                      animation='transform 100ms ease'
                      itemHeight={216}
        />
        {
          this.state.collectionId &&
          <NewDocument collectionSize={this.state.documents.length} 
                      collectionName={this.props.match.params.collection}
                      collectionId={this.state.collectionId} 
                      username={this.props.currentUser.displayName}
          />
        }
      </div>
    )
  }
}

export default Documents;