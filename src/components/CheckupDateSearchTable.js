import React, {Component} from 'react';
import {Container, Form, Col, Button, Table} from 'react-bootstrap';

class CheckupDateSearchTable extends Component{

    constructor(props) {
        super(props);
        console.log(this.props)
    }
    
    renderTableData() {
        return this.props._checkupdates.map((e, index) => {
           return (
              <tr key={e.id}>
                 <td>{e.id}</td>
                 <td>{e.date}</td>
              </tr>
           )
        })
    }
    render(){
    return (
         <Container>
            <div>
               <Table  striped bordered hover id='_checkupdates'>
                 <tbody>
                    {this.renderTableData()}
                 </tbody>
               </Table>
            </div>
        </Container>
     )
    }
}



export default CheckupDateSearchTable; 
