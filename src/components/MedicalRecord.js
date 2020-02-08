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
        // const newMedRecord = this.state.medicalRecord;
        // newMedRecord[e.target.id] = e.target.value;
        // this.setState({
        //   medicalRecord: newMedRecord
        // });
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.editMedRecord();
    }

    editMedRecord(){
        const token = JSON.parse(localStorage.getItem('token'));
        const medicalRecord = {
                height: this.state._height,
                weight: this.state._weight,
                allergies: this.state._allergies,
                age: this.state._age,
                diopter: this.state._diopter,
                bloodType: this.state._bloodType
            }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(medicalRecord)
        };

        fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/setMedical/${this.props.match.params.id}`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            console.log("then");
            //this.props.history.push('/patientProfile');
        })
        .catch(response => {
             const promise = Promise.resolve(response.json());
             console.log("catch");
            // promise.then(data => {
            //     this.setState({message:data.message})
            //     this.child.current.showModal(); 
            // })    
        })
    }

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
                    <Button variant="danger" onClick={() => this.nextPath('/reportDiagnosis/'+ this.props.match.params.id) }>Cancel</Button>
                </Card.Footer>
                </Form>
            </Card>

            <ModalAlert message={this.state.message} ref={this.child}/>
        </Container>
        );
    }
}
export default MedicalRecord;

