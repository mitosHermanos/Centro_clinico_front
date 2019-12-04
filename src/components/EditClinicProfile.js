import React, {Component} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap';
import {serviceConfig} from '../appSettings.js';
import ReactDOM from 'react-dom';

class EditClinicProfile extends React.Component{

        constructor(props){
            super(props);
            this.state = {
                _newCheckupDate : '',
                _newRoomName: '',
                _newCheckupType: '',
                _checkupDates : [],
                _checkupTypes : [],
                _rooms : [],
                _doctors: [],
                _clinic: [],
                _selectedCheckupDate: '',
                _selectedCheckupType: '',
                _selectedRoom: '',
                _selectedDoctor: '',

                _name: '',
                _description: '',
                _street: '',
                _number: '',
                _city: '',
                _postcode: '',
                _country: '',
            };
            this.handleSubmit = this.handleSubmit.bind(this);

            this.handleAddDate = this.handleAddDate.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleAddDoctor = this.handleAddDoctor.bind(this);
            this.handleAddType = this.handleAddType.bind(this);
            this.handleAddRoom = this.handleAddRoom.bind(this);

            this.handleRemoveDate = this.handleRemoveDate.bind(this);
            this.handleRemoveType = this.handleRemoveType.bind(this);
            this.handleRemoveRoom = this.handleRemoveRoom.bind(this);
            this.handleRemoveDoctor = this.handleRemoveDoctor.bind(this);
        }

        componentDidMount(){
            const token = JSON.parse(localStorage.getItem('token'));

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token.accessToken}`},
            }

            fetch(`${serviceConfig.baseURL}/clinic/getCheckupDates`, requestOptions)
            .then(response => {
                return response.json();   
            })
            .then((data) =>  {
                this.setState({_checkupDates: data});  
            })
            .catch(response => {
                // const promise = Promise.resolve(response.json());
                // promise.then(data => {
                //     alert(data.message);
                // })
            })

            fetch(`${serviceConfig.baseURL}/clinic/getCheckupTypes`, requestOptions)
            .then(response => {
                return response.json();   
            })
            .then((data) =>  {
                this.setState({_checkupTypes: data});  
            })
            .catch(response => {
                // const promise = Promise.resolve(response.json());
                // promise.then(data => {
                //     alert(data.message);
                // })
            })

            fetch(`${serviceConfig.baseURL}/clinic/getRooms`, requestOptions)
            .then(response => {
                return response.json();   
            })
            .then((data) =>  {
                this.setState({_rooms: data});  
            })
            .catch(response => {
                // const promise = Promise.resolve(response.json());
                // promise.then(data => {
                //     alert(data.message);
                // })
            })

            fetch(`${serviceConfig.baseURL}/clinic/getDoctors`, requestOptions)
            .then(response => {
                return response.json();   
            })
            .then((data) =>  {
                this.setState({_doctors: data});  
            })
            .catch(response => {
                // const promise = Promise.resolve(response.json());
                // promise.then(data => {
                //     alert(data.message);
                // })
            })
            if(this.state._name.length == 0){
                fetch(`${serviceConfig.baseURL}/clinic/getClinic`, requestOptions)
                .then(response => {
                    return response.json();   
                })
                .then((data) =>  {
                    console.log(data);
                    this.setState({_clinic: data});
                    this.setState({
                        _name: this.state._clinic.name,
                        _description: this.state._clinic.description,
                        _street: this.state._clinic.street,
                        _number: this.state._clinic.number,
                        _city: this.state._clinic.city,
                        _postcode: this.state._clinic.postcode,
                        _country: this.state._clinic.country,
                    })
                })
                .catch(response => {
                    // const promise = Promise.resolve(response.json());
                    // promise.then(data => {
                    //     alert(data.message);
                    // })
                })
            }

        }

        handleSubmit(){
            const token = JSON.parse(localStorage.getItem('token'));

            const {_name,_description,_street,_number,_city,_postcode,_country} = this.state;

            const editClinicRequest = {
                name : _name,
                description : _description,
                street : _street,
                number : _number,
                city : _city,
                postcode : _postcode,
                country : _country,
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token.accessToken}`,
                },
                body: JSON.stringify(editClinicRequest)
            };

            fetch(`${serviceConfig.baseURL}/clinic/editClinic`, requestOptions)
            .then(response => {
                if(!response.ok){
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(() => {
                this.componentDidMount();
            })
            .catch(response => {
                const promise = Promise.resolve(response.json());
                promise.then(data => {
                    alert(data.message);
                })
            })
        }

        handleChange(e) {
            const { id, value } = e.target;
            this.setState({ [id]: value });
        }

        handleAddType(){
            const token = JSON.parse(localStorage.getItem('token'));

            const {_newCheckupType} = this.state;

            const checkupTypeRequest = {
                name : _newCheckupType,
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token.accessToken}`,
                },
                body: JSON.stringify(checkupTypeRequest)
            };

            fetch(`${serviceConfig.baseURL}/clinic/addCheckupType`, requestOptions)
            .then(response => {
                if(!response.ok){
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(() => {
                this.componentDidMount();
            })
            .catch(response => {
                const promise = Promise.resolve(response.json());
                promise.then(data => {
                    alert(data.message);
                })
            })
        }

        handleAddRoom(){
            const token = JSON.parse(localStorage.getItem('token'));
            const {_newRoomName} = this.state;

            const roomRequest = {
                name : _newRoomName,
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token.accessToken}`,
                },
                body: JSON.stringify(roomRequest)
            };

            fetch(`${serviceConfig.baseURL}/clinic/addRoom`, requestOptions)
            .then(response => {
                if(!response.ok){
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(() => {
                this.componentDidMount();
            })
            .catch(response => {
                const promise = Promise.resolve(response.json());
                promise.then(data => {
                    alert(data.message);
                })
            })
        }

        handleAddDate(){
            const token = JSON.parse(localStorage.getItem('token'));
            const {_newCheckupDate} = this.state;

            const checkupDateRequest = {
                date : _newCheckupDate,
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token.accessToken}`,
                },
                body: JSON.stringify(checkupDateRequest)
            };

            fetch(`${serviceConfig.baseURL}/clinic/addCheckupDate`, requestOptions)
            .then(response => {
                if(!response.ok){
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(() => {
                this.componentDidMount();
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

        handleRemoveDate(){
            const token = JSON.parse(localStorage.getItem('token'));

            const checkupDateRequest = {
                id : ReactDOM.findDOMNode(this.refs._selectedCheckupDate).value,
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token.accessToken}`,
                },
                body: JSON.stringify(checkupDateRequest)
            };

            fetch(`${serviceConfig.baseURL}/clinic/removeCheckupDate`, requestOptions)
            .then(response => {
                if(!response.ok){
                    
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(() => {
                this.componentDidMount();
            })
            .catch(response => {
                const promise = Promise.resolve(response.json());
                promise.then(data => {
                    alert(data.message);
                })
            })
        }

        handleRemoveType(){
            const token = JSON.parse(localStorage.getItem('token'));

            const checkupDateRequest = {
                id : ReactDOM.findDOMNode(this.refs._selectedCheckupType).value,
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token.accessToken}`,
                },
                body: JSON.stringify(checkupDateRequest)
            };

            fetch(`${serviceConfig.baseURL}/clinic/removeCheckupType`, requestOptions)
            .then(response => {
                if(!response.ok){
                    
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(() => {
                this.componentDidMount();
            })
            .catch(response => {
                const promise = Promise.resolve(response.json());
                promise.then(data => {
                    alert(data.message);
                })
            })
        }

        handleRemoveRoom(){
            const token = JSON.parse(localStorage.getItem('token'));

            const checkupDateRequest = {
                id : ReactDOM.findDOMNode(this.refs._selectedRoom).value,
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token.accessToken}`,
                },
                body: JSON.stringify(checkupDateRequest)
            };

            fetch(`${serviceConfig.baseURL}/clinic/removeRoom`, requestOptions)
            .then(response => {
                if(!response.ok){
                    
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(() => {
                this.componentDidMount();
            })
            .catch(response => {
                const promise = Promise.resolve(response.json());
                promise.then(data => {
                    alert(data.message);
                })
            })
        }

        handleRemoveDoctor(){
            const token = JSON.parse(localStorage.getItem('token'));

            const checkupDateRequest = {
                id : ReactDOM.findDOMNode(this.refs._selectedDoctor).value,
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token.accessToken}`,
                },
                body: JSON.stringify(checkupDateRequest)
            };

            fetch(`${serviceConfig.baseURL}/clinic/removeDoctor`, requestOptions)
            .then(response => {
                if(!response.ok){
                    
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(() => {
                this.componentDidMount();
            })
            .catch(response => {
                const promise = Promise.resolve(response.json());
                promise.then(data => {
                    alert(data.message);
                })
            })
        }

        render(){
        const {_newCheckupDate, _checkupDates, _checkupTypes, _rooms, _doctors, _newRoomName, _newCheckupType, _clinic, _name, _description, _street, _number, _city, _postcode, _country} = this.state;
        return(
            <Container>
                <div className='register-div'>
                    <h2>Edit profile of the clinic</h2>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                                <Form.Label>Clinic name</Form.Label>
                                <Form.Control
                                    required
                                    id="_name"
                                    type="text"
                                    placeholder="Clinic name"
                                    value={_name}
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    id="_description"
                                    type="text"
                                    placeholder="Description"
                                    value = {_description}
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label>Free checkup dates</Form.Label>
                        </Form.Row>

                        <Form.Row>
                            
                            <Form.Group as={Col} md="4">
                                
                                <Form.Control as="select" ref='_selectedCheckupDate'>
                                        {_checkupDates.map((e, key) => {
                                            return <option key={key} value={e.id}>{e.date}</option>;
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
                                
                                <Form.Control as="select" ref='_selectedDoctor'>
                                    {_doctors.map((e, key) => {
                                            return <option key={key} value={e.id}>{e.name} {e.surname}</option>;
                                        })}
                                    </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="primary" onClick={this.handleAddDoctor}>Add</Button>
                                
                                </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="secondary" onClick={this.handleRemoveDoctor}>Remove</Button>
                                </Form.Group>                       
                            </Form.Row>
                        
                        <Form.Row>
                            <Form.Label>Rooms list</Form.Label>
                        </Form.Row>

                        <Form.Row>
                            
                            <Form.Group as={Col} md="4">
                                
                                <Form.Control as="select" ref='_selectedRoom'>
                                    {_rooms.map((e, key) => {
                                            return <option key={key} value={e.id}>{e.name}</option>;
                                        })}
                                    </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="secondary" onClick={this.handleRemoveRoom}>Remove</Button>
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
                                
                                <Form.Control as="select" ref='_selectedCheckupType'>
                                        {_checkupTypes.map((e, key) => {
                                            return <option key={key} value={e.id}>{e.name}</option>;
                                        })}
                                    </Form.Control>
                            </Form.Group>
                            
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="secondary" onClick={this.handleRemoveType}>Remove</Button>
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
                                    id="_street"
                                    type="text"
                                    placeholder="Street name"
                                    defaultValue = {_clinic.street}
                                    value = {_street}
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Street number</Form.Label>
                                <Form.Control
                                    required
                                    id="_number"
                                    type="text"
                                    placeholder="Street number"
                                    value = {_number}
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    required
                                    id="_city"
                                    type="text"
                                    placeholder="City"
                                    value = {_city}
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control
                                    required
                                    id="_postcode"
                                    type="text"
                                    placeholder="Postcode"
                                    value = {_postcode}
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    required
                                    id="_country"
                                    type="text"
                                    placeholder="Country"
                                    value = {_country}
                                    onChange = {this.handleChange}
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