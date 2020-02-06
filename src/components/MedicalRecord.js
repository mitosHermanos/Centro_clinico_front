import React, {useEffect, useState} from 'react';
import Header from './Header.js';
import {serviceConfig} from '../appSettings.js';  
import { Container, Col, Row, Jumbotron, Table } from 'react-bootstrap';
import { render } from 'react-dom';

function MedicalRecord(){

    const [medicalRecord, setMedicalRecord] = useState({});

    useEffect(() => {
        fetchMedicalRecord();
    }, [])

    const fetchMedicalRecord = () => {
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
        };


        fetch(`${serviceConfig.baseURL}/patient/getMedicalRecord`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            setMedicalRecord(data);
        })
        .catch(response => {
            console.log(response);
        })
    }

    useEffect(() => {
        console.log(medicalRecord);
    }, [medicalRecord])

    const renderBasicInfo = () => {
        return(
            <Container style={{marginTop:"10%"}}>
                    <span>Height:</span>
                    <i>&nbsp;{medicalRecord.height}</i>
                    <br/><br/>
                    <span>Weight:</span>
                    <i>&nbsp;{medicalRecord.weight}</i>
                    <br/><br/>
                    <span>Blood type:</span>
                    <i>&nbsp;{medicalRecord.bloodType}</i>
                    <br/><br/>
                    <span>Age:</span>
                    <i>&nbsp;{medicalRecord.age}</i>
                    <br/><br/>
                    <span>Allergies:</span>
                    <i>&nbsp;{medicalRecord.allergies}</i>
                    <br/><br/>
                    <span>Diopter:</span>
                    <i>&nbsp;{medicalRecord.diopter}</i>
                    <br/><br/>
            </Container>
        )
    }

    const renderReports = () => {
        return medicalRecord.reports.map((report, i) => {
            return(
                <Container key={i} className="bg-light" style={{borderRadius:"5%", paddingTop:"1%"}}>
                    <div style={{padding:"1%"}}>
                        <span>{report.description}</span>
                    </div>
                    <hr/>
                    <Row>
                        <Col>
                            <h5>Diagnosis</h5>
                            <span>Code:</span>
                            <i>&nbsp;{report.diagnosisCode}</i>
                            <br/><br/>
                            <span>Description:</span>
                            <i>&nbsp;{report.diagnosisDescription}</i>
                            <br/><br/>                            
                        </Col>
                        <Col>
                            <h5>Prescription:</h5>
                            <span>Code:</span>
                            <i>&nbsp;{report.certifiedByName}</i>
                            <br/><br/>
                            <span>Certified:</span>
                            <i>&nbsp;{report.prescriptionCertified ? 'Yes' : 'No'}</i>
                            <br/><br/>
                        </Col>
                    </Row>
                    <hr/>
                    <Row key={i}>
                    <Col>
                        <h5>Medicine list</h5>
                        <Table bordered hover style={{marginTop:"2%"}}>
                            <tr>
                                <th>Code</th>
                                <th>Description</th>
                            </tr>
                            {renderMedicines(report.medicines)}
                        </Table>
                    </Col>
                    </Row>
                </Container>
            )
        })
    }

    const renderMedicines = (medicines) => {
        return medicines.map((medicine, i) => {
            return (
                <tr key={i}>
                    <td>{medicine.code}</td>
                    <td>{medicine.description}</td>
                </tr>
            )
        })
    }

    return(
        <div>
            <Header/>
            <Row style={{padding:"2%"}}>
                <Col>
                    <Jumbotron style={{margin:"5%"}}>      
                        <h4>Basic information</h4>
                        {renderBasicInfo()}
                    </Jumbotron>
                </Col>
                <Col xs={9}>
                    <Container style={{marginTop:"1.5%"}}>
                        <div className="bg-light" style={{padding:"0.5%", marginBottom:"1%"}}>
                            <h4>Reports</h4>
                        </div>
                        {medicalRecord.reports && renderReports()}
                    </Container>  
                </Col>
            </Row>
        </div>
    )

} export default MedicalRecord