import React from 'react';
import { Navbar, Nav , Row, Button, Col, Image} from 'react-bootstrap';
import {serviceConfig} from '../appSettings.js'

class Header extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            role : ""
        }
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        this.getRole()
    }

    getRole(){
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
        };

        fetch(`${serviceConfig.baseURL}/auth/role`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            this.setState({role : data.role});
        })
        .catch(response => {
            const promise = Promise.resolve(response.json())
            promise.then(data => {
                alert(data.message);
            })
        })
    }

    logout(){
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
        };

        fetch(`${serviceConfig.baseURL}/person/logout`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            localStorage.removeItem('token');
            this.nextPath('/');
        })
        .catch(response => {
            const promise = Promise.resolve(response.json())
            promise.then(data => {
                alert(data.message);
            })
        })
    }

    nextPath(path) {
        window.location.href=`${path}`;
    }

    render(){
        const {role} = this.state;

        return(
            <Navbar style={{position:'sticky'}}> 
                <Navbar.Brand>
                    <Image 
                        style={{cursor:"pointer"}}
                        onClick={() => this.nextPath('/home') }
                        src={require("../resources/logo48x48.png")}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Centro clinico logo"
                    />
                </Navbar.Brand>
                {
                   role === "PATIENT" &&
                <Row>
                    <Nav.Link>Clinics list</Nav.Link>
                    <Nav.Link>Examinations/Surgeries</Nav.Link>
                    <Nav.Link>Medical record</Nav.Link>
                    <Nav.Link onClick={() => this.nextPath('/patientProfile') }>Profile</Nav.Link>
                </Row>     
                } 
                {
                   role === "CLINIC_ADMIN" &&
                <Row>
                    <Nav.Link  onClick={() => this.nextPath('/editClinicProfile') }>Edit clinic profile</Nav.Link>
                    <Nav.Link  onClick={() => this.nextPath('/searchRooms') }>Search rooms</Nav.Link>
                    <Nav.Link  onClick={() => this.nextPath('/searchDoctors') }>Search doctors</Nav.Link>
                    <Nav.Link  onClick={() => this.nextPath('/searchCheckupDates') }>Search checkup dates</Nav.Link>
                    <Nav.Link  onClick={() => this.nextPath('/searchCheckupTypes') }>Search checkup types</Nav.Link>
                </Row>     
                }
                {
                    role === "CLINIC_CENTER_ADMIN" && 
                    <Row>
                        <Nav.Link  onClick={() => this.nextPath('/newDiagnosis') }>New diagnosis</Nav.Link>
                        <Nav.Link  onClick={() => this.nextPath('/newMedicine') }>New medicine</Nav.Link>
                        <Nav.Link  onClick={() => this.nextPath('/clinicCentAdmin') }>Patient registration requests</Nav.Link>
                        <Nav.Link  onClick={() => this.nextPath('/registerClinic') }>Register clinic</Nav.Link>
                        <Nav.Link  onClick={() => this.nextPath('/registerClinic') }>Register administrator</Nav.Link>
                    </Row>
                }
                {	
                    role === "DOCTOR" && 	
                    <Row>	
                        <Nav.Link>View profile</Nav.Link>	
                        <Nav.Link>Start checkup</Nav.Link>	
                        <Nav.Link>Search patients</Nav.Link>	
                        <Nav.Link>View work calendar</Nav.Link>	
                        <Nav.Link>Request a vacation/leave</Nav.Link>	
                        <Nav.Link>Schedule a checkup/operation</Nav.Link>	
                    </Row>	
                }
                <Col>
                </Col>
                <Button size="sm" variant="outline-danger" onClick={this.logout}>Sign out</Button>             
            </Navbar>
        );
    }
}

export default Header;