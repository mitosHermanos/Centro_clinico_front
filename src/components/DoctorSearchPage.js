import React, {Component} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import DoctorsAverageRatingTable from './DoctorsAverageRatingTable.js'
import {serviceConfig} from '../appSettings.js'

class DoctorSearchPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            _searchText:'',
            _docrating : [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSearch(){
        const {_searchText} = this.state;
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`},
        }

        fetch(`${serviceConfig.baseURL}/clinic/searchDoctors/${_searchText}`, requestOptions)
        .then(response => {
            return response.json();   
        })
        .then((data) =>  {
            this.setState({_docrating: data});
            console.log(data);
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
            promise.then(data => {
                alert(data.message);
            })
        })

    }

    componentDidMount(){
        
    }

    render(){
        const {_searchText} = this.state;
        return(
            <Container>
                <div className='register-div'>
                    <h2>Search for doctors</h2>
                    <Form>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                                <Form.Control
                                    id="_searchText"
                                    value={_searchText}
                                    type="text"
                                    placeholder="Enter text here..."
                                    onChange={this.handleChange}
                                />
                                <Button variant="primary" onClick={this.handleSearch}>Search</Button>
                            </Form.Group>
                        </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                                <Form.Label>Doctors:</Form.Label>
                                <DoctorsAverageRatingTable docrating={this.state._docrating}/>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </div>
            </Container>
        );
    }
}
export default DoctorSearchPage; 