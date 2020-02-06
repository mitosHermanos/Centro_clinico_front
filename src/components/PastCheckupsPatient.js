import React, {useEffect, useState} from 'react';
import {Container, Jumbotron, ToggleButton, ToggleButtonGroup, Button, Modal, Row, Col, ListGroup} from 'react-bootstrap';
import Header from './Header.js';
import {serviceConfig} from '../appSettings.js';   

import Rating from 'react-rating'

function PastCheckupsPatient() {

    const [checkups, setCheckups] = useState([]);
    const [name, setName] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        fetchCheckups();
        fetchRatings();
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

    function fetchRatings(){
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
        };


        fetch(`${serviceConfig.baseURL}/patient/getRatingInfo`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            setRatings(data);
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
                setCheckups([...checkups].sort(sortByClinicName));
                break;
            default:
                break;
        }
    }, [name]);

    const renderRatings = () => {
        return (
            <Row>
                {renderDoctorRatings()}
                {renderClinicRatings()}
            </Row>
        )
    }    

    const renderClinicRatings = () => {
        let rated = ratings.clinicRatings.filter( el => el.rating !== 0);
        let notRated = ratings.clinicRatings.filter(el => el.rating === 0);

        return (
            <Col>
                <h5>Rate clinics</h5>                    
                <ListGroup variant="flush">
                    {renderNotRatedClinics(notRated)}
                </ListGroup>
                <h5 style={{marginTop:"10%"}}>Rated clinics</h5>
                <ListGroup variant="flush">
                    {renderRated(rated)}
                </ListGroup>
            </Col>
        )
    }

    const renderNotRatedClinics = (notRated) => {
        return notRated.map((el) => {
            return <ListGroup.Item key={el.id} style={{display:"flex", justifyContent: "space-between"}}>
                <span>{el.nameOfRated}</span>
                <Rating
                    onClick={(val) => rateClinic(val, el.id)}
                    initialRating={el.rating}
                    emptySymbol={<img src={require("../resources/star_empty.png")}/>}
                    fullSymbol={<img src={require("../resources/star.png")}/>}
                />
            </ListGroup.Item>
        })
    }    



    const renderDoctorRatings = () => {
        let rated = ratings.doctorRatings.filter( el => el.rating !== 0);
        let notRated = ratings.doctorRatings.filter(el => el.rating === 0);

        return (
            <Col>
                <h5>Rate doctors</h5>                    
                <ListGroup variant="flush">
                    {renderNotRatedDoctors(notRated)}
                </ListGroup>
                <h5 style={{marginTop:"10%"}}>Rated doctors</h5>
                <ListGroup variant="flush">
                    {renderRated(rated)}
                </ListGroup>
            </Col>
        )
    }

    const renderRated = (rated) => {
        return rated.map((el) => {
            return <ListGroup.Item key={el.id} style={{display:"flex", justifyContent: "space-between"}}>
                <span>{el.nameOfRated}</span>
                <Rating
                    initialRating={el.rating}
                    readonly
                    emptySymbol={<img src={require("../resources/star_empty.png")}/>}
                    fullSymbol={<img src={require("../resources/star.png")}/>}
                />
            </ListGroup.Item>
        })
    }

    const renderNotRatedDoctors = (notRated) => {
        return notRated.map((el) => {
            return <ListGroup.Item key={el.id} style={{display:"flex", justifyContent: "space-between"}}>
                <span>{el.nameOfRated}</span>
                <Rating
                    onClick={(val) => rateDoctor(val, el.id)}
                    initialRating={el.rating}
                    emptySymbol={<img src={require("../resources/star_empty.png")}/>}
                    fullSymbol={<img src={require("../resources/star.png")}/>}
                />
            </ListGroup.Item>
        })
    }

    const rateDoctor = (value, id) => {
        const token = JSON.parse(localStorage.getItem('token'));
        
        const ratingDTO = {
            id : id,
            rating: value.toString(),
            nameOfRated: ""
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
            body : JSON.stringify(ratingDTO)
        };


        fetch(`${serviceConfig.baseURL}/patient/rateDoctor`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            window.location.reload();
        })
        .catch(response => {
            console.log(response)
        })
    }

    const rateClinic = (value, id) => {
        const token = JSON.parse(localStorage.getItem('token'));
        
        const ratingDTO = {
            id : id,
            rating: value.toString(),
            nameOfRated: ""
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
            body : JSON.stringify(ratingDTO)
        };


        fetch(`${serviceConfig.baseURL}/patient/rateClinic`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            window.location.reload();
        })
        .catch(response => {
            console.log(response)
        })
    }

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
                <Button variant="outline-primary" style={{float:"right"}} onClick={() => setModalShow(true)}>Rate</Button>
            </div>
                {renderCheckups()}
            </Container>

            <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
                <Modal.Header closeButton>
                    <h5>Rate doctor/clinic</h5>
                </Modal.Header>
                <Modal.Body>
                    {ratings.length !== 0 &&  renderRatings()}
                </Modal.Body>
            </Modal>
        </div>
    )

} export default PastCheckupsPatient