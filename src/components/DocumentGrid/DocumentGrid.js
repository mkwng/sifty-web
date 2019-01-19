import React from 'react';
import ReactDOM from 'react-dom';
import DocumentCard from './DocumentCard';
import createAbsoluteGrid from 'react-absolute-grid';
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
  componentDidMount() {

    let sampleItems = fakeData;
    let render;
  
    //Change the item's sort order
    var onMove = function(source, target) {
      if(target && source){
        source = _.find(sampleItems, {key: parseInt(source, 10)});
        target = _.find(sampleItems, {key: parseInt(target, 10)});
        console.log(source,target);
        const targetSort = target.sort;
    
        //CAREFUL, For maximum performance we must maintain the array's order, but change sort
        sampleItems = sampleItems.map(function(item){
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
        });
        //Perf.start();
        render();
        //Perf.stop();
        //Perf.printWasted();
      } else {
        console.log("missing target or source");
        return;
      }
    };
  
    var onMoveDebounced = _.debounce(onMove, 40);
  
    const AbsoluteGrid = createAbsoluteGrid(DocumentCard);
    render = function(){
      ReactDOM.render(<AbsoluteGrid items={sampleItems}
                                 onMove={onMoveDebounced}
                                 dragEnabled={true}
                                 responsive={true}
                                 verticalMargin={42}
                                 itemWidth={240}
                                 itemHeight={240}/>, document.getElementById('documents-grid'));
    };

    render();
  
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('documents-grid'))
  }

  render() {
    return (
      <div id="documents-grid"> 
      </div>
    )
  }
}

export default DocumentGrid;