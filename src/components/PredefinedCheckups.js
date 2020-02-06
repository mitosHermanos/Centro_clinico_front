import React, {useEffect, useState} from 'react';
import {Container, Jumbotron, Card, CardDeck, CardColumns, Button} from 'react-bootstrap'
import Header from './Header.js';
import {serviceConfig} from '../appSettings.js'
import { useRouteMatch } from "react-router-dom";

function PredefinedChekups() {

    const [checkups, setCheckups] = useState([]);

    let match = useRouteMatch('/predefinedList/:id');

    useEffect(() => {
        fetchPredefinedCheckups();
    }, [])

    const fetchPredefinedCheckups = () => {
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
        };


        fetch(`${serviceConfig.baseURL}/clinic/getPredefinedCheckups/${match.params.id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            setCheckups(data);
        })
        .catch(response => {
            console.log(response)
        })
    }

    function renderCheckups(){
        return checkups.map(checkup => {
            return(
                <Card className="bg-light" style={{margin:"1%"}} key={checkup.id}>
                    <Card.Header style={{display:"flex", justifyContent:"space-between", fontSize:"0.9rem", paddingBottom:'0'}}>
                        <Card.Text>{checkup.checkupType}</Card.Text>
                        <span>{checkup.checkupTimeStart} - {checkup.checkupTimeEnd}  {checkup.checkupDate}</span>
                    </Card.Header>
                    <Card.Body>   
                        <Container style={{marginTop:"2%", fontSize:"0.9rem"}}>
                            <Card.Text>Clinic name: {checkup.clinicName}</Card.Text>
                            <Card.Text>Doctor name: {checkup.doctorName}</Card.Text>
                            <Card.Text>Room: {checkup.roomName}</Card.Text>
                        </Container>
                    </Card.Body>
                    <Card.Footer style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button size="sm" variant="success" onClick={(e) => scheduleCheckup(checkup)}>Schedule</Button>
                    </Card.Footer>
                </Card>
            )
        });
    }

    const scheduleCheckup = (checkup) => {
        const token = JSON.parse(localStorage.getItem('token'));

        const checkupData = {
            checkupDate: checkup.checkupDate,
            checkupTime: checkup.checkupTimeStart,
            checkupType: checkup.checkupType,
            doctorId: checkup.doctorId,
            roomId: checkup.roomId, 
            predefinedCheckupId: checkup.id
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
            body: JSON.stringify(checkupData)
        };


        fetch(`${serviceConfig.baseURL}/clinic/schedulePredefined`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            
        })
        .catch(response => {
            console.log(response)
        })
    }

    return(
        <div>
            <Header/>
            <Container>
                <div className='bg-light' style={{margin: "1% 0 1% 0", padding:"0.5%", borderRadius:"5px"}}>
                    <h4>Predefined checkups</h4>
                </div>
                <CardColumns>
                    {renderCheckups()}
                </CardColumns>
            </Container>
        </div>
    )

} export default PredefinedChekups