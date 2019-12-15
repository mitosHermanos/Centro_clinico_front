import React from 'react';
import {Card, Form, Button, Container} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import ModalAlert from './ModalAlert.js'

class EditPatientPassword extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            _oldPassword : "",
            _newPassword : "",
            _repeatPassword: "",
            message: ""
        }
        this.child = React.createRef();

        this.oldPassword = React.createRef();
        this.newPassword = React.createRef();
        this.repeatPassword = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.changePassword();
    }

    changePassword(){
        const {_oldPassword, _newPassword, _repeatPassword} = this.state;
        const token = JSON.parse(localStorage.getItem('token'));
        
        if(_newPassword.trim() !== _repeatPassword.trim()){
            this.setState({message:"Passwords do not match"})
            this.child.current.showModal(); 
            return;
        }

        const passwordData = {
            oldPassword : _oldPassword,
            newPassword : _newPassword
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify(passwordData)
        };


        fetch(`${serviceConfig.baseURL}/patient/change-password`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            localStorage.removeItem('token');
            this.props.history.push('/');
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
            promise.then(data => {
                this.setState({message:data.message})
                this.child.current.showModal(); 
            })    
        })

    }

    nextPath(path) {
        this.props.history.push(path);
    }

    showPassword(ref){
        ref.current.type = 'text';
    }

    hidePassword(ref){
        ref.current.type = 'password';
    }

    render(){
        const {_oldPassword, _newPassword, _repeatPassword} = this.state;

        return(
            <Container style={{marginTop:"5rem", width:"25rem"}}>
                <Card>
                    <Form onSubmit={this.handleSubmit}>
                        <Card.Header>
                            <Card.Title id="contained-Card-title-vcenter">
                                Change your password
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>
                                    Current password
                                </Form.Label>
                                <div style={{display:"flex"}}>
                                    <Form.Control
                                        required
                                        id="_oldPassword"
                                        value={_oldPassword} 
                                        type="password"
                                        placeholder="Current password"
                                        onChange = {this.handleChange}
                                        ref={this.oldPassword}
                                    />
                                    <Button 
                                        variant="outline-secondary"
                                        onMouseDown={this.showPassword.bind(this, this.oldPassword)} 
                                        onMouseUp={this.hidePassword.bind(this, this.oldPassword)} 
                                        onMouseLeave={this.hidePassword.bind(this, this.oldPassword)}
                                    >See</Button>
                                </div>
                            </Form.Group>
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
                        </Card.Body>
                        <Card.Footer style={{display:"flex", justifyContent:"flex-end"}}>
                            <Button variant="success" type="submit" size="sm" style={{marginRight:"3%"}}>Submit</Button>
                            <Button variant="danger" size="sm" onClick={() => this.nextPath('/patientProfile')}>Cancel</Button>
                        </Card.Footer>
                    </Form>
                </Card>

                <ModalAlert message={this.state.message} ref={this.child}/>
            </Container>
        );
    }
}
export default EditPatientPassword;