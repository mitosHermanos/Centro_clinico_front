import React, {useState} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import ReactDOM from 'react-dom';
import { useRouteMatch } from "react-router-dom";

class ScheduleOnCheckupEnd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _checkupDate: '',
            _startTime: '',
            _checked: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
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
        const {_checkupDate, _startTime, _checked } = this.state;

        const predefCheckupRequest = {
            id: this.props.match.params.id,
            date: _checkupDate,
            startTime: _startTime,
            isOperation: _checked,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`,
            },
            body: JSON.stringify(predefCheckupRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinic/scheduleAnotherCheckup`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.statusText;
        })
        .then(() => {
            alert("You have successfully scheduled another checkup/operation!");
            this.props.history.push(`/reportDiagnosis/${this.props.match.params.id}`);
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
            promise.then(data => {
                alert(data.message);
            })            
        })

    }
    
    render(){
        const {_checkupDate, _startTime, _checked } = this.state;
        return(
            <Container>
                <div className='register-div'>
                    <h2>Schedule another checkup</h2>
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
                                        id="_startTime"
                                        type="time"
                                        value={_startTime}
                                        placeholder="Start time"
                                        onChange={this.handleChange}
                                    />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Check
                                    type="checkbox"
                                    label="Operation"
                                    checked={_checked}
                                    onChange={e => this.setState({_checked: e.target.checked})}/>
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
export default ScheduleOnCheckupEnd; 