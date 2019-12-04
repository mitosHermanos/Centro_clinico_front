import React, {Component} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import CheckupTypeSearchTable from './CheckupTypeSearchTable.js'
import {serviceConfig} from '../appSettings.js'

class CheckupTypeSearchPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            _searchText:'',
            _checkuptypes : [],
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

        fetch(`${serviceConfig.baseURL}/clinic/searchCheckupTypes/${_searchText}`, requestOptions)
        .then(response => {
            return response.json();   
        })
        .then((data) =>  {
            this.setState({_checkuptypes: data});
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
                    <h2>Search for checkup types</h2>
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
                                <Form.Label>Checkup types:</Form.Label>
                                <CheckupTypeSearchTable _checkuptypes={this.state._checkuptypes}/>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </div>
            </Container>
        );
    }
}
export default CheckupTypeSearchPage; 