import React from 'react';
import {Card, Container, Text, FormControl, Button} from 'react-bootstrap';
import '../styles/PatientInfo.css';

class PatientInfo extends React.Component{
    constructor(props){
        super(props);   
    }


    render(){
        return(
            <Container style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}>
                <Card border="primary" style={{ width: '30rem'}}>
                    <Card.Header>Patient information</Card.Header>                    
                    <Card.Body>
                        <Card.Title>Ognjen Garic</Card.Title>
                        <Card.Text>
                            Novi Sad
                        </Card.Text>
                        <hr/>
                        <h6>Contact information</h6>
                        <Container>
                            <span>Phone number:</span>
                            <i>&nbsp;0621409979</i>
                            <br/><br/>
                            <span>Adress:</span>
                            <i>&nbsp;Bulvear Jovana Ducica 27, 21000 Novi Sad, Srbija</i>
                            <br/><br/>
                            <span>Email:</span>
                            <i>&nbsp;ognjenari@gmail.com</i>
                        </Container>
                        <hr/>
                        <h6>Personal information</h6>
                        <Container>
                        <span>Social security number:</span>
                        <i>&nbsp;2489130932</i>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default PatientInfo;