import React, {useState} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'

class EnterDiagnosis extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _code: '',
            _description: '',          
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

        this.enter();

    }

    enter(){
        
        const {_code, _description} = this.state;

        const patientRequest = {
            code: _code,
            description: _description
        }
        const token = JSON.parse(localStorage.getItem('token'));
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${token.accessToken}`
        },
            body: JSON.stringify(patientRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/addDiagnosis`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.statusText;
        })
        // .then(() => {
        //     this.props.history.push('/');
        // })
        // .catch(response => {
        //     return response.text();
        // })
        // .then((message) => {
        //     alert(message);
        // });
    }
    
    render(){
        const {_code, _description } = this.state;
        return(
            <Container>
                <div className='diagnosis-div'>
                    <h2>Define diagnosis</h2>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                                <Form.Label>Diagnosis</Form.Label>
                                <Form.Control
                                    required
                                    id="_code"
                                    value={_code}
                                    type="text"
                                    placeholder="diagnosis"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} md="6">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    id="_description"
                                    type="text"
                                    value={_description}
                                    placeholder="Description"
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
export default EnterDiagnosis; 