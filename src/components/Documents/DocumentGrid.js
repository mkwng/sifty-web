import React from 'react';
import DocumentCard from './DocumentCard';
import createAbsoluteGrid from 'react-absolute-grid';
// import {message} from 'antd';
import firebase from '../../firebase';
import * as _ from 'lodash';

const AbsoluteGrid = createAbsoluteGrid(DocumentCard);

const cardTypes = {
  GOOGLE: {
    DOCS: { iconUrl: "https://picsum.photos/16/16/?random" },
    SHEETS: { iconUrl: "https://picsum.photos/16/16/?random" },
    SLIDES: { iconUrl: "https://picsum.photos/16/16/?random" },
  },
  DROPBOX:{
    PAPER: { iconUrl: "https://picsum.photos/16/16/?random" },
    FILES: { iconUrl: "https://picsum.photos/16/16/?random" },
  },
  FIGMA: { iconUrl: "https://picsum.photos/16/16/?random" },
  ZEPLIN: { iconUrl: "https://picsum.photos/16/16/?random" },
  OTHER: {},
}

const fakeData = [
  { key: 1,
    sort: 1,
    fileType: cardTypes.GOOGLE.DOCS, 
    thumbnailUrl: "https://picsum.photos/240/160", 
    title: "Onboarding Documentation",
    description: "This is where you learn about the team and the history",
    lastVisited: "1 hour ago",
    lastUpdated: "6 days ago",
  },
  { key: 2,
    sort: 2,
    fileType: cardTypes.DROPBOX.PAPER, 
    thumbnailUrl: "https://picsum.photos/240/160/?random", 
    title: "Important Links",
    description: "Links to important things that will help you with your job",
    lastVisited: "Never",
    lastUpdated: "4 hours ago",
  },
  { key: 3,
    sort: 3,
    fileType: cardTypes.GOOGLE.SHEETS, 
    thumbnailUrl: "https://picsum.photos/240/160", 
    title: "Travel Itinerary",
    description: "This will help you organize your travel plans for when you need to travel",
    lastVisited: "Just now",
    lastUpdated: "Yesterday",
  },
]

class DocumentGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridItems: fakeData,
      collection: this.props.currentCollection,
      user: this.props.currentUser,
      documentsRef: firebase.database().ref("documents"),
      documents: [],
      documentsLoading: true 
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
      loadedDocuments.push(snap.val());
      console.log(loadedDocuments);
      this.setState({
        documents: loadedDocuments,
        documentsLoading: false,
      })
    })
  }

  onMove = function(source, target) {
    if(target && source){
      source = _.find(this.state.gridItems, {key: parseInt(source, 10)});
      target = _.find(this.state.gridItems, {key: parseInt(target, 10)});
      const targetSort = target.sort;
  
      this.setState({
        gridItems: this.state.gridItems.map(function(item) {
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
    // const { documentsRef } = this.state;
    return (
      <div id="documents-grid"> 
        <AbsoluteGrid items={this.state.gridItems}
                      onMove={this.onMove}
                      dragEnabled={true}
                      responsive={true}
                      verticalMargin={42}
                      itemWidth={304}
                      animation='transform 100ms ease'
                      itemHeight={216}
        />
      </div>
    )
  }
}

export default DocumentGrid;