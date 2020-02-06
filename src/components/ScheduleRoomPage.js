import React, {Component, useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom'
import {Container, Modal, Form, Col, InputGroup, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import GenericTable from "./GenericTable.js"
import Header from "./Header.js"
import AvailableHours from "./AvailableHours.js"
import 'react-big-calendar/lib/css/react-big-calendar.css'

function ScheduleRoomPage() {

    const [data, setData] = React.useState([]);
    const [dataDoc, setDataDoc] = React.useState([]);
    const [dataAvailableRooms, setDataAvailableRooms] = React.useState([]);
    const [dataSchedule, setDataSchedule] = React.useState([]);

    const [checkupID, setCheckupID] = React.useState([]);
    const [currDate, setCurrDate] = React.useState([]);
    const [shift, setShift] = React.useState();
    const [time, setTime] = React.useState();

    const [currSelDate, setCurrSelDate] = React.useState();
    const [currDoctor, setCurrDoctor] = React.useState();
    const [currDoctorName, setCurrDoctorName] = React.useState();

    const [newDoc, setNewDoc] = React.useState(false);
    const [canSched, setCanSched] = React.useState(false);
    const [canCal, setCanCal] = React.useState(true);
    const [fetchedData, setFetchedData] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    
    const [isChecked, setIsChecked] = React.useState(false);

    const [selectedCheckup, setSelectedCheckup] = React.useState([]);
    
    const [modalShow, setModalShow] = useState(false);
    const [modalShowNoRooms, setModalShowNoRooms] = useState(false);

    
    const _selectedAvailableRoom = useRef(null);
    const _selectedDoctor = useRef(null);
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

    function handleUpdate(){
        const token = JSON.parse(localStorage.getItem('token'));


        const updateRequest = {
            id : selectedCheckup.id,
            doctor_id: currDoctor,
            duration : selectedCheckup.duration,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`,
            },
            body: JSON.stringify(updateRequest)
        }

        fetch(`${serviceConfig.baseURL}/clinic/updateCheckupRequest/${currSelDate}`, requestOptions)
        .then(response => {
            if(!response.ok){
                
                return Promise.reject(response);
            }
            return response.statusText;
        })
        .then(() => {
            setModalShow(false);
            setModalShowNoRooms(false);
            window.location.reload();
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
        })

    }

    function handleApprove(){
        const token = JSON.parse(localStorage.getItem('token'));

        console.log(selectedCheckup.id);

        const approveRequest = {
            id : checkupID,
            room_id : _selectedAvailableRoom.current.value,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`,
            },
            body: JSON.stringify(approveRequest)
        }

        fetch(`${serviceConfig.baseURL}/clinic/approveCheckupRequest`, requestOptions)
        .then(response => {
            if(!response.ok){
                
                return Promise.reject(response);
            }
            return response.statusText;
        })
        .then(() => {
            setModalShow(false);
            setModalShowNoRooms(false);
            window.location.reload();
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
        })
    }

    function handleDeny(){
        const token = JSON.parse(localStorage.getItem('token'));

        const denyRequest = {
            id : checkupID,
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
            setModalShow(false);
            setModalShowNoRooms(false);
            window.location.reload();
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
        const token = JSON.parse(localStorage.getItem('token'));
        setSelectedCheckup(rowProps);
        setCurrDate(rowProps.date);
        setCurrDoctor(rowProps.doctor_id);
        setCurrDoctorName(rowProps.doctor_name);
        setCheckupID(rowProps.id);

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
            setDataAvailableRooms(data);
            if(data.length)
                setFetchedData(true);
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
            setDataDoc(data);
            mapData(data);
            handleShift(data, rowProps.doctor_id);
        })
        .catch(response => {
            console.log(response);
        })
    }

    useEffect(() => {
        if(fetchedData){
            
            if(dataAvailableRooms.length){
                setModalShow(false);
                setModalShowNoRooms(false);
                setModalShow(true);
            }else{
                console.log(dataSchedule);
                setModalShowNoRooms(false);
                setModalShow(false);
                setModalShowNoRooms(true);
            }
            setFetchedData(false);
        }
    }, [fetchedData])


    function handleSelectSlot(info){
        
        
        if(canCal){
            let timeSplit = info.start.toTimeString().split(' ');
            let time = timeSplit[0];
            let dater = new Date(info.start);
            console.log(dater);
            setCurrSelDate(dater);
            setTime(time.substring(0, time.length-3));
        }
    }

    function handleViewChange(info){
        console.log(selectedCheckup);
        if(info === 'month')
            setCanCal(false);
        else
            setCanCal(true)
    }

    function handleShift(info, prop){
        info.forEach(el => {
            if(prop == el.id){
                setCurrDoctor(el.id);
                setCurrDoctorName(el.ime+" "+el.prezime);
                setShift(el.shift);
                setDataSchedule([...el.checkups,...el.absences]);
                console.log(el);
                setFetchedData(true);
            }
        })
    }

    useEffect(() => {
        if(_selectedDoctor.current != null){
            handleShift(dataDoc, _selectedDoctor.current.value);
            console.log("zoga");
        }
    },[newDoc])

    useEffect(() => {
        if(!isChecked){
            setCurrDoctor(selectedCheckup.doctor_id);
            setCurrDoctorName(selectedCheckup.doctor_name);
        }
    }, [isChecked])
    

    function mapData(data){
        data.forEach((e, i) => { 
            e.checkups.forEach((sched,i) =>{
                sched.title = "checkup";
                sched.start = new Date(sched.start[0],sched.start[1]-1,sched.start[2],sched.start[3],sched.start[4], 0);
                sched.end = new Date(sched.end[0],sched.end[1]-1,sched.end[2],sched.end[3],sched.end[4], 0);
            })  
            e.absences.forEach((sched,i) =>{
                sched.title = "absence";
                sched.start = new Date(sched.start[0],sched.start[1],sched.start[2],sched.start[3],sched.start[4], 0);
                sched.end = new Date(sched.end[0],sched.end[1],sched.end[2],sched.end[3],sched.end[4], 0);
            })        
        })
        return data;
    }



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
                            {dataAvailableRooms.map((e, key) => {
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
                        <Form.Label>Select a doctor (check if u want to change)</Form.Label>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Check 
                                    type="checkbox"
                                    label="Change doctor"
                                    checked={isChecked}
                                    onChange={e => setIsChecked(e.target.checked)}/>
                            </Form.Group>
                            <Form.Group as={Col} md="8">
                                <Form.Control as="select" ref={_selectedDoctor} disabled={!isChecked} onChange={e => setNewDoc(!newDoc)}>
                                    {dataDoc.map((e, key) => {
                                        return <option key={e.id} value={e.id}>[ID: {e.id}] {e.ime} {e.prezime}</option>;
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Selected doctor: [ID: {currDoctor}] {currDoctorName} </Form.Label><br/>
                                <Form.Label>Selected time: {time}</Form.Label><br/>
                                <Form.Label>Checkup duration: {selectedCheckup.duration} min</Form.Label>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <AvailableHours
                                    events={dataSchedule}
                                    shift={shift}
                                    passedDate={currDate}
                                    handleSelectSlot={handleSelectSlot}
                                    handleViewChange={handleViewChange}/>
                            </Form.Group>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleUpdate}>
                            Change time/doc
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