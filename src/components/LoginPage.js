import React from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {serviceConfig} from '../appSettings.js'

class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            _email : "",
            _password : ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.login();
    }

    login(){
        const {_email, _password} = this.state;

        const loginData = {
            email : _email,
            password : _password
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginData)
        };

        fetch(`${serviceConfig.baseURL}/auth/login`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('token', JSON.stringify(data));
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
            promise.then(data => {
                alert(data.message);
            })    
        })
    }

    render(){
        const {_email, _password} = this.state;

        return(
            <Container>
                    <div className='login-div'>
                        <h2>Centro clinico</h2> 
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>
                                    Email
                                </Form.Label>
                                <Form.Control
                                    required
                                    id="_email"
                                    value={_email}
                                    type="text"
                                    placeholder="Email"
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control
                                    required
                                    id="_password"
                                    value={_password}
                                    type="password"
                                    placeholder="Password"
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                            <div className="text-center">
                                <Button variant="primary" type="submit">
                                    Log in
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <div className="text-center">
                            Don't have an account?
                            <br/>   
                            <Link to="/register">
                                Sign up
                            </Link>
                    </div>
            </Container>
        );
    }
}
export default LoginPage;