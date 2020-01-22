import React, {Component, useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom'
import {Container, Modal, Form, Col, InputGroup, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import GenericTable from "./GenericTable.js"
import Header from "./Header.js"
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'

function RoomSearchPage() {

    const [data, setData] = React.useState([]);
    const [roomScheduleData, setRoomScheduleData] = React.useState([]);
    const [temp, setTemp] = React.useState([]);
    const [rowPropsFromChild, setRowPropsFromChild] = React.useState([]);
    
    const [modalShow, setModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState([]);

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
        if(dateRef.current !== null){
            dateRef.current.min = new Date().toISOString().split("T")[0];
            dateRef.current.max = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0];
        }
    }, [dateRef.current])

    useEffect(() => {
            roomScheduleData.map((sched,i)=>{
                sched.title = "checkup "+sched.id;
                sched.start = new Date(sched.start[0],sched.start[1],sched.start[2],sched.start[3],sched.start[4], 0);
                sched.end = new Date(sched.end[0],sched.end[1],sched.end[2],sched.end[3],sched.end[4], 0);
            })
    }, [roomScheduleData])

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
        setSelectedDate(day);
        console.log(day.date());
        console.log(day.month());
        console.log(day.year());
    }

    function handleClick(rowProps){
        
        console.log(rowPropsFromChild);
        setRowPropsFromChild(rowProps.id);

        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`},
        }

        fetch(`${serviceConfig.baseURL}/clinic/getRoomSchedule/${rowProps.id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json(); 
        })
        .then((data) =>  {
            setRoomScheduleData(data);
        })
        .catch(response => {
            console.log(response);
        })
        setModalShow(true);
    }


    return(
        <div>
            <Header/>
            <Container>
                <GenericTable columns={columns} data={data} fetchData={fetchData} handleClick={handleClick}/>
            </Container>

            
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <h3>Room schedule</h3>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div style={{minHeight: 500}}>
                            <Calendar
                                events={roomScheduleData}
                                startAccessor="start"
                                endAccessor="end"
                                defaultDate={moment().toDate()}
                                localizer={momentLocalizer(moment)}
                                style={{height:500}}
                            />
                        </div>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                            </Form.Group>
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