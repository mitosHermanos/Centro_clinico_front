import React, {useState} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'

class RegisterClinicCentAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _email: '',
            _socialSecurityNumber: "",
            _password: '',
            _repeatPassword: '',
            _name: '',
            _surname: '',
            _phone: '',
            _street: '',
            _number: '',
            _city: '',
            _postcode: '',
            _country: '',          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { _password, _repeatPassword } = this.state;
        
        if(_password.trim() !== _repeatPassword.trim()){
            alert('Passwords do not match');
            return;
        }

        this.register();

    }

    register(){
        
        const {_email, _socialSecurityNumber, _password,  _name, _surname, _phone, _street, _number, _city, _postcode, _country } = this.state;

        const _address = {
            street: _street,
            number: _number,
            city: _city,
            postcode: _postcode,
            country: _country
        }

        const patientRequest = {
            email: _email,
            password: _password,
            name: _name,
            surname: _surname,            
            address: _address,
            phoneNumber: _phone,
            socialSecurityNumber: _socialSecurityNumber
        }
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token.accessToken}`

        },
            body: JSON.stringify(patientRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/registerClinicCentAdmin`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            window.location.href = '/home';
            return response.statusText;
        })
        .then(() => {
            //this.props.history.push('/');
        })
        .catch(response => {
            return response.text();
        })
        .then((message) => {
            alert(message);
        });
    }
    
    render(){
        const {_email, _socialSecurityNumber, _password, _repeatPassword, _name, _surname, _phone, _street, _number, _city, _postcode, _country } = this.state;
        return(
            <Container>
                <div className='register-div'>
                    <h2>Create a patient account</h2>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    id="_email"
                                    value={_email}
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Social security number</Form.Label>
                                <Form.Control
                                    required
                                    id="_socialSecurityNumber"
                                    value={_socialSecurityNumber}
                                    type="text"
                                    placeholder="Social security number"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} md="6">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    id="_password"
                                    type="password"
                                    value={_password}
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                            <Form.Label>Repeat password</Form.Label>
                                <Form.Control
                                    required
                                    id="_repeatPassword"
                                    value={_repeatPassword}
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} md="4">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    id="_name"
                                    value={_name}
                                    type="text"
                                    placeholder="Name"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control
                                    required
                                    id="_surname"
                                    value={_surname}
                                    type="text"
                                    placeholder="Surname"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    required
                                    id="_phone"
                                    value={_phone}
                                    type="text"
                                    placeholder="Phone"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} md="8">
                                <Form.Label>Street name</Form.Label>
                                <Form.Control
                                    required
                                    id="_street"
                                    value={_street}
                                    type="text"
                                    placeholder="Street name"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Street number</Form.Label>
                                <Form.Control
                                    required
                                    id="_number"
                                    value={_number}
                                    type="text"
                                    placeholder="Street number"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    required
                                    id="_city"
                                    value={_city}
                                    type="text"
                                    placeholder="City"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control
                                    required
                                    placeholder="Postcode"
                                    id="_postcode"
                                    value={_postcode}
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    required
                                    id="_country"
                                    value={_country}
                                    type="text"
                                    placeholder="Country"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <div className="text-center">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                        </div>
                    </Form>
                </div>
            </Container>
        );
    }
}
export default RegisterClinicCentAdmin; 