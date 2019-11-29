import React, {Component} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'

function EditClinicProfile(){
    
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
                            
                            <Form.Group as={Col} md="6">
                                
                                <Form.Control as="select">
                                        <option>1. novembar</option>
                                        <option>2. januar</option>
                                    </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="primary">Add</Button>
                                
                                </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="secondary">Remove</Button>
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
                                <Button variant="primary">Add</Button>
                                
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
                            
                            <Form.Group as={Col} md="6">
                                
                                <Form.Control as="select">
                                        <option>Room 1</option>
                                        <option>Room 2</option>
                                    </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="primary">Add</Button>
                                
                                </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="secondary">Remove</Button>
                                </Form.Group>                       
                            </Form.Row>

                        <Form.Row>
                            <Form.Label>Checkup types</Form.Label>
                        </Form.Row>

                        <Form.Row>
                            
                            <Form.Group as={Col} md="6">
                                
                                <Form.Control as="select">
                                        <option>Checkup type 1</option>
                                        <option>Checkup type 2</option>
                                    </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="primary">Add</Button>
                                
                                </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label></Form.Label>
                                <Button variant="secondary">Remove</Button>
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
export default EditClinicProfile; 