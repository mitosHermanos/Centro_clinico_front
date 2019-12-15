import React, {useState} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import { serviceConfig } from '../appSettings';


class RegisterClinic extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _name: '',
            _street: '',
            _number: '',
            _city: '',
            _postcode: '',
            _country: '',
            _description: ''         
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

        this.register();
    }

    register(){
        const{_name, _street, _number, _city, _postcode, _country, _description} = this.state;
        const token = JSON.parse(localStorage.getItem('token'));

        const _address = {
            street: _street,
            number: _number,
            city: _city,
            postcode: _postcode,
            country: _country
        }
        const clinicRequest = {
            name: _name,
            address: _address,            
            description: _description
        }
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'           
            },
            body: JSON.stringify(clinicRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/registerClinic`, requestOptions)
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
            alert('Unsuccessfull register')
        });
    }




render(){
    const{_name, _street, _number, _city, _postcode, _country, _description} = this.state;
    return(
        <Container>
            <div className='register-div'>
                <h2>Register new clinic</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Clinic name</Form.Label>
                            <Form.Control
                                    required
                                    id="_name"
                                    type="text"
                                    value={_name}
                                    placeholder="name"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} md="8">
                                    <Form.Label>Street name</Form.Label>
                                    <Form.Control
                                        required
                                        id="_street"
                                        type="text"
                                        value={_street}
                                        placeholder="Street name"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Street number</Form.Label>
                                    <Form.Control
                                        required
                                        id="_number"
                                        type="text"
                                        value={_number}
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
                                        type="text"
                                        value={_city}
                                        placeholder="City"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Postcode</Form.Label>
                                    <Form.Control
                                        required
                                        id="_postcode"
                                        type="text"
                                        value={_postcode}
                                        placeholder="Postcode"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        required
                                        id="_country"
                                        type="text"
                                        value={_country}
                                        placeholder="Country"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                    </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    id="_description"
                                    type="text"
                                    value={_description}
                                    placeholder="description"
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
export default RegisterClinic; 
