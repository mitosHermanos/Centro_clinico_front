import React, {Component} from 'react';
import {Container, Form, Col, Button, Table} from 'react-bootstrap';

class DoctorsAverageRatingTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
           docrating:[],
        }
        console.log(this.props)
    }
    
    renderTableData() {
        return this.state.docrating.map((docrating, index) => {
           const { id, name, surname, avgrating} = docrating //destructuring
           return (
              <tr key={id}>
                 <td>{id}</td>
                 <td>{name}</td>
                 <td>{surname}</td>
                 <td>{avgrating}</td>
              </tr>
           )
        })
    }
    render(){
    return (
         <Container>
            <div>
               <Table  striped bordered hover id='docrating'>
                 <tbody>
                    {this.renderTableData()}
                 </tbody>
               </Table>
            </div>
        </Container>
     )
    }
}



export default DoctorsAverageRatingTable; 
