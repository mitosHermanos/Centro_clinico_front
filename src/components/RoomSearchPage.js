import React, {Component, useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom'
import {Container, Modal, Form, Col, InputGroup, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import GenericTable from "./GenericTable.js"
import Header from "./Header.js"
import {momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Calendar from "./Calendar.js"

function RoomSearchPage() {

    const [data, setData] = React.useState([]);
    
    const [modalShow, setModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState([]);
    const apptimes = React.useState([]);

    const dateRef = useRef(null);
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Rooms list',
            columns: [
              {
                Header: 'Id',
                accessor: 'id',
              },
              {
                Header: 'Name',
                accessor: 'name',
              },
            ],
          },
        ],
        []
    )  
    
    let location = useLocation()

    useEffect(() => {
        if(location.pathname === '/seeRoomSchedule'){
            setModalShow(true);

            //load appointment types
        }
    }, [])

    useEffect(() => {
        if(dateRef.current !== null){
            dateRef.current.min = new Date().toISOString().split("T")[0];
            dateRef.current.max = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0];
        }
    }, [dateRef.current])

    const handleSubmit = (e) => {
        e.preventDefault();

        //handle 
        //get filtered clinics
        setModalShow(false);
    }

    const fetchData = React.useCallback(() => {
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`},
        }

        fetch(`${serviceConfig.baseURL}/clinic/searchRooms`, requestOptions)
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

    function setSelected(day){
        setSelectedDate(day.toString());
        console.log(day.toString());
    }

    return(
        <div>
            <Header/>
            <Container>
                <GenericTable columns={columns} data={data} fetchData={fetchData}/>
            </Container>

            
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <h3>Room schedule</h3>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Calendar selectedP={setSelected}/>
                        <Form.Row>
                            <p>{selectedDate}</p>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => setModalShow(false)}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
    
}
export default RoomSearchPage; 