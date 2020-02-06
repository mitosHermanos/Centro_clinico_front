// import React, {useEffect, useState} from 'react';
// import Header from './Header.js';
// import {serviceConfig} from '../appSettings.js';  
// import { Container, Col, Row, Jumbotron } from 'react-bootstrap';
// import { render } from 'react-dom';

// function MedicalRecord(props){

//     const id = props.match.params.id;
//     const [medicalRecord, setMedicalRecord] = useState({});

//     useEffect(() => {
//         fetchMedicalRecord();
//     }, [])

//     const fetchMedicalRecord = () => {
//         const token = JSON.parse(localStorage.getItem('token'));

//         const requestOptions = {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token.accessToken}`
//             },
//         };


//         fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/getMedicalRecord/${id}`, requestOptions)
//         .then(response => {
//             if (!response.ok) {
//                 return Promise.reject(response);
//             }
//             return response.json();
//         })
//         .then((data) => {
//             setMedicalRecord(data);
//         })
//         .catch(response => {
//             console.log(response);
//         })
//     }

//     useEffect(() => {
//         console.log(medicalRecord)
//     }, [medicalRecord])
//     // useEffect(() => {
//     //     // console.log('postArray',props.postArray.title)
//     //     console.log('postObject',props.postObject.title)
    
//     // },[props.postObject.title])

//     const renderBasicInfo = () => {
//         return(
//             <Container style={{marginTop:"10%"}}>
//                     <span>Height:</span>
//                     <i>&nbsp;{medicalRecord.height}</i>
//                     <br/><br/>
//                     <span>Weight:</span>
//                     <i>&nbsp;{medicalRecord.weight}</i>
//                     <br/><br/>
//                     <span>Blood type:</span>
//                     <i>&nbsp;{medicalRecord.bloodType}</i>
//                     <br/><br/>
//                     <span>Age:</span>
//                     <i>&nbsp;{medicalRecord.age}</i>
//                     <br/><br/>
//                     <span>Allergies:</span>
//                     <i>&nbsp;{medicalRecord.allergies}</i>
//                     <br/><br/>
//                     <span>Diopter:</span>
//                     <i>&nbsp;{medicalRecord.diopter}</i>
//                     <br/><br/>
//             </Container>
//         )
//     }

//     return(
//         <div>
//             <Header/>
//             <Row style={{padding:"2%"}}>
//                 <Col>
//                     <Jumbotron style={{margin:"5%"}}>      
//                         <h4>Basic information</h4>
//                         {renderBasicInfo()}
//                     </Jumbotron>
//                 </Col>
//                     <div>
//                         <p>Reports</p>
//                     </div>
//                 <Col xs={9}>
                        
//                 </Col>
//             </Row>
//         </div>
//     )

// } export default MedicalRecord;





import React from 'react';
import {Card, Form, Col, Button, Container} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import ModalAlert from './ModalAlert.js'

class MedicalRecord extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //medicalRecord: {
                _height : 0,
                _weight : 0,
                _bloodType : '',
                _allergies : '',
                _diopter : '',
                _age : 0,
            //}
        }
        this.child = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.getMedicalRecord();
    }
    
    // getMedicalRecord(){
    //     const token = JSON.parse(localStorage.getItem('token'));
    
    //     const requestOptions = {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${token.accessToken}`,
    //             'Content-Type': 'application/json'
    //         },
    //     };


    //     fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/getMedicalRecord/${this.props.match.params.id}`, requestOptions)
    //     // .then(response => {
    //     //     console.log('kite cveca');
    //     //     return response.json();
    //     // })
    //     // .then((data)=>{
    //     //    this.setState({medicalRecord : data});
    //     //    console.log(this.state.medicalRecord);
    //     // })
    

    //     .then((response) => {
    //         if (!response.ok) {
    //             console.log("nije ok");
    //             return Promise.reject(response);
    //         }
    //         console.log("ok je");
    //         return response.json();
    //     })
    //     .then((data) => {
    //         this.setState({height : data.height});
    //         console.log("setuje state");
    //     }).catch((response) => {
    //         console.log("catch");
    //         console.log(response);
    //     })
    // }
    getMedicalRecord(){
        const token = JSON.parse(localStorage.getItem('token'));
        const requestOptions = {
           //mode: 'cors',
           method: 'GET',
           headers: {
                       'Content-Type': 'application/json',
                       'Authorization' : `Bearer ${token.accessToken}`
        }
           //body: JSON.stringify(clinicRequest)
       };
  
       fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/getMedical/${this.props.match.params.id}`, requestOptions)
          .then(response => {
              return response.json();
          })
          .then((data)=>{
             this.setState({_height : data.height});
             this.setState({_weight : data.weight});
             this.setState({_allergies : data.allergies});
             this.setState({_bloodType : data.bloodType});
             this.setState({_age : data.age});
             this.setState({_diopter : data.diopter});
             console.log(this.state._height);
          })
          .catch(response=>{
            //  const promise = Promise.resolve(response.json());
            //  promise.then(data => {
            //     alert(data.messege);
            //  })
          })
    }
    
    handleChange(e) {
        const newMedRecord = this.state.medicalRecord;
        newMedRecord[e.target.id] = e.target.value;
        this.setState({
          medicalRecord: newMedRecord
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.editPatientInfo();
    }

    // editPatientInfo(){
    //     const token = JSON.parse(localStorage.getItem('token'));
    //     const {patient} = this.state;
    
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${token.accessToken}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body : JSON.stringify(patient)
    //     };

    //     fetch(`${serviceConfig.baseURL}/patient`, requestOptions)
    //     .then((response) => {
    //         if (!response.ok) {
    //             return Promise.reject(response);
    //         }
    //         this.props.history.push('/patientProfile');
    //     })
    //     .catch(response => {
    //         const promise = Promise.resolve(response.json());
    //         promise.then(data => {
    //             this.setState({message:data.message})
    //             this.child.current.showModal(); 
    //         })    
    //     })
    // }

    nextPath(path) {
        this.props.history.push(path);
    }


    render(){
        

        return(        
        <Container style={{marginTop:"5rem", width:"50rem"}}>
            <Card>
                <Form onSubmit = {this.handleSubmit}>
                <Card.Header>
                    <Card.Title id="contained-Card-title-vcenter">
                    Edit medical record
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                            <Form.Label>Height</Form.Label>
                            <Form.Control
                                required
                                id="_height"
                                value={this.state._height}
                                type="number"
                                placeholder="Height"
                                onChange = {this.handleChange}
                            />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control
                                    required
                                    id="_weight"
                                    value={this.state._weight}
                                    type="number"
                                    placeholder="Weight"
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>BloodType</Form.Label>
                                <Form.Control
                                    required
                                    id="_bloodType"
                                    value={this.state._bloodType}
                                    type="text"
                                    placeholder="Blood type"
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="8">
                                    <Form.Label>Diopter</Form.Label>
                                    <Form.Control
                                        required
                                        id="_diopter"
                                        value={this.state._diopter}
                                        type="text"
                                        placeholder="Diopter"
                                        onChange = {this.handleChange}
                                    />
                            </Form.Group>
                            
                            <Form.Group as={Col} md="4">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    required
                                    id="_age"
                                    value={this.state._age}
                                    type="number"
                                    placeholder="age"
                                    onChange = {this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                </Card.Body>
                <Card.Footer style={{display:"flex", justifyContent:"flex-end"}}>
                    <Button variant="success" type="submit" style={{marginRight:"3%"}}>Submit</Button>
                    <Button variant="danger" onClick={() => this.nextPath('/patientProfile') }>Cancel</Button>
                </Card.Footer>
                </Form>
            </Card>

            <ModalAlert message={this.state.message} ref={this.child}/>
        </Container>
        );
    }
}
export default MedicalRecord;