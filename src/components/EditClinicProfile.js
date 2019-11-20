import React, {useState} from 'react';
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
                    <Form.Group as={Col} md="4">
                            <Form.Label>Free checkup dates</Form.Label>
                            <Form.Control
                                required
                                id="freeCheckupDates"
                                type="text"
                                placeholder="Free checkup dates"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>List of doctors</Form.Label>
                            <Form.Control
                                required
                                id="doctorsList"
                                type="text"
                                placeholder="List of doctors"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>List of rooms</Form.Label>
                            <Form.Control
                                required
                                id="roomsList"
                                type="text"
                                placeholder="List of rooms"
                            />
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