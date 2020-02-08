import React, {Component} from 'react';
import {Container, Form, Col, Button, InputGroup} from 'react-bootstrap';
import {serviceConfig} from '../appSettings.js';
import ReactDOM from 'react-dom';
import ModalAlert from './ModalAlert.js'
import Header from './Header.js'


class AbsenceRequestPage extends React.Component{

        constructor(props){
            super(props);
            this.state = {
                _startDate :'',
                _endDate :'',
            };

            this.child = React.createRef();
            this.startDateRef = React.createRef();
            this.endDateRef = React.createRef();
            
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        componentDidMount(){
           
        }

        handleSubmit(e){
            e.preventDefault();
            const token = JSON.parse(localStorage.getItem('token'));

            const {_startDate, _endDate} = this.state;

            const createAbsenceRequest = {
                startDate : _startDate,
                endDate : _endDate,
                type : ReactDOM.findDOMNode(this.refs._type).value 
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token.accessToken}`,
                },
                body: JSON.stringify(createAbsenceRequest)
            };

            fetch(`${serviceConfig.baseURL}/clinic/createAbsenceRequest`, requestOptions)
            .then(response => {
                if(!response.ok){
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(() => {
                this.componentDidMount();
                this.setState({message:"Absence request successfully created!"})
                this.child.current.showModal(); 
            })
            .catch(response => {
                const promise = Promise.resolve(response.json());
                promise.then(data => {
                    
                    this.setState({message:"Something went wrong, please try again..."})
                    this.child.current.showModal(); 
                })
            })
        }

        handleChange(e) {
            const { id, value } = e.target;
            this.setState({ [id]: value });
        }


        render(){
        const {_startDate, _endDate} = this.state;
        return(
            <div>
            <Header/>
            <Container>
                <div className='register-div'>
                    <h2>Create absence request</h2>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                    <Form.Group as={Col} md="6">
                        <InputGroup style={{marginTop:'3%'}}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Start date: </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            required
                            ref={this.startDateRef}
                            value={_startDate}
                            type="date"
                            onChange = {e => this.setState({_startDate : e.target.value})}
                        />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <InputGroup style={{marginTop:'3%'}}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>End date: </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            required
                            ref={this.endDateRef}
                            value={_endDate}
                            type="date"
                            onChange = {e => this.setState({_endDate : e.target.value})}
                        />
                        </InputGroup>
                    </Form.Group>
                    <Form.Control as="select" ref='_type'>
                        <option key="1" value="absence">Absence</option>
                        <option key="2" value="vacation">Vacation</option>
                    </Form.Control>
                    </Form.Row>
                    <div className="text-center">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                    </div>
                    </Form>
                </div>
                <ModalAlert message={this.state.message} ref={this.child}/>
            </Container>
            </div>
        );
        }
    
}
export default AbsenceRequestPage; 