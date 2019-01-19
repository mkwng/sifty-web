import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const Card = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 11px;
  &:hover {
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
    left: 32px;
    right: 32px;
    height: calc(100% - 32px);
    pointer-events:none;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 67%,rgba(0,0,0,0.3) 100%);
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
  render() {
    return (
      <Card>
        <CardThumbnail>
          <CardThumbnailFavicon><Icon type="align-left"/></CardThumbnailFavicon>
          <CardThumbnailImage><img src={this.props.item.thumbnailUrl} alt={this.props.item.description} /></CardThumbnailImage>
        </CardThumbnail>
        <CardDescription>
          <CardDescriptionTitle>{this.props.item.title}</CardDescriptionTitle>
          <CardDescriptionContext><Icon type="ellipsis"/></CardDescriptionContext>
        </CardDescription>
      </Card>
    )
  }
}

export default DocumentCard;