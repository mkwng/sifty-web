import React from 'react';
import { Form, Input, Button, Drawer, Icon } from 'antd';

class NewCollection extends React.Component {
  render() {
    return(
      <div>
        <Button type="primary" onClick={this.props.showDrawer}>
          <Icon type="plus" /> New collection
        </Button>

        <Drawer
          title="Create a collection"
          width={480}
          onClose={this.props.closeDrawer}
          visible={this.props.drawer}
          style={{
            overflow: 'auto',
            height: 'calc(100% - 108px)',
            paddingBottom: '108px',
          }}
        >
          <div>
            
            <Form.Item>
              <Input
                prefix={<Icon 
                  type="book" 
                  style={{ color: 'rgba(0,0,0,.25)' }} />
                } 
                placeholder="Name of collection"
                label="Name of Collection"
                name="collectionName"
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input.TextArea
                prefix={<Icon 
                  type="align-left" 
                  style={{ color: 'rgba(0,0,0,.25)' }} />
                } 
                placeholder="Description"
                label="About the Collection"
                name="collectionDetails"
                onChange={this.handleChange}
                autosize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.closeDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default NewCollection