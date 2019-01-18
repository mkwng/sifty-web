import React from 'react';
import { Row, Col } from 'antd';

function TopMenu(props) {
  console.log(props);
  let menu = props.isVisible ? (
    <Row type="flex" justify="start">
      <Col xs={24} sm={6}>My collections</Col>
      <Col xs={24} sm={6}>Shared with me</Col>
      <Col xs={24} sm={6}>Notifications</Col>
    </Row>
  ) : (<Row />)

  return menu;
}

export default TopMenu;