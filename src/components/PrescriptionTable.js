import React, { Component } from 'react';
import ClinicCentAdmin from './ClinicCentAdmin.js';
import {Container, Form, Col, Button, Table} from 'react-bootstrap';
import { serviceConfig } from '../appSettings';

class PrescriptionTable extends Component {
   constructor(props){
      super(props);
      this.state = {
         lista: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this); 
   }

   handleChange(e) {
      const { id, value } = e.target;
      this.setState({ [id]: value });
  }

  handleSubmit(e) {
      e.preventDefault();

      this.getRequests();
  }

  componentDidMount(){
      this.getPrescriptions();
  }

  getPrescriptions(){
      const token = JSON.parse(localStorage.getItem('token'));
      const requestOptions = {
         method: 'GET',
         headers: {
                     'Content-Type': 'application/json',
                     'Authorization' : `Bearer ${token.accessToken}`
      }
         //body: JSON.stringify(clinicRequest)
     };

     fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/getPrescriptions`, requestOptions)
        .then(response => {
            return response.json();
        })
        .then((data)=>{
           this.setState({lista : data});
           console.log(this.state.lista);
        })
      //   .catch(response=>{
      //      const promise = Promise.resolve(response.json());
      //      promise.then(data => {
      //         alert(data.messege);
      //      })
      //   })
  }
   
  renderTableData() {
   return this.state.lista.map((el, index) => {
      return (
         <tr key={el.id}>
            <td>{el.id}</td>
            <td>{el.medicine_list.code}</td>
            <td><Button variant="primary" onClick={()=> this.certify(el.id)} type="submit">Certify</Button></td>
         </tr>
      )
   })
}

   certify(id){
      console.log('certify')
      const token = JSON.parse(localStorage.getItem('token'));      
       const requestOptions ={
          method: 'POST',
          headers: {
                    'Content-Type': 'application/json', 
                    'Authorization' : `Bearer ${token.accessToken}`
                },
          body: JSON.stringify(id)
       };
       fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/certify`, requestOptions)
       .then(response => {
           if (!response.ok) {
               return Promise.reject(response);
           }
           window.location.href="/prescriptionTable";
           return response.statusText;
       })
      //  .then(() => {
      //      this.props.history.push('/clinicCentAdmin');
      //  })
      //  .catch(response => {
      //      return response.text();
      //  })

   }
   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
         <div className='center-text'>
            <h1>Prescription list</h1>
            <Table  striped bordered hover id='prescription'>
                 <tbody>
                    {this.renderTableData()}
                 </tbody>
               </Table>
         </div>
      )
   }
}

export default PrescriptionTable //exporting a component make it reusable and this is the beauty of react