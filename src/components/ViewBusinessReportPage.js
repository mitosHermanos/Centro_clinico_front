import React, {Component} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import DoctorsAverageRatingTable from './DoctorsAverageRatingTable.js'


class ViewBusinessReportPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            docrating :[
                {id: 1, name: 'Doca', surname: 'Prvi', avgrating : 3},
                {id: 2, name: 'Doca', surname: 'Drugi', avgrating : 4}
            ]
        }
    }

    render(){
        return(
            <Container>
                <div className='register-div'>
                    <h2>Clinic Business Report</h2>
                    <Form>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                                <Form.Label>Clinics average rating:</Form.Label>
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue="-display avg rating here-"
                                />
                            </Form.Group>
                        </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                                <Form.Label>Doctors average rating:</Form.Label>
                                <DoctorsAverageRatingTable docrating={this.state.docrating}/>
                            </Form.Group>
                        </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Clinic income:</Form.Label>
                            <Form.Control
                                plaintext
                                readOnly
                                defaultValue="-display clinics income here-"
                            />
                        </Form.Group>

                    </Form.Row>
                        <div className="text-center">
                                <Button variant="primary" type="submit">
                                    Ok
                                </Button>
                        </div>
                    </Form>
                </div>
            </Container>
        );
    }
}
export default ViewBusinessReportPage; 