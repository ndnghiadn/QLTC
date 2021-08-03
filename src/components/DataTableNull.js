import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import '../App.css'
import { Table, Button } from 'reactstrap'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux';

import slugify from 'react-slugify';

import { removeItem } from '../redux/itemSlice';

function DataTableNull(props) {
  const itemList = useSelector(state => state.items);
  const dispatch = useDispatch();

  function handleRemoveClick(id) {
    const action = removeItem(id);
    dispatch(action);
  }

  const dateList = [...(new Set(itemList.map((item) => ((item.time).substr(0, 11)))))];

  const tabContent = dateList.map((date) => {
    let count = 0;
    const itemsByDate = [];
    itemList.map((item) => {
      if ((item.time).substr(0,11) === date) {
        ++count;
        itemsByDate.push(item);
      }
    });

    return (
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link className="text-center" eventKey={slugify(date)}>{date} <span className="count">({count})</span></Nav.Link>
          </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
          <Tab.Pane eventKey={slugify(date)}>
            <Table hover>
              <thead>
                  <tr key={slugify(date)}>
                    <th className="styleTitleFont">Content</th>
                    <th className="styleTitleFont">Amount</th>
                    <th>{'\u00A0'}</th>
                  </tr>
              </thead>
              <tbody>
                { 
                  itemsByDate.map((item, idx) => (
                        <tr key="{item.id}">
                          <td>{item.content}</td>
                          <td><Button color={item.status === true ? "success" : "danger"} disabled size="sm">{item.status === true ? "+" : "-"}{item.amount}K</Button></td>
                          <td>
                            <Button className="ml-10" onClick={() => handleRemoveClick(item.id)} color="warning" size="sm"><FontAwesomeIcon icon="trash" /></Button>
                          </td>
                        </tr>
                      )
                  )
                }
              </tbody>
            </Table>
          </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    )
  })
  
  return (
    <div>
      <Tab.Container>
          { tabContent }
      </Tab.Container>
    </div>
  );
}

export default DataTableNull;