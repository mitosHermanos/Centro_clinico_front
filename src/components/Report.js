import React, {useState} from 'react';
import {Container, Form, Col, Button, Dropdown} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'

class Report extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.lista);
        this.state = {
            _description: '', 
            displayMenu: false,
            _lista: this.props.lista
        };
        console.log(this.state._lista);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    }

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
        });
    }
    
    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
          document.removeEventListener('click', this.hideDropdownMenu);
        });
    
    }
    

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.enter();

    }

    enter(){
        
        const {_description} = this.state;
        const patientRequest = {
            description: _description
        }
        const token = JSON.parse(localStorage.getItem('token'));
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${token.accessToken}`
        },
            body: JSON.stringify(patientRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/addDiagnosis`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.statusText;
        })
        // .then(() => {
        //     this.props.history.push('/');
        // })
        // .catch(response => {
        //     return response.text();
        // })
        // .then((message) => {
        //     alert(message);
        // });
    }
    iterateTrough(){
        return this.props.lista.map((el, index) =>{
            return(
                <li>el.code</li>
            )
        })
    }
    render(){
        const { _description } = this.state;
        
        return(
            <Container>
                <div className='diagnosis-div'>
                    <h2>Define diagnosis</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                        <Form.Group as={Col} md="6">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    id="_description"
                                    type="text"
                                    value={_description}
                                    placeholder="Description"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Row>
                        <div  className="dropdown" style = {{background:"white",width:"200px"}} >
         <div className="button" onClick={this.showDropdownMenu}>Select diagnosis </div>

          { this.state.displayMenu ? (
          <ul>
              {this.iterateTrough()}
         {/* <li><a className="active" href="#Create Page">Create Page</a></li>
         <li><a href="#Manage Pages">Manage Pages</a></li>
         <li><a href="#Create Ads">Create Ads</a></li>
         <li><a href="#Manage Ads">Manage Ads</a></li>
         <li><a href="#Activity Logs">Activity Logs</a></li>
         <li><a href="#Setting">Setting</a></li>
         <li><a href="#Log Out">Log Out</a></li> */}
          </ul>
        ):
        (
          null
        )
        }

       </div>
                            {/* <Dropdown
                                title="Select diagnosis"
                                list={this.props.lista}
                                //toggleItem={this.toggleSelected}
                            /> */}
                        </Form.Row>
                        {/* <div>
                            <Button variant="primary" onClick={()=> this.setShowing()}>Show</Button>
                            
                        </div> */}
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

    
}

export default Report; 