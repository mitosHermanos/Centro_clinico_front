import React, { Component } from 'react';
import ClinicCentAdmin from './ClinicCentAdmin.js';
import {Container, Form, Col, Button, Table} from 'react-bootstrap';
import { serviceConfig } from '../appSettings';

var list;

class ReportDiagnosis extends Component {
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

      this.getDiagnosis();
  }

  componentDidMount(){
     this.getDiagnosis();
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
           this.setState({lista : data});
           console.log(this.state.lista);
        })
        .catch(response=>{
           const promise = Promise.resolve(response.json());
           promise.then(data => {
              alert(data.messege);
           })
        })
  }
   

   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
         <div className='center-text'>
            <h1>Pending registrations</h1>
            <AddToReportDiag lista = {this.state.lista}/>
         </div>
      )
   }
}

export default CCPerson //exporting a component make it reusable and this is the beauty of react