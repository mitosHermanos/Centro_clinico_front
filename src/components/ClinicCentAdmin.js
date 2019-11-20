import React, {Component} from 'react';
import {Container, Form, Col, Button, Table} from 'react-bootstrap';

class ClinicCentAdmin extends Component{

    constructor(props) {
        super(props);
        console.log(this.props)
    }

    renderTableData() {
        return this.props.person.map((person, index) => {
           const { id, name, surname, street, number, city, country, email } = person //destructuring
           return (
              <tr key={id}>
                 <td>{id}</td>
                 <td>{name}</td>
                 <td>{surname}</td>
                 <td>{street}</td>
                 <td>{number}</td>
                 <td>{city}</td>
                 <td>{country}</td>
                 <td>{email}</td>
              </tr>
           )
        })
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
