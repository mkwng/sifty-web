import React from 'react';
import DocumentCard from './DocumentCard';
import NewDocument from './NewDocument';
import createAbsoluteGrid from 'react-absolute-grid';
import { connect } from "react-redux";
import { setCollection } from '../../actions';

import firebase from '../../firebase';
import * as _ from 'lodash';
import TopNav from '../TopNav/TopNav';

const AbsoluteGrid = createAbsoluteGrid(DocumentCard);

class Documents extends React.Component {
  constructor(props) {
    super(props);

    let k = Object.keys(this.props.user.collections);
    k.map((key,index) => {
      if(this.props.user.collections[key] === this.props.match.params.username + '/' + this.props.match.params.collection ) { 
        this.collectionId = k[index];
        return true;
      }
      return false;
    })

    this.state = {
      documents: [],
      loading: true,
      user: this.props.user,
      ref: {
        documents: firebase.database().ref('documents').orderByChild('collection').startAt(this.collectionId).endAt(this.collectionId),
        collection: firebase.database().ref(`collections/${this.collectionId}`),
      }
    }
    this.onMove =  _.debounce(this.onMove, 40).bind(this);
  }
  componentDidMount() { this.addListeners() }
  componentWillUnmount() { this.removeListeners() }

  addListeners = () => {
    this.addCollectionListener();
    this.addDocumentListener();
  }
  removeListeners = () => {
    this.state.ref.collection.off();
    this.state.ref.documents.off();
  }

  addCollectionListener = () => {
    this.state.ref.collection.on('value', snap => {
      this.props.setCollection(snap.val());
    })
  }
  addDocumentListener = () => {
    let loadedDocuments = []
    this.state.ref.documents.on('child_added', snap => {
      let newDoc = snap.val();
      newDoc.key = snap.key;
      loadedDocuments.push(newDoc);
      this.setState({
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
        <TopNav user={this.props.user}> </TopNav>
        <AbsoluteGrid items={this.state.documents}
                      onMove={this.onMove}
                      dragEnabled={true}
                      responsive={true}
                      verticalMargin={8}
                      itemWidth={304}
                      animation='transform 100ms ease'
                      itemHeight={216}
        />
        <NewDocument collectionSize={this.state.documents.length} 
                    collectionName={this.props.match.params.collection}
                    collectionId={this.collectionId} 
        />
      </div>
    )
  }
}

export default connect(
  null,
  { setCollection }
)(Documents);