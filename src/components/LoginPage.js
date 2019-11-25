import React from 'react';
import Header  from './Header.js';
import {Form, Button, Row, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container>
                    <div className='login-div'>
                        <h2>Centro clinico</h2> 
                        <Form>
                            <Form.Group>
                                <Form.Label>
                                    Email
                                </Form.Label>
                                <Form.Control
                                    id="email"
                                    type="text"
                                    placeholder="Email"
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
}
export default LoginPage;