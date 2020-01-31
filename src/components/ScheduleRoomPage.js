import React, {Component, useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom'
import {Container, Modal, Form, Col, InputGroup, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import GenericTable from "./GenericTable.js"
import Header from "./Header.js"
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'

function ScheduleRoomPage() {

    const [data, setData] = React.useState([]);
    const [dataDoc, setDataDoc] = React.useState([]);

    const [selectedCheckup, setSelectedCheckup] = React.useState([]);
    
    const [modalShow, setModalShow] = useState(false);
    const [modalShowNoRooms, setModalShowNoRooms] = useState(false);

    const dateRef = useRef(null);
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Pending checkups list',
            columns: [
              {
                Header: 'Id',
                accessor: 'id',
              },
              {
                Header: 'Preferred date',
                accessor: 'date',
              },
              {
                Header: 'Doctor',
                accessor: 'doctor_name',
              },
            ],
          },
        ],
        []
    )  
    
    function toDate(dateArray){
        return `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`;
    }

    function reformat(array){
        array.forEach(element => {
            element.date = toDate(element.date)
        });

        return array;
    }

    let location = useLocation()

    function handleApprove(){
        const token = JSON.parse(localStorage.getItem('token'));
        
        console.log(_selectedAvailableRoom);

        const approveRequest = {
            id : selectedCheckup,
            room_id : _selectedAvailableRoom.current.value,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`,
            },
            body: JSON.stringify(approveRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinic/approveCheckupRequest`, requestOptions)
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
    }

    function handleDeny(){
        const token = JSON.parse(localStorage.getItem('token'));

        const denyRequest = {
            id : selectedCheckup,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`,
            },
            body: JSON.stringify(denyRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinic/denyCheckupRequest`, requestOptions)
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
    }


    const fetchData = React.useCallback(() => {
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`},
        }

        fetch(`${serviceConfig.baseURL}/clinic/getPendingCheckups`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json(); 
        })
        .then((data) =>  {
            setData(reformat(data));
        })
        .catch(response => {
            console.log(response);
        })        
    }, []);


    function handleClick(rowProps){
        setSelectedCheckup(rowProps.id);

        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`},
        }

        fetch(`${serviceConfig.baseURL}/clinic/getAvailableRooms/${rowProps.id}`, requestOptions)
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

        fetch(`${serviceConfig.baseURL}/clinic/getDocForCheckup/${rowProps.id}`, requestOptions)
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

        if(data.length){
            setModalShow(true);
        }else{
            setModalShowNoRooms(true);
        }

        
    }


    const _selectedAvailableRoom = useRef(null);

    return(
        <div>
            <Header/>
            <Container>
                <GenericTable columns={columns} data={data} fetchData={fetchData} handleClick={handleClick}/>
            </Container>

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <h3>Choose a room</h3>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Control as="select" ref={_selectedAvailableRoom}>
                            {data.map((e, key) => {
                                return <option key={key} value={e.id}>[ID: {e.id}] {e.name}</option>;
                            })}
                        </Form.Control>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                            </Form.Group>
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
            <Modal show={modalShowNoRooms} onHide={() => setModalShowNoRooms(false)}>
                <Modal.Header closeButton>
                    <h3>Choose a different time/doctor</h3>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Label>There were no available rooms for desired time, please choose a different time or a different doctor.</Form.Label>
                        <Form.Label>Select a doctor (dont change if you want to have the same doctor)</Form.Label>
                        {/* <Form.Control as="select" ref={_selectedDoctor}>
                            {data.map((e, key) => {
                                return <option key={key} value={e.doctor_id}>[ID: {e.doctor_id}] {e.doctor_name}</option>;
                            })}
                        </Form.Control> */}
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                            </Form.Group>
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
export default ScheduleRoomPage; 