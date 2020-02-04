import React, {Component, useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom'
import {Container, Modal, Form, Col, InputGroup, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import GenericTable from "./GenericTable.js"
import Header from "./Header.js"
import AvailableHours from "./AvailableHours.js"
import 'react-big-calendar/lib/css/react-big-calendar.css'

function ApproveAbsenceRequestPage() {

    const [data, setData] = React.useState([]);
    const [reason, setReason] = React.useState([]);
    const [approve, setApprove] = React.useState(false);
    

    const [selectedAbsence, setSelctedAbsence] = React.useState([]);
    
    const [modalShow, setModalShow] = useState(false);
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Pending absence request list',
            columns: [
              {
                Header: 'Person ID',
                accessor: 'person_id',
              },
              {
                Header: 'Person role',
                accessor: 'person_role',
              },
              {
                Header: 'Person',
                accessor: 'person_name',
              },
              {
                Header: 'Start date',
                accessor: 'startDate',
              },
              {
                Header: 'End date',
                accessor: 'endDate',
              },
              {
                Header: 'Type',
                accessor: 'type',
              },
            ],
          },
        ],
        []
    )  
    
   
    function handleDeny(){
        setApprove(false);
        handleSubmit();
    }

    function handleApprove(){
        setApprove(true);
        handleSubmit();
    }

    function handleSubmit(){
        const token = JSON.parse(localStorage.getItem('token'));

        const denyRequest = {
            id : selectedAbsence.id,
            approved : approve,
            reason : reason
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`,
            },
            body: JSON.stringify(denyRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinic/approveAbsenceRequest`, requestOptions)
        .then(response => {
            if(!response.ok){
                
                return Promise.reject(response);
            }
            return response.statusText;
        })
        .then(() => {
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
        })
        setModalShow(false);
        window.location.reload();
    }


    const fetchData = React.useCallback(() => {
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`},
        }

        fetch(`${serviceConfig.baseURL}/clinic/getPendingAbsenceRequests`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json(); 
        })
        .then((data) =>  {
            setData(data);
        })
        .catch(response => {
            console.log(response);
        })        
    }, []);


    function handleClick(rowProps){
        const token = JSON.parse(localStorage.getItem('token'));
        setSelctedAbsence(rowProps);

        setModalShow(true);
    }

    useEffect(()=>{

    },[modalShow])


    return(
        <div>
            <Header/>
            <Container>
                <GenericTable columns={columns} data={data} fetchData={fetchData} handleClick={handleClick}/>
            </Container>

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <h3>Approve/Deny request</h3>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Row>
                            <Form.Label>Person: {selectedAbsence.person_name}</Form.Label>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>Period: [{selectedAbsence.startDate}] - [{selectedAbsence.endDate}]</Form.Label>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    id="_reason"
                                    value={reason}
                                    type="text"
                                    placeholder="Reason"
                                    onChange={e => setReason(e.target.value)}
                                />
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleApprove}>
                            Approve
                        </Button>
                        <Button variant="warning" onClick={handleDeny}>
                            Deny
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
    
}
export default ApproveAbsenceRequestPage; 