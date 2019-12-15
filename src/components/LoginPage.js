import React from 'react';
import {Form, Button, Container, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {serviceConfig} from '../appSettings.js'
import ModalAlert from './ModalAlert.js'

class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            _email : "",
            _password : "", 
            message: ""
        }

        this.child = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const token = JSON.parse(localStorage.getItem('token'));
        if(token !== null){
            this.props.history.push('/home');
        }
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
            this.props.history.push('/home');
        })
        .catch(response => {
            const promise = Promise.resolve(response.json())
            promise.then(data => {
                this.setState({message:data.message})
                this.child.current.showModal(); 
            })
        })
    }

    render(){
        const {_email, _password, message} = this.state;

        return(
            <Container style={{position: "relative", top: "50%", transform: "translateY(40%)"}}>
                    <div className='login-div'>
                        <Image 
                            style={{marginLeft:"41%"}}
                            src={require("../resources/logo48x48.png")}
                            alt="Centro clinico logo"
                        />
                        <h2 style={{textAlign:"center"}}>Centro clinico</h2> 
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

                    <ModalAlert message={message} ref={this.child}/>
            </Container>
        );
    }
}
export default LoginPage;