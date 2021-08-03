import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import '../App.css'
import { Table, Button } from 'reactstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


DataTable.propTypes = {
  itemShowList: PropTypes.array,
};

DataTable.defaultProps = {
  itemShowList: [],
};

function DataTable(props) {
  const { itemShowList } = props;

  const itemElements = itemShowList.map((item, idx) => (
    <tr key="{item.id}">
          <th scope="row">{idx + 1}</th>
          <td><p>{item.content}</p></td>
          <td><Button color={item.status === true ? "success" : "danger"} disabled size="sm">{item.status === true ? "+" : "-"}{item.amount}K</Button></td>
          <td><p className="styleTimeFont">{ (item.time).substr(17) }</p></td>
    </tr>
  ));
  

  return (
    <div>
      <Table dark>
      <thead>
          <tr>
            <th>#</th>
            <th className="styleTitleFont">Content</th>
            <th className="styleTitleFont">Amount</th>
            <th className="styleTitleFont">Time</th>
          </tr>
      </thead>
      <tbody>
        { itemElements }
      </tbody>
    </Table>
    </div>
  );
}

export default DataTable;