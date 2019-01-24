import React from 'react';
import DocumentCard from './DocumentCard';
import DocumentAdder from './DocumentAdder';
import createAbsoluteGrid from 'react-absolute-grid';

import firebase from '../../firebase';
import * as _ from 'lodash';

const AbsoluteGrid = createAbsoluteGrid(DocumentCard);

class DocumentGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentsRef: firebase.database().ref("documents"),
      documents: [],
      documentsLoading: true,
      collection: this.props.currentCollection,
      user: this.props.currentUser,
    }
    this.onMove =  _.debounce(this.onMove, 40).bind(this);
  }

  componentDidMount() {
    const { collection, user } = this.state;

    if(collection && user) {
      this.addListeners(collection.id);
    }
  }

  addListeners = collectionId => {
    this.addDocumentListener(collectionId);
  }

  addDocumentListener = collectionId => {
    let loadedDocuments = []
    this.state.documentsRef.child(collectionId).on('child_added', snap => {
      let newDoc = snap.val();
      newDoc.key = snap.key;
      loadedDocuments.push(newDoc);
      this.setState({
        documents: loadedDocuments,
        documentsLoading: false,
      })
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
        <DocumentAdder collectionSize={this.state.documents.length} 
                       collection={this.state.collection} 
                       user={this.state.user} />
      </div>
    )
  }
}

export default DocumentGrid;