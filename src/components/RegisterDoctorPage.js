import React, {useState} from 'react';
import {Container, Form, Col, Button, InputGroup} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import ReactDOM from 'react-dom';

class RegisterDoctorPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _email: '',
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
            _checkupTypes : [],
            timeEnd: '',
            timeStart: '',
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

    componentDidMount(){
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`},
        }

        fetch(`${serviceConfig.baseURL}/clinic/getCheckupTypes`, requestOptions)
            .then(response => {
                return response.json();   
            })
            .then((data) =>  {
                this.setState({_checkupTypes: data});  
            })
            .catch(response => {
                // const promise = Promise.resolve(response.json());
                // promise.then(data => {
                //     alert(data.message);
                // })
            })
    }

    register(){
        const token = JSON.parse(localStorage.getItem('token'));
        const {_email, _password,  _name, _surname, _phone, _street, _number, _city, _postcode, _country, timeStart, timeEnd } = this.state;

        const doctorRequest = {
            email: _email,
            password: _password,
            name: _name,
            surname: _surname,            
            street: _street,
            streetNumber: _number,
            city: _city,
            postcode: _postcode,
            country: _country,
            phoneNumber: _phone,
            specialization: ReactDOM.findDOMNode(this.refs._checkupType).value,
            startTime: timeStart,
            endTime: timeEnd,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`,
            },
            body: JSON.stringify(doctorRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinic/addDoctor`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.statusText;
        })
        .then(() => {
            this.props.history.push('/editClinicProfile');
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
            promise.then(data => {
                alert(data.message);
            })            
        })
    }
    
    render(){
        const {_email, _socialSecurityNumber, _password, _repeatPassword, _name, _surname, _phone, _street, _number, _city, _postcode, _country, _checkupTypes, timeStart, timeEnd } = this.state;
        return(
            <Container>
                <div className='register-div'>
                    <h2>Create a doctor account</h2>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
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
                            
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Choose specialization</Form.Label>
                                <Form.Control required as="select" ref='_checkupType'>
                                    {_checkupTypes.map((e, key) => {
                                        return <option key={key} value={e.id}>{e.name}</option>;
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Shift start</Form.Label>
                                <InputGroup>
                                    <Form.Control                                        
                                            required                                        
                                            value={timeStart}
                                            type="time" 
                                            onChange = {e => this.setState({timeStart : e.target.value})}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Shift End</Form.Label>
                                <Form.Control                                        
                                        required                                        
                                        value={timeEnd}
                                        type="time"
                                        min="07:00"
                                        max="20:00"
                                        onChange = {e => this.setState({timeEnd : e.target.value})}
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
export default RegisterDoctorPage; 