import React, {useState} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'

class RegisterPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            socialSecurityNumber: "",
            password: '',
            repeatPassword: '',
            name: '',
            surname: '',
            phone: '',
            street: '',
            number: '',
            city: '',
            postcode: '',
            country: '',          
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

        const { password, repeatPassword } = this.state;
        
        if(password.trim() !== repeatPassword.trim()){
            alert('Passwords do not match');
        }

        this.register();

    }

    register(){

        const patientRequest = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            surname: this.state.surname,            
            street: this.state.street,
            streetNumber: this.state.number,
            city: this.state.city,
            postcode: this.state.postcode,
            country: this.state.country,
            phoneNumber: this.state.phone,
            socialSecurityNumber: this.state.socialSecurityNumber
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(patientRequest)
        };

        fetch(`${serviceConfig.baseURL}/auth/register`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.statusText;
        })
        .then(() => {
            this.props.history.push('/');
        })
        .catch(response => {
            alert('Unsuccessfull register')
        });
    }
    
    render(){
        const {email, socialSecurityNumber,password, repeatPassword, name, surname, phone, street, number, city, postcode, country } = this.state;
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
                                    id="email"
                                    value={email}
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Social security number</Form.Label>
                                <Form.Control
                                    required
                                    id="socialSecurityNumber"
                                    value={socialSecurityNumber}
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
                                    id="password"
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                            <Form.Label>Repeat password</Form.Label>
                                <Form.Control
                                    required
                                    id="repeatPassword"
                                    value={repeatPassword}
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
                                    id="name"
                                    value={name}
                                    type="text"
                                    placeholder="Name"
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    required
                                    id="phone"
                                    value={phone}
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
                                    id="street"
                                    value={street}
                                    type="text"
                                    placeholder="Street name"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Street number</Form.Label>
                                <Form.Control
                                    required
                                    id="number"
                                    value={number}
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
                                    id="city"
                                    value={city}
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
                                    id="postcode"
                                    value={postcode}
                                    type="text"
                                    onChange={this.handleChange}
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
export default RegisterPage; 