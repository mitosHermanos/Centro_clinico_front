import React, {Component} from 'react';
import {Container, Form, Col, Button, Table} from 'react-bootstrap';
import {serviceConfig} from '../appSettings.js'

class ClinicCentAdmin extends Component{

    constructor(props) {
        super(props);
        console.log(this.props)
    }

    renderTableData() {
        return this.props.lista.map((el, index) => {
           return (
              <tr key={el.code}>
                 <td>{el.code}</td>
                 <td>{el.description}</td>
                 <td><Button variant="primary" onClick={()=> this.assignDiagnosis(el)} type="submit">Assign</Button></td>
              </tr>
           )
        })
    }

    assignDiagnosis(el){
     const send ={
         code : el.code,
         description : el.description
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
       fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/assignDiagnosis`, requestOptions)
       .then(response => {
           if (!response.ok) {
               return Promise.reject(response);
               window.location('/clinicCentAdmin');
           }
           return response.statusText;
       })
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
