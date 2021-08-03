import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './App.css';
import './components/FontAwesomeIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col, Button, UncontrolledPopover, PopoverHeader, PopoverBody, Modal, ModalHeader, ModalBody } from 'reactstrap'

import DataTable from './components/DataTable';
import DataTableNull from './components/DataTableNull';
import Header from './components/Header';
import AddForm from './components/AddForm';
import DatePicker from 'react-date-picker';

function App() {
  const [dateValue, onChange] = useState(new Date());
  const itemList = useSelector(state => state.items);
  const [itemShowList, setItemShowList] = useState([]);
  const [sumByDateValue, setSumByDate] = useState(0);
  const [sumByMonthValue, setSumByMonth] = useState(0);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (dateValue == null) {
      setItemShowList([]);
      //calculate budget
      let arrTemp = itemList.map(item => {
        if (item.status) {
          return parseInt(item.amount);
        } else {
          return -(item.amount);
        }
      });
      let sumTemp = arrTemp.reduce((a, b) => {
        return a + b;
      }, 0);
      setSumByDate(sumTemp);
      setSumByMonth(0);

    } else {
      let currentDate = ((dateValue).toString()).substr(4, 11);
      let showItemList = itemList.filter(item => {
        if ( ((item.time).substr(0, 11)).localeCompare(currentDate) === 0 ) return true;
      });
      setItemShowList(showItemList);

      //calculate budget
      let arrTemp = showItemList.map(item => {
        if (item.status) {
          return parseInt(item.amount);
        } else {
          return -(item.amount);
        }
      });
      let sumTemp = arrTemp.reduce((a, b) => {
        return a + b;
      }, 0);
      setSumByDate(sumTemp);

      arrTemp = itemList.filter(item => {
        if ( ((item.time).substr(0, 3)).localeCompare((currentDate).substr(0, 3)) === 0 
              && ((item.time).substr(7, 4)).localeCompare((currentDate).substr(7, 4)) === 0 ) {
          return true;
        }
      });
      let arrTemp2 = arrTemp.map(item => {
        if (item.status) {
          return parseInt(item.amount);
        } else {
          return -(item.amount);
        }
      });
      sumTemp = arrTemp2.reduce((a, b) => {
        return a + b;
      }, 0);
      setSumByMonth(sumTemp);

    }
  }, [dateValue]);

  useEffect(() => {
    if (dateValue == null) {
      setItemShowList([]);
      //calculate budget
      let arrTemp = itemList.map(item => {
        if (item.status) {
          return parseInt(item.amount);
        } else {
          return -(item.amount);
        }
      });
      let sumTemp = arrTemp.reduce((a, b) => {
        return a + b;
      }, 0);
      setSumByDate(sumTemp);
      setSumByMonth(0);

    } else {
      let currentDate = ((dateValue).toString()).substr(4, 11);
      let showItemList = itemList.filter(item => {
        if ( ((item.time).substr(0, 11)).localeCompare(currentDate) === 0 ) return true;
      });
      setItemShowList(showItemList);

      //calculate budget
      let arrTemp = showItemList.map(item => {
        if (item.status) {
          return parseInt(item.amount);
        } else {
          return -(item.amount);
        }
      });
      let sumTemp = arrTemp.reduce((a, b) => {
        return a + b;
      }, 0);
      setSumByDate(sumTemp);

      arrTemp = itemList.filter(item => {
        if ( ((item.time).substr(0, 3)).localeCompare((currentDate).substr(0, 3)) === 0 
              && ((item.time).substr(7, 4)).localeCompare((currentDate).substr(7, 4)) === 0 ) {
          return true;
        }
      });
      let arrTemp2 = arrTemp.map(item => {
        if (item.status) {
          return parseInt(item.amount);
        } else {
          return -(item.amount);
        }
      });
      sumTemp = arrTemp2.reduce((a, b) => {
        return a + b;
      }, 0);
      setSumByMonth(sumTemp);

    }
    localStorage.setItem('items', JSON.stringify(itemList));
  }, [itemList]);

  function handleSaveClick() {
    toggle();
    onChange(new Date());
  }

  return (
    <div className="App">
      <Container className="mt-15">
        <Row xs="auto">
          <Col className="mt-2">
            <Header />
          </Col>
          <Col className="ml--15">
            <Button id="PopoverInfo" outline color="primary"><FontAwesomeIcon icon="info"/></Button>
            <UncontrolledPopover trigger="legacy" placement="right" target="PopoverInfo">
              <PopoverHeader><p className="styleHandFont">your budget</p></PopoverHeader>
              <PopoverBody>
                { dateValue === null ? (
                  <ul>
                  <li><p>on total</p><Button color={sumByDateValue >= 0 ? "success" : "danger"} disabled size="sm">{sumByDateValue}K</Button></li><br />
                </ul>
                ) : (
                  <ul>
                  <li><p>on today</p><Button color={sumByDateValue >= 0 ? "success" : "danger"} disabled size="sm">{sumByDateValue}K</Button></li><br />
                  <li><p>on this month</p><Button color={sumByMonthValue >= 0 ? "success" : "danger"} disabled size="sm">{sumByMonthValue}K</Button></li><br />
                </ul>
                ) }
              </PopoverBody>
            </UncontrolledPopover>
          </Col>
        </Row>
        <Row className="mt-70">
          <Col xs={12} >
            <Row className="mb-30">
              <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                <Button onClick={toggle} className="mb-30 mt-15 ml-15" color="primary"><FontAwesomeIcon icon="plus"/></Button>
                <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>AddForm</ModalHeader>
                <ModalBody>
                    <AddForm onSaveClick={handleSaveClick} />
                </ModalBody>
                </Modal>
              </Col>
              <Col>
                <DatePicker className="mb-30 mt-35"
                  onChange={onChange}
                  value={dateValue}
                />
              </Col>
              
            </Row>
            <Row>
              { dateValue === null ? (<DataTableNull />) : (<DataTable itemShowList={itemShowList} />) }
            </Row>
          </Col>
        </Row>
        <Row>

        </Row>
      </Container>
    </div>
  );
}

export default App;
