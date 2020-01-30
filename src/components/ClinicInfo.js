import React from 'react';
import {Card, Container, Button, Image} from 'react-bootstrap';
import {serviceConfig} from '../appSettings.js'
import '../styles/PatientInfo.css';
import Header from './Header';

class ClinicInfo extends React.Component{
    constructor(props){
        super(props);   
        this.state = {
            clinic : {
            }  
        }
    }

    componentDidMount(){
        this.getClinicInfo();
    }

    getClinicInfo(){
        const token = JSON.parse(localStorage.getItem('token'));
    
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            },
        };  
            

        fetch(`${serviceConfig.baseURL}/clinic/getClinic/${this.props.match.params.id}`, requestOptions)

        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            
            console.log(data);
            this.setState({clinic : data});
        })
        .catch(response => {
            // const promise = Promise.resolve(response.json());
            // promise.then(data => {
            //     alert(data.message);
            // })    
        })

    }

    nextPath(path) {
        this.props.history.push(path);
    }


    render(){
        const {id, name, description, street, number, city, postcode, country} = this.state.clinic;


        return(
            <div>
                <Header/>
            <Container style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}>
                <Card style={{ width: '30rem'}}>
                    <Card.Header style={{display: 'flex', justifyContent: 'space-between'}}>
                        Clinic information
                    </Card.Header>                    
                    <Card.Body>
                        <Card.Title style={{marginLeft:"10px"}}>{name}</Card.Title>
                        <Card.Text style={{fontSize:"large"}}>
                            <Image src={require('../resources/location.png')}></Image>
                            {city}
                        </Card.Text>
                        <Card.Text style={{fontSize:"medium", marginLeft:"10px"}}>
                            {description}
                        </Card.Text>
                        <hr/>
                        <h6>Location</h6>
                        <Container>
                            <span>Adress:</span>
                            <i>&nbsp;
                                {street} {number}, {postcode} {city}, {country}</i>
                            <br/><br/>
                        </Container>
                    </Card.Body>
                    <Card.Footer style={{display: 'flex', justifyContent: 'left'}}>
                        <Button variant="primary" size="sm" onClick={() => this.nextPath(`/doctorsInClinic/${id}`) }>
                            See all employed doctors
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
            </div>
        );
    }
}

export default ClinicInfo;