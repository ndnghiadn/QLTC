import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import './style.css'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addItem } from '../redux/itemSlice'

AddForm.propTypes = {
    onSaveClick: PropTypes.func,
};

AddForm.defaultProps = {
    onSaveClick: null,
};

function getMonthValueString(month) {
    switch (month) {
        case 1: return "Jan";
        case 2: return "Feb";
        case 3: return "Mar";
        case 4: return "Apr";
        case 5: return "May";
        case 6: return "Jun";
        case 7: return "Jul";
        case 8: return "Aug";
        case 9: return "Sep";
        case 10: return "Oct";
        case 11: return "Nov";
        case 12: return "Dec";        
    }
}

function getTrueDate(date) {
    if (date >= 1 && date < 10) {
        return "0"+date;
    } else return date;
}

function getCurrentTime() {
    var today = new Date();
    var date = getMonthValueString((today.getMonth() + 1)) + ' ' + getTrueDate(today.getDate()) + ' ' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return (date+'  --at '+time).toString();
}

//random id

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

function generateID() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + '-' + s4() + s4() + '-' + s4();
  }


//main component

function AddForm(props) {
    const dispatch = useDispatch();
    const [content, setContent] = useState();
    const [status, setStatus] = useState("null");
    const [amount, setAmount] = useState();
    const { onSaveClick } = props;

    function handleAddItem() {
        if (!content || status === "null" || !amount) {
            alert("Make sure that you had completed all fields, try again!");
            return;
        };
        if (content.length > 13) {
            alert("Content.length <= 13");
            return;
        }
        if (amount <= 10 || amount >= 1000) {
            alert("10 < Amount < 1000");
            return;
        }
        const newItem = {
            content,
            status: status === "true" ? true : false,
            amount,
            time: getCurrentTime(),
            id: generateID(),
        }
        const action = addItem(newItem);
        dispatch(action);
        onSaveClick();
    }

    return (
        <div>
            <Form onSubmit={(e) => e.preventDefault()}>
                <FormGroup>
                    <Label className="AddForm--Label" for="exampleEmail">Content</Label>
                    <Input
                        type="text"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    /><br />
                </FormGroup>
                <FormGroup>
                    <Label className="AddForm--Label" for="exampleSelect">Status</Label>
                    <Input 
                        type="select" 
                        name="select" 
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                            <option value="null">Thu/Chi</option>
                            <option value="true">Thu</option>
                            <option value="false">Chi</option>
                    </Input><br />
                </FormGroup>
                <FormGroup>
                    <Label className="AddForm--Label" for="exampleNumber">Amount (K VND)</Label>
                    <Input
                        type="number"
                        name="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    /><br />
                </FormGroup>
                <Button onClick={handleAddItem} className="mt-15" color="primary"><FontAwesomeIcon icon="save"/> save</Button>
            </Form>
        </div>
    );
}

export default AddForm;