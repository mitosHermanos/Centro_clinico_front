import React from 'react';
import {Card, Form, Col, Button, Container} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import ModalAlert from './ModalAlert.js'

class EditClinicAdminInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clinicAdmin: {
                name : "",
                surname : "",
                phoneNumber : "",
                street : "",
                streetNumber : "",
                city : "",
                postcode : "",
                country: "",
                message: ""
            }
        }
        this.child = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.getClinicAdminInfo();
    }
    
    getClinicAdminInfo(){
        const token = JSON.parse(localStorage.getItem('token'));
    
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            },
        };


        fetch(`${serviceConfig.baseURL}/clinicAdmin`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            this.setState({clinicAdmin : data});
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
            promise.then(data => {
                this.setState({message:data.message})
                this.child.current.showModal(); 
            })    
        })

    }

    handleChange(e) {
        const newClinicAdmin = this.state.clinicAdmin;
        newClinicAdmin[e.target.id] = e.target.value;
        this.setState({
          clinicAdmin: newClinicAdmin
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.editClinicAdminInfo();
    }

    editClinicAdminInfo(){
        const token = JSON.parse(localStorage.getItem('token'));
        const {clinicAdmin} = this.state;
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(clinicAdmin)
        };

        fetch(`${serviceConfig.baseURL}/clinicAdmin`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            this.props.history.push('/clinicAdminProfile');
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


    render(){
        const {name, surname, phoneNumber, street, streetNumber, city, postcode, country} = this.state.clinicAdmin;

        return(        
        <Container style={{marginTop:"5rem", width:"50rem"}}>
            <Card>
                <Form onSubmit = {this.handleSubmit}>
                <Card.Header>
                    <Card.Title id="contained-Card-title-vcenter">
                    Edit your information
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                id="name"
                                value={name}
                                type="text"
                                placeholder="Name"
                                onChange = {this.handleChange}
                            />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control
                                    required
                                    id="surname"
                                    value={surname}
                                    type="text"
                                    placeholder="Surname"
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    required
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    type="text"
                                    placeholder="Phone"
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="8">
                                    <Form.Label>Street name</Form.Label>
                                    <Form.Control
                                        required
                                        id="street"
                                        value={street}
                                        type="text"
                                        placeholder="Street name"
                                        onChange = {this.handleChange}
                                    />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Street number</Form.Label>
                                <Form.Control
                                    required
                                    id="streetNumber"
                                    value={streetNumber}
                                    type="text"
                                    placeholder="Street number"
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        required
                                        id="city"
                                        value={city}
                                        type="text"
                                        placeholder="City"
                                        onChange = {this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Postcode</Form.Label>
                                    <Form.Control
                                        required
                                        placeholder="Postcode"
                                        id="postcode"
                                        value={postcode}
                                        type="text"
                                        onChange = {this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        required
                                        id="country"
                                        value={country}
                                        type="text"
                                        placeholder="Country"
                                        onChange = {this.handleChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                </Card.Body>
                <Card.Footer style={{display:"flex", justifyContent:"flex-end"}}>
                    <Button variant="success" type="submit" style={{marginRight:"3%"}}>Submit</Button>
                    <Button variant="danger" onClick={() => this.nextPath('/clinicAdminProfile') }>Cancel</Button>
                </Card.Footer>
                </Form>
            </Card>

            <ModalAlert message={this.state.message} ref={this.child}/>
        </Container>
        );
    }
}
export default EditClinicAdminInfo;