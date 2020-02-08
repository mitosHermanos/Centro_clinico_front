import React from 'react';
import {Form, Button, Container, Image, Modal, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {serviceConfig} from '../appSettings.js'
import ModalAlert from './ModalAlert.js'

class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            _email : "",
            _password : "", 
            message: "",
            _newPassword: "",
            _repeatPassword: "",
            modalShow: false,
        }

        this.child = React.createRef();

        
        this.newPassword = React.createRef();
        this.repeatPassword = React.createRef();

        this.handleFirstPass = this.handleFirstPass.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const token = JSON.parse(localStorage.getItem('token'));
        if(token !== null){
            this.props.history.push('/home');
        }
    }

    showPassword(ref){
        ref.current.type = 'text';
    }

    hidePassword(ref){
        ref.current.type = 'password';
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.login();
    }

    handleShowModal(){
        const {modalShow} = this.state.modalShow;
        this.setState({modalShow:true});
        this.componentDidMount();
    }

    handleFirstPass(){
        const {_email, _newPassword, _repeatPassword, modalShow} = this.state;

        if(_newPassword.trim() !== _repeatPassword.trim()){
            this.setState({message:"Passwords do not match"})
            this.child.current.showModal(); 
            return;
        }

        const passwordData = {
            email : _email,
            password : _newPassword
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify(passwordData)
        };


        fetch(`${serviceConfig.baseURL}/auth/firstPassChange`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            this.setState({modalShow:false});
            window.location.reload();
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
            promise.then(data => {
                this.setState({message:data.message})
                this.child.current.showModal(); 
            })    
        })
        
    }

    login(){
        const {_email, _password, modalShow} = this.state;

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
            console.log(data);
            if(data != null){
                if(data.accessToken != null){
                    localStorage.setItem('token', JSON.stringify(data));
                    this.props.history.push('/home');
                }else{
                    this.handleShowModal();
                }
            }
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
        const {_email, _password, message, _newPassword, _repeatPassword, modalShow} = this.state;

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
                    
                    <Modal show={modalShow} onHide={() => this.setState({modalShow: false})}>
                        <Modal.Header closeButton>
                            <h3>First login password change</h3>
                        </Modal.Header>
                        <Modal.Body>
                        <Form.Group>
                                <Form.Label>
                                    New password
                                </Form.Label>
                                <div style={{display:"flex"}}>
                                    <Form.Control
                                        required
                                        id="_newPassword"
                                        value={_newPassword} 
                                        type="password"
                                        placeholder="New password"
                                        onChange = {this.handleChange}
                                        ref={this.newPassword}
                                    />
                                    <Button 
                                        variant="outline-secondary"
                                        onMouseDown={this.showPassword.bind(this, this.newPassword)} 
                                        onMouseUp={this.hidePassword.bind(this, this.newPassword)} 
                                        onMouseLeave={this.hidePassword.bind(this, this.newPassword)}
                                    >See</Button>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Repeat new password
                                </Form.Label>
                                <div style={{display:"flex"}}>
                                    <Form.Control
                                        required
                                        id="_repeatPassword"
                                        value={_repeatPassword} 
                                        type="password"
                                        placeholder="Repeat new password"
                                        onChange = {this.handleChange}
                                        ref={this.repeatPassword}
                                    />
                                    <Button 
                                        variant="outline-secondary"
                                        onMouseDown={this.showPassword.bind(this, this.repeatPassword)} 
                                        onMouseUp={this.hidePassword.bind(this, this.repeatPassword)} 
                                        onMouseLeave={this.hidePassword.bind(this, this.repeatPassword)}
                                    >See</Button>
                                </div>
                            </Form.Group>
                        </Modal.Body>
                        <Card.Footer style={{display:"flex", justifyContent:"flex-end"}}>
                            <Button variant="success" onClick={this.handleFirstPass} size="sm" style={{marginRight:"3%"}}>Submit</Button>
                        </Card.Footer>
                    </Modal>

            </Container>
        );
    }
}
export default LoginPage;