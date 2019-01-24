import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const Card = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 11px;
  transition: transform 80ms, box-shadow 80ms;
  box-shadow:0px 0px 0px rgba(0,0,0,0);
  background:#ffffff;
  &:hover,&:active {
    &::after {
      content:"";
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      pointer-events:none;
      mix-blend-mode:multiply;
      background-color: rgba(0,0,0,.025);
      border-radius:11px;
    }
    &:active{
      transform:translateY(-4px);
      box-shadow:0px 8px 16px rgba(0,0,0,0.1);
    }
  }
`
const CardThumbnail = styled.div`
  position: relative;
  margin: 8px 8px 0 8px;
  height: calc(67% - 8px);
  display: block;
  overflow: hidden;
  background-color: #f3f3f3;
  border-radius: 8px 8px 0 0;
  &::after {
    content:"";
    display: block;
    position: absolute;
    bottom: 0;
    left: 24px;
    right: 24px;
    height: calc(100% - 24px);
    pointer-events:none;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 67%,rgba(0,0,0,0.05) 100%);
  }
`
const CardThumbnailFavicon = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  background-color: #4688F1;
  left: 6px;
  top: 6px;
  border-radius: 2px;
  font-size: 8px;
  line-height:14px;
  text-align:center
  color:#ffffff;
`
const CardThumbnailImage = styled.div`
  width: calc(100% - 48px);
  margin: 24px 24px 0 24px;

  img {
    width:100%;
    top:0;
  }
`
const CardDescription = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  height: calc(33% - 8px);
  margin: 0 8px 8px 8px;
  background-color: #ffffff;
  border-radius: 0 0 8px 8px;
`
const CardDescriptionTitle = styled.div`
  flex: 1;
  padding: 8px 8px 8px 16px;
  text-align:left;
`
const CardDescriptionContext = styled.div`
  width: 20px;
  height: 20px;
`

class DocumentCard extends React.Component {

  imageUrl = (metadata) => {
    // https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
    var r = new RegExp('^(?:[a-z]+:)?//', 'i');
    if(r.test(metadata.image)) {
      return metadata.image;
    } else {
      if (metadata.image.startsWith('/')) {
        var el = document.createElement('a');
        el.href = metadata.url;
        return el.origin + metadata.image;
      } else {
        return metadata.url + metadata.image;
      }
    }
  }

  render() {
    return (
      <Card>
        <CardThumbnail>
          <CardThumbnailFavicon><Icon type="align-left"/></CardThumbnailFavicon>
          <CardThumbnailImage><img src={this.imageUrl(this.props.item.metadata)} alt={this.props.item.metadata.description} /></CardThumbnailImage>
        </CardThumbnail>
        <CardDescription>
          <CardDescriptionTitle>
            <h3>{this.props.item.metadata.title}</h3>
            <p>{this.props.item.url}</p>
          </CardDescriptionTitle>
          <CardDescriptionContext><Icon type="ellipsis"/></CardDescriptionContext>
        </CardDescription>
      </Card>
    )
  }
}

export default DocumentCard;