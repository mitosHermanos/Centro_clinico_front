import React, { useState, useEffect,useRef } from 'react';
import {useLocation} from 'react-router-dom'
import {Container, Modal, Form, Col, InputGroup, Button, Alert} from 'react-bootstrap'
import  GenericTable from "./GenericTable.js"
import Header from "./Header.js"
import {serviceConfig} from '../appSettings.js'

const PatientClinicList = () => {

    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
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
              {
                Header: 'Street',
                accessor: 'fullAddress',
              }
            ],
          },
        ],
        []
    )    

    let location = useLocation()

    useEffect(() => {
        if(location.pathname === '/scheduleClinics'){
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

        //handle 
        //get filtered clinics

        setAlertShow(true);
        setModalShow(false);
    }

    return(
        <div>
            <Header/>
            <Container>
                {alertShow &&
                      <Alert variant="success" onClose={() => setAlertShow(false)} dismissible>
                      <Alert.Heading>Well done!</Alert.Heading>
                      <p>
                        Now select clinic of your choice in the list below to continue..
                      </p>
                    </Alert>
                }

                <GenericTable columns={columns} data={data} fetchData={fetchData}/>
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
                                //     id="_date"
                                //       value={_date}
                                        type="date"
                                        placeholder="Date"
                                //     onChange = {this.handleChange}
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
                                        id="_time"
                                //       value={_time}
                                        type="time"
                                        placeholder="Time"
                                        step="900"
                                        min="07:00"
                                        max="20:00"
                                //     onChange = {this.handleChange}
                                />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <InputGroup>              
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Type</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                    as="select"
                                //    value={pageSize}
                                    >                   
                                    </Form.Control>    
                                </InputGroup> 
                            </Form.Group>
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
    
} 
export default PatientClinicList