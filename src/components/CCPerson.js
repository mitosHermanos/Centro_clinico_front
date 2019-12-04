import React, { Component } from 'react';
import ClinicCentAdmin from './ClinicCentAdmin.js';
import {Container, Form, Col, Button, Table} from 'react-bootstrap';
import { serviceConfig } from '../appSettings';

var list;

class CCPerson extends Component {
   /*constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         person: [
            { id: 1, name: 'Wasif', surname: 'Lukac', street: 'Wakawaka', number: 3, city: 'BagaBaga', country: 'Hracka', email: 'wasif@email.com' },
            { id: 2, name: 'Ali', surname: 'Stojanov', street: 'Wakawaka', number: 3, city: 'BagaBaga', country: 'Hracka', email: 'ali@email.com' },
            { id: 3, name: 'Saad', surname: 'Garic', street: 'Wakawaka', number: 3, city: 'BagaBaga', country: 'Hracka', email: 'saad@email.com' },
            { id: 4, name: 'Asad', surname: 'Ca', street: 'Wakawaka', number: 3, city: 'BagaBaga', country: 'Hracka', email: 'asad@email.com' }
         ]
      }*/
   constructor(props){
      super(props);
      this.state = {
         lista: []
      }
      // this.state = {
      //    _socialSecurityNumber: '',
      //    _name: '',
      //    _surname: '',
      //    _street: '',
      //    _number: '',
      //    _city: '',
      //    _country: '',
      //    _email: '',
      //    _phone: '',
      //    _postcode: ''
      // };
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
     this.getRequests();
  }

  getRequests(){
      //const{_socialSecurityNumber, _name, _surname, _street, _number, _city, _country, _email, _phone, _postcode} = this.state;
      const token = JSON.parse(localStorage.getItem('token'));
      const requestOptions = {
         method: 'GET',
         headers: {
                     'Content-Type': 'application/json',
                     'Authorization' : `Bearer ${token.accessToken}`
      }
         //body: JSON.stringify(clinicRequest)
     };

     fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/getPendingRequests`, requestOptions)
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
            {/* <ClinicCentAdmin person={this.state.person}/> */}
            <ClinicCentAdmin lista = {this.state.lista}/>
         </div>
      )
   }
}

export default CCPerson //exporting a component make it reusable and this is the beauty of react