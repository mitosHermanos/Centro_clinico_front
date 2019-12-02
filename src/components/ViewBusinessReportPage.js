import React, {Component} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import DoctorsAverageRatingTable from './DoctorsAverageRatingTable.js'
import {serviceConfig} from '../appSettings.js'

class ViewBusinessReportPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            docrating : [],
        }
    }


    componentDidMount(){
        fetch(`${serviceConfig.baseURL}/viewBusinessReport/1`, {
            method: 'GET', 
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(parsedJSON =>  console.log(parsedJSON.results))
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