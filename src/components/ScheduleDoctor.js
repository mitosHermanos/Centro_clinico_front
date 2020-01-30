import  GenericTable from "./GenericTable.js";
import React, {useState, useRef, useEffect} from 'react';
import {Container, Button, Modal, Form, InputGroup, Alert, Card, Accordion} from 'react-bootstrap';
import Header from './Header.js';
import { useRouteMatch } from "react-router-dom";
import {serviceConfig} from '../appSettings.js';
import AvailableHours from "./AvailableHours.js";

function ScheduleDoctor(){
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [date, setDate] = useState('');
    const [type, setType] = useState({});
    const [types, setTypes] = useState([]);
    const [shift, setShift] = useState(null);
    const [busy, setBusy] = useState([]);


    const [alertSuccesShow, setAlertSuccessShow] = useState(false);
    const [alertFailureShow, setAlertFailureShow] = useState(false);

    const [filterSubmitted, setFilterSubmitted] = useState(false);

    let dateRef = useRef(null);

    const columns = React.useMemo(
        () => [
          {
            Header: 'Doctors list',
            columns: [
              {
                Header: 'Name',
                accessor: 'name',
              },
              {
                Header: 'Surname',
                accessor: 'surname',
              },
              {
                Header: 'Average rating',
                accessor: 'avgrating',
              },
            ],
          },
        ],
        []
    )

    let match = useRouteMatch('/doctorsInClinic/:id');
    
    const fetchData = React.useCallback(() => {
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`
              }
        }        

        fetch(`${serviceConfig.baseURL}/clinic/searchDoctors/${match.params.id}`, requestOptions)
        .then(response => {
          if (!response.ok) {
            return Promise.reject(response);
          }
          return response.json(); 
        })
        .then((data) =>  {
            setData(data)
        })
        .catch(response => {
            console.log(response);
        })
    }, []);	

    function renderSelect(){
        return(
            <InputGroup>              
                <InputGroup.Prepend>
                    <InputGroup.Text>Type</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                as="select"
                onChange={handleSelect}
                value={type.name}
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
        fetchTypes();
    }, [])

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

    useEffect(() => {
        if(dateRef.current !== null){
            dateRef.current.min = new Date().toISOString().split("T")[0];
            dateRef.current.max = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0];
        }
    }, [dateRef.current])

    function handleSelect(e){        
        let selected = types.find(element => element.name === e.target.value);
        setType(selected);
    }

    useEffect(() => {

        setAlertSuccessShow(filterSubmitted && data.length !== 0);
        setAlertFailureShow(filterSubmitted && data.length === 0);

    }, [filterSubmitted, data.length])

    function handleClick(rowProps){
        if(filterSubmitted){
            fetchWorkingSchedule(rowProps.id);
        }
        
    }
    
    function toDate(dateArray){
        return new Date(`${dateArray[0]}-${dateArray[1]}-${dateArray[2]} ${dateArray[3]}:${dateArray[4]}`);
    }

    function reformat(array){
        array.forEach(element => {
            element.start = toDate(element.start)
            element.end = toDate(element.end)
        });

        return array;
    }

    useEffect(() => {
        if(filterSubmitted)
            setModalShow(true);
    }, [busy])  

    function fetchWorkingSchedule(id){
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
        };


        fetch(`${serviceConfig.baseURL}/clinic/doctorWorkingSchedule/${id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            
            setShift(data.shift);
            setBusy(reformat([...data.checkups,... data.absences]))
        })
        .catch(response => {
            console.log(response)
        })
    }

    function handleSubmit(e){
        e.preventDefault();

        let specialized = data.filter(element => element.specialization === type.name);
        setData(specialized);   
        setFilterSubmitted(true);
    }


    return(
        <div> 
            <Header/>
            <Container>
                {alertSuccesShow &&
                        <Alert variant="success" onClose={() => setAlertSuccessShow(false)} dismissible>
                        <Alert.Heading>Well done!</Alert.Heading>
                        <p>
                            Now select doctor of your choice in the list below to select time of your appointment...
                        </p>
                        <hr/>   
                            <Button variant="danger" onClick={() => window.location.reload()}>
                                Cancel
                            </Button>
                    </Alert>
                }
                {alertFailureShow &&
                      <Alert variant="danger" onClose={() => setAlertFailureShow(false)} dismissible>
                      <Alert.Heading>Try again!</Alert.Heading>
                      <p>
                        Unfortunately there are no available clinics for the given values. Please try again with different values...
                      </p>
                      <hr/>
                        <Button variant="success" onClick={() => window.location.reload()}>
                                Refresh doctors list
                        </Button>
                    </Alert>
                }
                <Accordion>
                    <Accordion.Toggle as={Button} variant="outline-success" eventKey="0" style={{margin:'1%'}} hidden={filterSubmitted}>
                    Schedule an appointment 
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card style={{width:'40%', margin:'1%'}} >
                        <Form onSubmit={handleSubmit}>
                            <Card.Header>
                                Choose type and date 
                            </Card.Header>
                            <Card.Body>
                                {renderSelect()}
                                <InputGroup style={{marginTop:'3%'}}>
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
                            </Card.Body>
                            <Card.Footer>
                                <Accordion.Toggle as={Button} variant="danger" eventKey="0" size="sm" style={{float:'right', marginLeft:"1%"}}>Cancel</Accordion.Toggle>
                                <Accordion.Toggle as={Button} style={{float:'right'}} size='sm' variant="success" type="submit">Confirm</Accordion.Toggle>
                            </Card.Footer>
                        </Form>
                    </Card>
                    </Accordion.Collapse>
                </Accordion>
                <GenericTable columns={columns} data={data} fetchData={fetchData} handleClick={handleClick}/>
            </Container>

            <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
                <Modal.Header closeButton>
                   <h3>Choose date and time</h3>
                </Modal.Header>
                <Modal.Body>
                    <AvailableHours events={busy} shift={shift} passedDate={date}/>
                </Modal.Body>
            </Modal>
        </div>
    )
} export default ScheduleDoctor;