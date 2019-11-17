import React from 'react';
import Header  from './Header.js';
import {Form, Button, Row, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function LoginPage(){

    return(
        <Container>
                <div className='login-div'>
                    <h2>Centro clinico</h2> 
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Username
                            </Form.Label>
                            <Form.Control
                                id="username"
                                type="text"
                                placeholder="Username"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control
                                id="password"
                                type="password"
                                placeholder="Password"
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
export default LoginPage;