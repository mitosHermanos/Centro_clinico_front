import React from 'react';
import {Card, Container, FormControl, Button, Form, Col, Row, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {serviceConfig} from '../appSettings.js'
import '../styles/PatientInfo.css';

class PatientInfo extends React.Component{
    constructor(props){
        super(props);   
        this.state = {
            patient : {
            }  
        }
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


    render(){
        const {name, surname, email, phoneNumber, street, streetNumber, city, postcode, country, socialSecurityNumber} = this.state.patient;


        return(
            <Container style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}>
                <Card border="primary" style={{ width: '30rem'}}>
                    <Card.Header style={{display: 'flex', justifyContent: 'space-between'}}>
                        Patient information
                        <div>
                            <Button variant="outline-primary" size="sm">
                                Edit
                            </Button>
                            <OverlayTrigger
                                placement='top'
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        You cannot edit your email and social security number.
                                    </Tooltip>
                                }
                            >
                            <Button variant="outline-info" size="sm">?</Button>
                            </OverlayTrigger>
                        </div>
                    </Card.Header>                    
                    <Card.Body>
                        <Card.Title>{name} {surname}</Card.Title>
                        <Card.Text>
                            {city}
                        </Card.Text>
                        <hr/>
                        <h6>Contact information</h6>
                        <Container>
                            <span>Phone number:</span>
                            <i>&nbsp;{phoneNumber}</i>
                            <br/><br/>
                            <span>Adress:</span>
                            <i>&nbsp;
                                {street} {streetNumber}, {postcode} {city}, {country}</i>
                            <br/><br/>
                            <span>Email:</span>
                            <i>&nbsp;{email}</i>
                        </Container>
                        <hr/>
                        <h6>Personal information</h6>
                        <Container>
                        <span>Social security number:</span>
                        <i>&nbsp;{socialSecurityNumber}</i>
                        </Container>
                    </Card.Body>
                    <Card.Footer style={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="outline-primary" size="sm">
                            Change password
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
        );
    }
}

export default PatientInfo;