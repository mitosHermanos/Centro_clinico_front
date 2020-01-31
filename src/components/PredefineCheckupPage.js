import React, {useState} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import ReactDOM from 'react-dom';

class PredefineCheckupPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _checkupDate: '',
            _checkupTime: '',
            _checkupType: '',
            _doctorId: '',
            _roomId: '',
            _doctors: [],
            _rooms: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`},
        }

        fetch(`${serviceConfig.baseURL}/clinic/getRooms`, requestOptions)
            .then(response => {
                return response.json();   
            })
            .then((data) =>  {
                this.setState({_rooms: data});  
            })
            .catch(response => {
                // const promise = Promise.resolve(response.json());
                // promise.then(data => {
                //     alert(data.message);
                // })
            })

        fetch(`${serviceConfig.baseURL}/clinic/getDoctors`, requestOptions)
            .then(response => {
                return response.json();   
            })
            .then((data) =>  {
                this.setState({_doctors: data});
                console.log(data);
            })
            .catch(response => {
                // const promise = Promise.resolve(response.json());
                // promise.then(data => {
                //     alert(data.message);
                // })
            })  
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
        const token = JSON.parse(localStorage.getItem('token'));
        const {_checkupDate, _checkupTime } = this.state;

        const predefCheckupRequest = {
            checkupDate: _checkupDate,
            checkupTime: _checkupTime,
            doctorId: ReactDOM.findDOMNode(this.refs._doctorId).value,
            roomId: ReactDOM.findDOMNode(this.refs._roomId).value,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`,
            },
            body: JSON.stringify(predefCheckupRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinic/predefine`, requestOptions)
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
        const {_checkupDate, _checkupTime, _doctors, _rooms, _checkupTypes } = this.state;
        return(
            <Container>
                <div className='register-div'>
                    <h2>Predefine a checkup</h2>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Date of the checkup</Form.Label>
                                <Form.Control
                                    required
                                    id="_checkupDate"
                                    value={_checkupDate}
                                    type="date"
                                    placeholder="Date"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                    <Form.Label>Time of the checkup</Form.Label>
                                    <Form.Control
                                        required
                                        id="_checkupTime"
                                        type="time"
                                        value={_checkupTime}
                                        placeholder="Time"
                                        onChange={this.handleChange}
                                    />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="8">
                                <Form.Label>Choose a doctor:</Form.Label>
                                <Form.Control required as="select" ref='_doctorId'>
                                    {_doctors.map((e, key) => {
                                            return <option key={key} value={e.id}>[Spec: {e.spec}] {e.name} {e.surname}</option>;
                                        })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Choose a room:</Form.Label>
                                <Form.Control required as="select" ref='_roomId'>
                                    {_rooms.map((e, key) => {
                                            return <option key={key} value={e.id}>{e.name}</option>;
                                        })}
                                </Form.Control>
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
export default PredefineCheckupPage; 