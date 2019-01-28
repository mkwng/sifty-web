import React from 'react';
import DocumentCard from './DocumentCard';
import NewDocument from './NewDocument';
import { connect } from "react-redux";
import { setCollection } from '../../actions';

import firebase from '../../firebase';
import * as _ from 'lodash';
import TopNav from '../TopNav/TopNav';


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

  render() {
    const { documents } = this.state;

    return (
      <div id="documents-grid"> 
        <TopNav user={this.props.user}> </TopNav>

        {
          documents.map( (document) => (
            <DocumentCard {...document} />
          ))
        }

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