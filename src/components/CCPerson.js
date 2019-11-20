import React, { Component } from 'react';
import ClinicCentAdmin from './ClinicCentAdmin.js';
import {Container, Form, Col, Button, Table} from 'react-bootstrap';


class CCPerson extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         person: [
            { id: 1, name: 'Wasif', surname: 'Lukac', street: 'Wakawaka', number: 3, city: 'BagaBaga', country: 'Hracka', email: 'wasif@email.com' },
            { id: 2, name: 'Ali', surname: 'Stojanov', street: 'Wakawaka', number: 3, city: 'BagaBaga', country: 'Hracka', email: 'ali@email.com' },
            { id: 3, name: 'Saad', surname: 'Garic', street: 'Wakawaka', number: 3, city: 'BagaBaga', country: 'Hracka', email: 'saad@email.com' },
            { id: 4, name: 'Asad', surname: 'Ca', street: 'Wakawaka', number: 3, city: 'BagaBaga', country: 'Hracka', email: 'asad@email.com' }
         ]
      }
   }

   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
         <div className='center-text'>
            <h1>Pending registrations</h1>
            <ClinicCentAdmin person={this.state.person}/>
         </div>
      )
   }
}

export default CCPerson //exporting a component make it reusable and this is the beauty of react