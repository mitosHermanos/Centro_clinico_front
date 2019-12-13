import React, {useState} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'

class Report extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _description: '',
            isShowing: false         
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
        
        const {_description} = this.state;

        const patientRequest = {
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
    
    setShowing(){
        this.state.isShowing = !this.state.isShowing;
        console.log(this.state.isShowing)
    }
    render(){
        const {_description, isShowing } = this.state;
        var ispisi;
        return(
            <Container>
                <div className='diagnosis-div'>
                    <h2>Define diagnosis</h2>
                    <Form onSubmit={this.handleSubmit}>
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
                        <Form.Row>
                        <div>
                            <Button variant="primary" onClick={()=> this.setShowing()}>Show</Button>
                            {!this.state.isShowing && <Child />}
                        </div>
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
const Child = () => (
    <div className='modal'>
        Hello, World!
    </div> 
)
export default Report; 