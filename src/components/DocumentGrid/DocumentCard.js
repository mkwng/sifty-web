import React from 'react';

class DocumentCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-thumbnail">
          <div className="card-thumbnail-favicon">Icon</div>
          <div className="card-thumbnail-image"><img src={this.props.item.thumbnailUrl} alt={this.props.item.description} /></div>
        </div>
        <div className="card-description">
          <div className="card-description-title">{this.props.item.title}</div>
          <div className="card-description-contextMenu">Menu</div>
        </div>
      </div>
    )
  }
}

export default DocumentCard;