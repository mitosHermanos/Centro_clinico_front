import React, {useState} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'

function EditClinicAdminProfile(){

    return(
        <Container>
            <div className='register-div'>
                <h2>Edit clinic administrator profile</h2>
                <Form>
                <Form.Row>
                    <Form.Group as={Col} md="6">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                id="email"
                                type="email"
                                placeholder="Email"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Social security number</Form.Label>
                            <Form.Control
                                required
                                id="socialSecurityNumber"
                                type="text"
                                placeholder="Social security number"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} md="6">
                            <Form.Label>Old password</Form.Label>
                            <Form.Control
                                required
                                id="oldPassword"
                                type="password"
                                placeholder="Old password"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                required
                                id="new Password"
                                type="password"
                                placeholder="New password"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} md="4">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                id="name"
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                required
                                id="surname"
                                type="text"
                                placeholder="Surname"
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
export default EditClinicAdminProfile; 