import React, {useState} from 'react';
import {Container, Form, Col, Button, Dropdown, Table, Checkbox, Select} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'

class PatientList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lista: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.onSelected = this.onSelected.bind(this);
    }
    componentDidMount(){
     
        this.getPatients();
        console.log(this.state.lista);
    }
    
    // renderTableData() {
    //     return this.state.lista.map((el, index) => {
    //        return (
    //           <tr key={el.id}>
    //              <td>{el.id}</td>
    //              <td>{el.email}</td>
    //              <td>{el.name}</td>
    //              <td>{el.surname}</td>
    //           </tr>
    //        )
    //     })
    // }

    renderTableData() {
        return this.state.lista.map((el, index) => {
           //const { id, name, surname, street, number, city, country, email } = person //destructuring
           return (
              <tr key={el.socialSecurityNumber}>
                 <td>{el.socialSecurityNumber}</td>
                 <td>{el.name}</td>
                 <td>{el.surname}</td>
                 <td>{el.street}</td>
                 <td>{el.streetNumber}</td>
                 <td>{el.city}</td>
                 <td>{el.country}</td>
                 <td>{el.email}</td>
                 <td>{el.phoneNumber}</td>
                 <td>{el.postcode}</td>
                 <td><Button variant="primary" onClick={()=> this.startCheckup(el.socialSecurityNumber)}>Start chekup</Button></td>
              </tr>
           )
        })
    }

    startCheckup(id){
        console.log('USAO');
        window.location.href='/reportDiagnosis/'+id;
    }
    

    getPatients(){
        const token = JSON.parse(localStorage.getItem('token'));
        const requestOptions = {
           method: 'GET',
           headers: {
                       'Content-Type': 'application/json',
                       'Authorization' : `Bearer ${token.accessToken}`
        }
           //body: JSON.stringify(clinicRequest)
       };
  
       fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/getPatients`, requestOptions)
          .then(response => {
              return response.json();
          })
          .then((data)=>{
             this.setState({lista : data});
            console.log(this.state.lista);
          })
          .catch(response=>{
             //const promise = Promise.resolve(response.json());
             //promise.then(data => {
              //  alert(data.messege);
             //})
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

    
    render(){
        const { _description } = this.state;
        
        return(
            <Container>
                <div className='diagnosis-div'>
                    <Form>
                        <div>
                            <Table  striped bordered hover id='person'>
                                <tbody>
                                    {this.renderTableData()}
                                </tbody>
                            </Table>
                        </div>
                    </Form>
                </div>
            </Container>
        );
        
    }

    
}

export default PatientList; 