import React, {useState} from 'react';
import {Container, Form, Col, Button, Dropdown, Table, Checkbox, Select} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'

class Report extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listaDijagnoza: [],
            listaMedikamenata: [],
            recept: [ ],
            dijagnoza: null,
            _description: '', 
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        //this.onSelected = this.onSelected.bind(this);
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
    componentDidMount(){
        this.getDiagnosis();
        this.getMedicine();
    }
    
    renderDropdown(){
        return this.state.listaDijagnoza.map((el, index)=>{
            return(
                <option 
                    key={el.code}
                    value={el.code}
                >
                    {el.code}
                </option>
            )
        })
    }
    renderTableData() {
        return this.state.listaMedikamenata.map((el, index) => {
           return (
              <tr key={el.code}>
                 <td>{el.code}</td>
                 <td>{el.description}</td>
                 <td><input type='checkbox' value={el.code} onChange={e => this.onChecked(e)}/></td>
              </tr>
           )
        })
    }
    onSelected(e){
        let isSelected = e.target.value;
        console.log(isSelected);
        this.state.listaDijagnoza.map((el, index)=>{
            if(el.code === isSelected){
                this.state.dijagnoza = el;
            }
        })
        console.log(this.state.dijagnoza);
    }
    onChecked(e){
        let isChecked = e.target.value;
        console.log(isChecked);
        this.state.listaMedikamenata.map((el, index)=>{
            if(el.code === isChecked){
                this.state.recept.push(el);
            }
        })
        console.log(this.state.recept);
    }

    getDiagnosis(){
        const token = JSON.parse(localStorage.getItem('token'));
        const requestOptions = {
           method: 'GET',
           headers: {
                       'Content-Type': 'application/json',
                       'Authorization' : `Bearer ${token.accessToken}`
        }
           //body: JSON.stringify(clinicRequest)
       };
  
       fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/getDiagnosis`, requestOptions)
          .then(response => {
              return response.json();
          })
          .then((data)=>{
             this.setState({listaDijagnoza : data});
             console.log(this.state.lista);
          })
          .catch(response=>{
             const promise = Promise.resolve(response.json());
             promise.then(data => {
                alert(data.messege);
             })
          })
    }

    getMedicine(){
        const token = JSON.parse(localStorage.getItem('token'));
        const requestOptions = {
           method: 'GET',
           headers: {
                       'Content-Type': 'application/json',
                       'Authorization' : `Bearer ${token.accessToken}`
        }
           //body: JSON.stringify(clinicRequest)
       };
  
       fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/getMedicines`, requestOptions)
          .then(response => {
              return response.json();
          })
          .then((data)=>{
             this.setState({listaMedikamenata : data});
             console.log(this.state.lista);
          })
          .catch(response=>{
             const promise = Promise.resolve(response.json());
             promise.then(data => {
                alert(data.messege);
             })
          })
    }
    

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.recept.length > 0){
            console.log('enterd if');
            this.sendPrescription();
        }
        else{
            this.sendCheckup();
        }
    }

    sendCheckup(){
        
        const {_description} = this.state;
       
        const checkupRequest = {
            description: _description,
            diagnosis: this.state.dijagnoza,
        }
        const token = JSON.parse(localStorage.getItem('token'));
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${token.accessToken}`
        },
            body: JSON.stringify(checkupRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/doCheckup/${this.props.match.params.id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            console.log('chackup made');
            return response.statusText;
        })
    }

    sendPrescription(){
        
        console.log(this.state.recept);
        const prescriptionRequest = {
            medicine_list: this.state.recept,
            certified: false,
            byWho: null,
        }
        
        const token = JSON.parse(localStorage.getItem('token'));
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${token.accessToken}`
        },
            body: JSON.stringify(prescriptionRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/makePrescription`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            console.log('prescription made');
            this.sendCheckup();
            return response.statusText;
        })
    }
//--------------------------------------------------------------------------------------------------------------------

    enter(){
        
        const {_description} = this.state;
        let _prescription = null;
        
        if(this.state.recept.length > 0){
            _prescription = {
                medicine_list: this.state.recept,
                certified: false,
                byWho: ''
            }
        }
       
        const checkupRequest = {
            description: _description,
            diagnosis: this.state.dijagnoza,
            prescription: _prescription
        }
        const token = JSON.parse(localStorage.getItem('token'));
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${token.accessToken}`
        },
            body: JSON.stringify(checkupRequest)
        };

        fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/doCheckup`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            console.log('ok');
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

    medRecord(id){
        window.location.href='/medicalRecord/'+id;
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
                        <div>
                            <Table  striped bordered hover id='person'>
                                <tbody>
                                    {this.renderTableData()}
                                </tbody>
                            </Table>
                        </div>
                        <div>
                        <Form.Group as={Col} md="4">
                                
                                <Form.Control as="select" onChange={e => this.onSelected(e)}>
                                        {this.state.listaDijagnoza.map((e, key) => {
                                            return <option key={key} value={e.code}>{e.code}</option>;
                                        })}
                                    </Form.Control>
                            </Form.Group>
                        </div>
                        
                        <div className="text-center">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                        </div>
                    </Form>
                    <Button variant="primary" onClick={()=> this.medRecord(this.props.match.params.id)}>Medical record</Button>
                </div>
            </Container>
        );
        
    }

    
}

export default Report; 