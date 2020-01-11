import React, {Component} from 'react';
import {Container, Form, Col, Button, Table} from 'react-bootstrap';
import {serviceConfig} from '../appSettings.js';
import Report from './Report'

class AddToReportDiag extends Component{
   
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state={
           send: ''
        }
    }

    renderTableData() {
        return this.props.lista.map((el, index) => {
           return (
              <tr key={el.code}>
                 <td>{el.code}</td>
                 <td>{el.description}</td>
                 {/* <td><Button variant="primary" onClick={()=> this.assignDiagnosis(el)} type="submit">Assign</Button></td> */}
              </tr>
           )
        })
    }
    assignDiagnosis(el){
       this.state.send = el;
       return(
         <Report diagnosis={this.state.send}/>
       )
    }

    

    render(){
    console.log(this.state.send);
    return (
         <Container>
            <div>
               <Table  striped bordered hover id='person' style={{width:"75%"}}>
               <tr>
                  <th>Code</th>
                  <th>Description</th>
               </tr>
                 <tbody>
                    {this.renderTableData()}
                 </tbody>
               </Table>
            </div>
        </Container>
     )
    }
}



export default AddToReportDiag; 
