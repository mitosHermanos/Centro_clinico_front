import React, {Component} from 'react';
import {Container, Form, Col, Button, Table} from 'react-bootstrap';
import {serviceConfig} from '../appSettings.js'
import {useHistory} from "react-router-dom";
import { browserHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';

class CCAdminDecline extends Component{

    constructor(props) {
        super(props);
        this.state = {
            _description: ''         
        };
        console.log(this.props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.declineRegistration();
    }


    declineRegistration(){
     const send ={
        mail : this.props.match.params.id,
      }
      const token = JSON.parse(localStorage.getItem('token'));

       const requestOptions ={
          method: 'POST',
          headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`
                },
          body: JSON.stringify(send)
       };
       fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/decline/${this.state._description}`, requestOptions)
       .then(response => {
           if (!response.ok) {
               return Promise.reject(response);
           }
           window.location.href = '/home';
           return response.statusText;
       })
      //  .then(() => {
      //      this.props.history.push('/clinicCentAdmin');
      //  })
      //  .catch(response => {
      //      return response.text();
      //  })
       .then((message) => {
           alert(message);
       });
    }

    render(){
    return (
        <Container>
        <div className='register-div'>
            <h2>State reason</h2>
            <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                required
                                id="_description"
                                type="text"
                                value={this.state._description}
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
     )
    }
}



export default CCAdminDecline; 
