import React from 'react';
import {Card, Container, FormControl, Button, Form, Col, Row, OverlayTrigger, Tooltip, Image} from 'react-bootstrap';
import {serviceConfig} from '../appSettings.js'
import '../styles/PatientInfo.css';
import Header from './Header';

class CheckupInfo extends React.Component{
    constructor(props){
        super(props);   
        this.state = {
            checkup : {
            }  
        }
    }

    componentDidMount(){
        this.getCheckupInfo();
    }

    getCheckupInfo(){
        const token = JSON.parse(localStorage.getItem('token'));
    
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            },
        };


        fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/getCheckupInfo/${this.props.match.params.id}`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
                console.log('1');
            }
            return response.json();
            console.log('2');
        })
        .then((data) => {
            this.setState({checkup : data});
            console.log(this.state.checkup);
        })
        .catch(response => {
            console.log('3');
            // const promise = Promise.resolve(response.json());
            // promise.then(data => {
            //     alert(data.message);
            // })    
        })

    }

    nextPath(path) {
        this.props.history.push(path);
    }


    startCheckup(id){
        console.log('USAO');
        window.location.href='/reportDiagnosis/'+id;
    }

    render(){
        
    return(
            <div>
                <Container style={{marginTop:"5rem", width:"50rem"}}>
            <Card>
                <Form onSubmit = {this.handleSubmit}>
                <Card.Header>
                    <Card.Title id="contained-Card-title-vcenter">
                    Checkup information
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                            <Form.Label>Patient name</Form.Label>
                            <Form.Control
                                required
                                id="_height"
                                value={this.state.checkup.patient_name}
                                type="text"
                                //placeholder="Height"
                                //onChange = {this.handleChange}
                            />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Doctor name</Form.Label>
                                <Form.Control
                                    required
                                    id="_weight"
                                    value={this.state.checkup.doctor_name}
                                    type="text"
                                    //placeholder="Weight"
                                    //onChange = {this.handleChange}
                                />
                            </Form.Group>
                     </Form.Row>
                    <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Duration</Form.Label>
                                <Form.Control
                                    required
                                    id="_bloodType"
                                    value={this.state.checkup.duration}
                                    type="text"
                                    //placeholder="Blood type"
                                    //onChange = {this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="8">
                                    <Form.Label>Room ID</Form.Label>
                                    <Form.Control
                                        required
                                        id="_diopter"
                                        value={this.state.checkup.room_id}
                                        type="text"
                                        //placeholder="Diopter"
                                        //onChange = {this.handleChange}
                                    />
                            </Form.Group>
                        </Form.Row>
                </Card.Body>
                <Card.Footer style={{display:"flex", justifyContent:"flex-end"}}>
                <Button variant="primary" onClick={()=> this.startCheckup(this.props.match.params.id)}>Start chekup</Button>
                </Card.Footer>
                </Form>
            </Card>

        </Container>
        </div>
        );
    }
}

export default CheckupInfo;