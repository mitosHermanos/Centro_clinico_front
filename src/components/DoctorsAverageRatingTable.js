import React, {Component} from 'react';
import {Container, Form, Col, Button, Table} from 'react-bootstrap';

class DoctorsAverageRatingTable extends Component{

    constructor(props) {
        super(props);
        console.log(this.props)
    }
    
    renderTableData() {
        return this.props.docrating.map((e, index) => {
           return (
              <tr key={e.id}>
                 <td>{e.id}</td>
                 <td>{e.name}</td>
                 <td>{e.surname}</td>
                 <td>{e.avgrating}</td>
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
