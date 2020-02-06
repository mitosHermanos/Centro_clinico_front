import React, {PropTypes} from 'react';
import {Card, Container, FormControl, Button, Form, Col, Row, OverlayTrigger, Tooltip, Image} from 'react-bootstrap';
import {serviceConfig} from '../appSettings.js'
import '../styles/PatientInfo.css';
import Header from './Header';
import GoogleMaps from "simple-react-google-maps";

class ClinicAdminInfo extends React.Component{
    constructor(props){
        super(props);   
        this.state = {
            clinicAdmin : {},
            coordinates : {}  
        }
    }

    componentDidMount(){
        this.getClinicAdminInfo();
        
        
    }

    getClinicAdminInfo(){
        const token = JSON.parse(localStorage.getItem('token'));
    
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            },
        };


        fetch(`${serviceConfig.baseURL}/clinicAdmin`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            this.setState({clinicAdmin : data});
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
        const {name, surname, email, phoneNumber, street, streetNumber, city, postcode, country} = this.state.clinicAdmin;
        const {coordinates} = this.state.coordinates;


        return(
            <div>
                <Header/>
            <Container style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}>
                <Card style={{ width: '30rem'}}>
                    <Card.Header style={{display: 'flex', justifyContent: 'space-between'}}>
                        Clinic administrator information
                        <div>
                            <Button variant="primary" size="sm" onClick={() => this.nextPath('/clinicAdminProfile/edit') }>
                                Edit
                            </Button>
                            <OverlayTrigger
                                placement='top'
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        You cannot edit your email.
                                    </Tooltip>
                                }
                            >
                            <Button style={{marginLeft:"5px"}} variant="info" size="sm">?</Button>
                            </OverlayTrigger>
                        </div>
                    </Card.Header>                    
                    <Card.Body>
                        <Card.Title style={{marginLeft:"10px"}}>{name} {surname}</Card.Title>
                        <Card.Text style={{fontSize:"large"}}>
                            <Image src={require('../resources/location.png')}></Image>
                            {city}
                        </Card.Text>
                        <hr/>
                        <h6>Contact information</h6>
                        <Container>
                            <span>Phone number:</span>
                            <i>&nbsp;{phoneNumber}</i>
                            <br/><br/>
                            <GoogleMaps
                                apiKey={"AIzaSyA7uok3wogOKBfDVmmi_5JbLcYQtIvzA20"}
                                style={{height: "200px", width: "100%"}}
                                zoom={6}
                                center={{lat: 45.246520, lng: 19.851710}}
                                // center={`https://maps.googleapis.com/maps/api/geocode/json?address=${streetNumber}+${street}+${city}+${postcode}&key=AIzaSyBpsiwUWy62woh9wkmdXLolzVTkPcJqzng`}
                                // markers={`https://maps.googleapis.com/maps/api/geocode/json?address=${streetNumber}+${street}+${city}+${postcode}&key=AIzaSyBpsiwUWy62woh9wkmdXLolzVTkPcJqzng`} //optional
                            />
                            <span>Address:</span>
                            <i>&nbsp;
                                {street} {streetNumber}, {postcode} {city}, {country}</i>
                            <br/><br/>
                            <span>Email:</span>
                            <i>&nbsp;{email}</i>
                        </Container>
                    </Card.Body>
                    <Card.Footer style={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="primary" size="sm" onClick={() => this.nextPath('/clinicAdminProfile/password') }>
                            Change password
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
            </div>
        );
    }
}

export default ClinicAdminInfo;