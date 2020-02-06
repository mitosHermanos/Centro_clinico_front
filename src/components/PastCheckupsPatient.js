import React, {useEffect, useState} from 'react';
import {Container, Jumbotron, ToggleButton, ToggleButtonGroup, Button} from 'react-bootstrap';
import Header from './Header.js';
import {serviceConfig} from '../appSettings.js';    

function PastCheckupsPatient() {

    const [checkups, setCheckups] = useState([]);
    const [name, setName] = useState([]);

    useEffect(() => {
        fetchCheckups();
    }, [])


    function fetchCheckups(){
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
        };


        fetch(`${serviceConfig.baseURL}/clinic/getPreviousCheckups`, requestOptions)
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
                <Jumbotron className="bg-light text-dark" style={{margin:"1%"}} key={checkup.id}>
                    <Container>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                        <h3>{checkup.checkupType}</h3>
                        <h5>{checkup.checkupTimeStart} - {checkup.checkupTimeEnd}  {checkup.checkupDate}</h5>
                        </div>
                        <Container style={{marginTop:"2%"}}>
                            <h6>Clinic name: {checkup.clinicName}</h6>
                            <h6>Doctor name: {checkup.doctorName}</h6>
                            <h6>Room: {checkup.roomName}</h6>
                        </Container>
                    </Container>
                </Jumbotron>
            )
        });
    }

    const handleChange = name => setName(name);

    const sortByType = (a, b) => {
        let stringA = a.checkupType.toUpperCase();
        let stringB = b.checkupType.toUpperCase();

        if (stringA < stringB) {
            return -1;
        }
        if (stringA > stringB) {
            return 1;
        }
        return 0;
    };

    const sortByClinicName = (a, b) => {
        let stringA = a.clinicName.toUpperCase();
        let stringB = b.clinicName.toUpperCase();

        if (stringA < stringB) {
            return -1;
        }
        if (stringA > stringB) {
            return 1;
        }
        return 0;
    };

    const sortByDate = (a, b) => {
        return new Date(`${a.checkupDate}T${a.checkupTimeStart}`) - new Date(`${b.checkupDate}T${b.checkupTimeStart}`);
    }

    useEffect(() => {
        switch (name) {
            case 'Type':
                setCheckups([...checkups].sort(sortByType));     
                break;
            case 'Date':
                setCheckups([...checkups].sort(sortByDate));
                break;        
            case 'Clinic':
                console.log(checkups.sort(sortByClinicName));
                setCheckups([...checkups].sort(sortByClinicName));
                break;
            default:
                break;
        }
    }, [name]);

    return(
        <div>
            <Header/>
            <Container>
            <div className="bg-light" style={{margin:"1%", padding:"1%"}}>
                <ToggleButtonGroup type="radio" name={name} onChange={handleChange}>
                    <Button disabled variant="outline-dark">Sort by</Button>
                    <ToggleButton value={'Date'} variant="outline-primary">Date</ToggleButton>
                    <ToggleButton value={'Type'} variant="outline-primary">Type</ToggleButton>
                    <ToggleButton value={'Clinic'} variant="outline-primary">Clinic name</ToggleButton>
                </ToggleButtonGroup>
            </div>
                {renderCheckups()}
            </Container>
        </div>
    )

} export default PastCheckupsPatient