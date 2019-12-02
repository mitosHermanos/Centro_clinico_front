import React, {Component} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'

class EditClinicProfile extends React.Component{

        constructor(props){
            super(props);
            this.state = {
                _newCheckupDate : '',
                _newRoomName: '',
                _newCheckupType: '',
                _checkupDates : [
                    {date: 'Zogatinela'},
                    {date: 'Veca zogatinela'}
                ],
            };
            this.handleAddDate = this.handleAddDate.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleAddDoctor = this.handleAddDoctor.bind(this);
            this.handleAddType = this.handleAddType.bind(this);
            this.handleAddRoom = this.handleAddRoom.bind(this);
        }

        handleChange(e) {
            const { id, value } = e.target;
            this.setState({ [id]: value });
        }

        handleAddType(){
            const {_newCheckupType} = this.state;

            const checkupTypeRequest = {
                date : _newCheckupType,
            }

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(checkupTypeRequest)
            };

            fetch(`${serviceConfig.baseURL}/clinic/addCheckupType/1`, requestOptions)
            .then(response => {
                if(!response.ok){
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(() => {
                this.props.history.push('/editClinicProfile');
            })
            .catch(response => {
                const promise = Promise.resolve(response.json());
                promise.then(data => {
                    alert(data.message);
                })
            })
        }

        handleAddRoom(){
            const {_newRoomName} = this.state;

            const roomRequest = {
                name : _newRoomName,
            }

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(roomRequest)
            };

            fetch(`${serviceConfig.baseURL}/clinic/addRoom/1`, requestOptions)
            .then(response => {
                if(!response.ok){
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(() => {
                this.props.history.push('/editClinicProfile');
            })
            .catch(response => {
                const promise = Promise.resolve(response.json());
                promise.then(data => {
                    alert(data.message);
                })
            })
        }

        handleAddDate(){

            const {_newCheckupDate} = this.state;

            const checkupDateRequest = {
                date : _newCheckupDate,
            }

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(checkupDateRequest)
            };

            fetch(`${serviceConfig.baseURL}/clinic/addCheckupDate/1`, requestOptions)
            .then(response => {
                if(!response.ok){
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(() => {
                this.props.history.push('/editClinicProfile');
            })
            .catch(response => {
                const promise = Promise.resolve(response.json());
                promise.then(data => {
                    alert(data.message);
                })
            })
        }

        handleAddDoctor(){
            this.props.history.push('/registerDoctor');
        }

        render(){
        const {_newCheckupDate, _checkupDates, _newRoomName, _newCheckupType} = this.state;
        return(
            <Container>
                <div className='register-div'>
                    <h2>Edit profile of the clinic</h2>
                    <Form>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                                <Form.Label>Clinic name</Form.Label>
                                <Form.Control
                                    required
                                    id="name"
                                    type="text"
                                    placeholder="Clinic name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    id="description"
                                    type="text"
                                    placeholder="Description"
                                />
                            </Form.Group>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label>Free checkup dates</Form.Label>
                        </Form.Row>

                        <Form.Row>
                            
                            <Form.Group as={Col} md="4">
                                
                                <Form.Control as="select">
                                        {_checkupDates.map((e, key) => {
                                            return <option key={key} value={e.date}>{e.date}</option>;
                                        })}
                                    </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="secondary" onClick={this.handleRemoveDate}>Remove</Button>
                                </Form.Group>  

                            <Form.Group as={Col} md="4">
                                <Form.Control
                                    id="_newCheckupDate"
                                    value={_newCheckupDate}
                                    type="text"
                                    placeholder="NewCheckupDate"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="primary" onClick={this.handleAddDate}>Add</Button>
                                
                                </Form.Group>
                                                 
                            </Form.Row>

                        <Form.Row>
                            <Form.Label>Doctors list</Form.Label>
                        </Form.Row>

                        <Form.Row>
                            
                            <Form.Group as={Col} md="6">
                                
                                <Form.Control as="select">
                                        <option>Doca Prvi</option>
                                        <option>Doca Drugi</option>
                                    </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="primary" onClick={this.handleAddDoctor}>Add</Button>
                                
                                </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="secondary">Remove</Button>
                                </Form.Group>                       
                            </Form.Row>
                        
                        <Form.Row>
                            <Form.Label>Rooms list</Form.Label>
                        </Form.Row>

                        <Form.Row>
                            
                            <Form.Group as={Col} md="4">
                                
                                <Form.Control as="select">
                                        <option>Room 1</option>
                                        <option>Room 2</option>
                                    </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="secondary">Remove</Button>
                                </Form.Group> 
                            
                            <Form.Group as={Col} md="4">
                                <Form.Control
                                    id="_newRoomName"
                                    value={_newRoomName}
                                    type="text"
                                    placeholder="NewRoomName"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="primary" onClick={this.handleAddRoom}>Add</Button>
                                
                                </Form.Group>
                                                  
                            </Form.Row>

                        <Form.Row>
                            <Form.Label>Checkup types</Form.Label>
                        </Form.Row>

                        <Form.Row>
                            
                            <Form.Group as={Col} md="4">
                                
                                <Form.Control as="select">
                                        <option>Checkup type 1</option>
                                        <option>Checkup type 2</option>
                                    </Form.Control>
                            </Form.Group>
                            
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="secondary">Remove</Button>
                                </Form.Group>  

                            <Form.Group as={Col} md="4">
                                <Form.Control
                                    id="_newCheckupType"
                                    value={_newCheckupType}
                                    type="text"
                                    placeholder="NewCheckupType"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="primary" onClick={this.handleAddType}>Add</Button>
                                
                                </Form.Group>
                                                 
                            </Form.Row>
                        
                        <Form.Row>
                        <Form.Group as={Col} md="8">
                                <Form.Label>Street name</Form.Label>
                                <Form.Control
                                    required
                                    id="street"
                                    type="text"
                                    placeholder="Street name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Street number</Form.Label>
                                <Form.Control
                                    required
                                    id="number"
                                    type="text"
                                    placeholder="Street number"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    required
                                    id="city"
                                    type="text"
                                    placeholder="City"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control
                                    required
                                    id="postcode"
                                    type="text"
                                    placeholder="Postcode"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    required
                                    id="country"
                                    type="text"
                                    placeholder="Country"
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
export default EditClinicProfile; 