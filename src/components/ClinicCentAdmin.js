import React, {Component} from 'react';
import {Container, Form, Col, Button, Table} from 'react-bootstrap';
import {serviceConfig} from '../appSettings.js'
import {useHistory} from "react-router-dom";
import { browserHistory } from 'react-router-dom';
class ClinicCentAdmin extends Component{

    constructor(props) {
        super(props);
        console.log(this.props)
    }

    renderTableData() {
        return this.props.lista.map((el, index) => {
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
                 <td><Button variant="primary" onClick={()=> this.acceptRegistration(el)} type="submit">Accept</Button></td>
                 <td><Button variant="primary" onClick={()=> this.declineRegistration(el)} type="submit">Decline</Button></td>
              </tr>
           )
        })
    }

    acceptRegistration(el){

      const _address = {
         street: el.street,
         number: el.streetNumber,
         city: el.city,
         postcode: el.postcode,
         country: el.country
     }
     console.log(_address);
     const send ={
         socialSecurityNumber : el.socialSecurityNumber,
         id : el.id,
         email : el.email,
         password : el.password,
         name : el.name,
         surname : el.surname,
         address : _address,
         phoneNumber : el.phoneNumber
      }
      const token = JSON.parse(localStorage.getItem('token'));
      
       const requestOptions ={
          method: 'POST',
          headers: {
                    'Content-Type': 'application/json', 
                    'Authorization' : `Bearer ${token.accessToken}`
                },
          body: JSON.stringify(send)
       };
       fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/accept`, requestOptions)
       .then(response => {
           if (!response.ok) {
               return Promise.reject(response);
            }
            window.location.href = '/home';
            //browserHistory.push("/home");
            //this.props.router.push('/home');
           return response.statusText;
       })
      //  .then(() => {
      //      this.props.history.push('/clinicCentAdmin');
      //  })
      //  .catch(response => {
      //      return response.text();
      //  })
       .then((message) => {
           alert(message);
       });
    }

    declineRegistration(el){
      const _address = {
         street: el.street,
         number: el.streetNumber,
         city: el.city,
         postcode: el.postcode,
         country: el.country
     }
     console.log(_address);
     const send ={
         socialSecurityNumber : el.socialSecurityNumber,
         id : el.id,
         email : el.email,
         password : el.password,
         name : el.name,
         surname : el.surname,
         address : _address,
         phoneNumber : el.phoneNumber
      }
      const token = JSON.parse(localStorage.getItem('token'));

       const requestOptions ={
          method: 'POST',
          headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`
                },
          body: JSON.stringify(send)
       };
       fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/decline`, requestOptions)
       .then(response => {
           if (!response.ok) {
               return Promise.reject(response);
           }
           window.location.href = '/home';
           return response.statusText;
       })
      //  .then(() => {
      //      this.props.history.push('/clinicCentAdmin');
      //  })
      //  .catch(response => {
      //      return response.text();
      //  })
       .then((message) => {
           alert(message);
       });
    }

    render(){
    return (
         <Container>
            <div>
               <Table  striped bordered hover id='person'>
                 <tbody>
                    {this.renderTableData()}
                 </tbody>
               </Table>
            </div>
        </Container>
     )
    }
}



export default ClinicCentAdmin; 
