import React from 'react';
import {Card, Form, Col, Button, Container} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'

class EditPatientInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            patient: {
                name : "",
                surname : "",
                phoneNumber : "",
                street : "",
                streetNumber : "",
                city : "",
                postcode : "",
                country: ""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.getPatientInfo();
    }
    
    getPatientInfo(){
        const token = JSON.parse(localStorage.getItem('token'));
    
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            },
        };


        fetch(`${serviceConfig.baseURL}/patient`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            this.setState({patient : data});
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
            promise.then(data => {
                alert(data.message);
            })    
        })

    }

    handleChange(e) {
        const newPatient = this.state.patient;
        newPatient[e.target.id] = e.target.value;
        this.setState({
          patient: newPatient
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.editPatientInfo();
    }

    editPatientInfo(){
        const token = JSON.parse(localStorage.getItem('token'));
        const {patient} = this.state;
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(patient)
        };

        fetch(`${serviceConfig.baseURL}/patient`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            this.props.history.push('/patientProfile');
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
            promise.then(data => {
                alert(data.message);
            })    
        })
    }

    nextPath(path) {
        this.props.history.push(path);
    }


    render(){
        const {name, surname, phoneNumber, street, streetNumber, city, postcode, country} = this.state.patient;

        return(        
        <Container style={{marginTop:"5rem", width:"50rem"}}>
            <Card>
                <Form onSubmit = {this.handleSubmit}>
                <Card.Header>
                    <Card.Title id="contained-Card-title-vcenter">
                    Edit your information
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                id="name"
                                value={name}
                                type="text"
                                placeholder="Name"
                                onChange = {this.handleChange}
                            />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control
                                    required
                                    id="surname"
                                    value={surname}
                                    type="text"
                                    placeholder="Surname"
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    required
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    type="text"
                                    placeholder="Phone"
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="8">
                                    <Form.Label>Street name</Form.Label>
                                    <Form.Control
                                        required
                                        id="street"
                                        value={street}
                                        type="text"
                                        placeholder="Street name"
                                        onChange = {this.handleChange}
                                    />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Street number</Form.Label>
                                <Form.Control
                                    required
                                    id="streetNumber"
                                    value={streetNumber}
                                    type="text"
                                    placeholder="Street number"
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        required
                                        id="city"
                                        value={city}
                                        type="text"
                                        placeholder="City"
                                        onChange = {this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Postcode</Form.Label>
                                    <Form.Control
                                        required
                                        placeholder="Postcode"
                                        id="postcode"
                                        value={postcode}
                                        type="text"
                                        onChange = {this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        required
                                        id="country"
                                        value={country}
                                        type="text"
                                        placeholder="Country"
                                        onChange = {this.handleChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                </Card.Body>
                <Card.Footer>
                    <Button variant="success" type="submit">Submit</Button>
                    <Button variant="danger" onClick={() => this.nextPath('/patientProfile') }>Cancel</Button>
                </Card.Footer>
                </Form>
            </Card>
        </Container>
        );
    }
}
export default EditPatientInfo;