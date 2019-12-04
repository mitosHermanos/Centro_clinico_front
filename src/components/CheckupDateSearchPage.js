import React, {Component} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import CheckupDateSearchTable from './CheckupDateSearchTable.js'
import {serviceConfig} from '../appSettings.js'

class CheckupDateSearchPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            _searchText:'',
            _checkupdates : [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSearch(e){
        e.preventDefault();
        const {_searchText} = this.state;
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`},
        }

        fetch(`${serviceConfig.baseURL}/clinic/searchCheckupDates/${_searchText}`, requestOptions)
        .then(response => {
            return response.json();   
        })
        .then((data) =>  {
            this.setState({_checkupdates: data});
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
                    <h2>Search for checkup dates</h2>
                    <Form onSubmit={this.handleSearch}>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                                <Form.Control
                                    id="_searchText"
                                    value={_searchText}
                                    type="text"
                                    placeholder="Enter text here..."
                                    onChange={this.handleChange}
                                />
                                <Button variant="primary" type="submit">Search</Button>
                            </Form.Group>
                        </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                                <Form.Label>Checkup dates:</Form.Label>
                                <CheckupDateSearchTable _checkupdates={this.state._checkupdates}/>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </div>
            </Container>
        );
    }
}
export default CheckupDateSearchPage; 