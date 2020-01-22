import React, { useState, useEffect,useRef } from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {Container, Modal, Form, Col, InputGroup, Button, Alert} from 'react-bootstrap'
import  GenericTable from "./GenericTable.js"
import Header from "./Header.js"
import {serviceConfig} from '../appSettings.js'

function PatientClinicList() {

    const [data, setData] = useState([]);
    const [types, setTypes] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [alertSuccesShow, setAlertSuccessShow] = useState(false);
    const [alertFailureShow, setAlertFailureShow] = useState(false);

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState({});

    const dateRef = useRef(null);
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Clinics list',
            columns: [
              {
                Header: 'Name',
                accessor: 'name',
              },
              {
                Header: 'Description',
                accessor: 'description',
              },
            ],
          },
        ],
        []
    )      

    let location = useLocation()
    let history = useHistory()

    useEffect(() => {
        if(location.pathname === '/scheduleClinics'){
            fetchTypes();      
            setModalShow(true);
        }
    }, [location])

    function fetchTypes(){
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
        };


        fetch(`${serviceConfig.baseURL}/clinic/getAllCheckupTypes`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            setTypes(data);
            setType(data[0]);
        })
        .catch(response => {
            console.log(response)
        })
    }

    function handleSelect(e){
        setType(e.target.value);

        let selected = types.find(type => type.name === e.target.value);

        setType(selected);
    }

    function renderSelect(){
        return(
            <InputGroup>              
                <InputGroup.Prepend>
                    <InputGroup.Text>Type</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                as="select"
                onChange={handleSelect}
                value={type}
                >          
                {types.map((type, i) => 
                        <option key={i} value={type.name}>
                            {type.name}
                        </option>
                    )}         
                </Form.Control>    
            </InputGroup>
        ) 
    }

    useEffect(() => {
        if(dateRef.current !== null){
            dateRef.current.min = new Date().toISOString().split("T")[0];
            dateRef.current.max = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0];
        }
    }, [dateRef.current])

    const fetchData = React.useCallback(() => {
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
        };


        fetch(`${serviceConfig.baseURL}/clinic/all`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            setData(data);
        })
        .catch(response => {
            console.log(response)
        })

    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        
        let filter = {
            checkupDate : date,
            checkupTime: time,
            checkupType: type.name,
            clinicId: ''
        }

        fetchFilterInfo(filter);

        setModalShow(false);
    }

    function fetchFilterInfo(filter){
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
            body: JSON.stringify(filter)
        };

        fetch(`${serviceConfig.baseURL}/clinic/getAvailableClinics`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            setData(data);
            if(data.length !== 0){
                setAlertSuccessShow(true);
            }
            else{
                setAlertFailureShow(true);
            }
        })
        .catch(response => {
            console.log(response)
        })
        
    }

    function handleClick(rowProps){
        console.log(rowProps);
        if(alertSuccesShow){
            history.push(`scheduleDoctors?id=${rowProps.id}&date=${date}&time=${time}&type=${type.name}&clinic=${rowProps.name}&duration=${type.duration}&price=${type.price}`);
        } else {
            history.push(`clinicInfo/${rowProps.id}`);  
        }
    }

    return(
        <div>
            <Header/>
            <Container>
                {alertSuccesShow &&
                      <Alert variant="success" onClose={() => setAlertSuccessShow(false)} dismissible>
                      <Alert.Heading>Well done!</Alert.Heading>
                      <p>
                        Now select clinic of your choice in the list below to continue..
                      </p>
                    </Alert>
                }

                {alertFailureShow &&
                      <Alert variant="danger" onClose={() => setAlertFailureShow(false)} dismissible>
                      <Alert.Heading>Try again!</Alert.Heading>
                      <p>
                        Unfortunately there are no available clinics for the given values. Please try again with different values...
                      </p>
                    </Alert>
                }

                <GenericTable columns={columns} data={data} fetchData={fetchData} handleClick={handleClick}/>
            </Container>

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <h3>Schedule an appointment</h3>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <InputGroup>              
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Date</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        required
                                        ref={dateRef}
                                        value={date}
                                        type="date"
                                        onChange = {e => setDate(e.target.value)}
                                />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <InputGroup>              
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Time</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control                                        
                                        required                                        
                                        value={time}
                                        type="time"                                        
                                        step="900"
                                        min="07:00"
                                        max="20:00"
                                        onChange = {e => setTime(e.target.value)}
                                />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                {renderSelect()}
                            </Form.Group>
                        </Form.Row>
                        <hr/>
                        <Form.Row style={{display:"flex", justifyContent:"space-around"}}>
                            <div>
                                <span>Duration:</span>
                                <i>&nbsp;{type.duration}</i>
                            </div>
                            <div>
                                <span>Price:</span>
                                <i>&nbsp;{type.price}</i>
                            </div>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setModalShow(false)}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit">
                            Next
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
    
} export default PatientClinicList;