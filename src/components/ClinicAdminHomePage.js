import React, {Component} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'

class ClinicAdminHomePage extends Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleEditClinicPage = this.handleEditClinicPage.bind(this);
        this.handleSearchCheckupDates = this.handleSearchCheckupDates.bind(this);
        this.handleSearchCheckupTypes = this.handleSearchCheckupTypes.bind(this);
        this.handleSearchDoctors = this.handleSearchDoctors.bind(this);
        this.handleSearchRooms = this.handleSearchRooms.bind(this);
    }

    componentDidMount(){
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleEditClinicPage(){
        this.props.history.push('/editClinicProfile');
    }

    handleSearchCheckupDates(){
        this.props.history.push('/searchCheckupDates');
    }
    handleSearchCheckupTypes(){
        this.props.history.push('/searchCheckupTypes');
    }
    handleSearchRooms(){
        this.props.history.push('/searchRooms');
    }
    handleSearchDoctors(){
        this.props.history.push('/searchDoctors');
    }


    render(){
        return(
            <Container>
                <div className='register-div'>
                    <h2>Clinic admin home page</h2>
                    <Form>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                            <Button variant="primary" onClick={this.handleEditClinicPage}>Edit Clinic Profile</Button>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                            <Button variant="primary" onClick={this.handleSearchRooms}>Search rooms</Button>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                            <Button variant="primary" onClick={this.handleSearchDoctors}>Search doctors</Button>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                            <Button variant="primary" onClick={this.handleSearchCheckupTypes}>Search checkup types</Button>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                            <Button variant="primary" onClick={this.handleSearchCheckupDates}>Search checkup dates</Button>
                        </Form.Group>
                    </Form.Row>
                    </Form>
                </div>
            </Container>
        );
    }
}
export default ClinicAdminHomePage; 