import React, { useState, useEffect,useRef } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Container, Modal, Form, Col, InputGroup, Button, Alert} from 'react-bootstrap'
import  GenericTable from "./GenericTable.js"
import Header from "./Header.js"
import {serviceConfig} from '../appSettings.js'

const PatientListNurse = () => {

    const [data, setData] = useState([]);
    const [types, setTypes] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [alertSuccesShow, setAlertSuccessShow] = useState(false);
    const [alertFailureShow, setAlertFailureShow] = useState(false);
    const [modalSubmited, setModalSubmited] = useState(false);

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState({});

    const dateRef = useRef(null);
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Petient list',
            columns: [
              {
                Header: 'Name',
                accessor: 'name',
              },
              {
                Header: 'Surname',
                accessor: 'surname',
              },
              {
                Header: 'Street',
                accessor: 'fullAddress',
              }
            ],
          },
        ],
        []
    )      

    let history = useHistory()

    const fetchData = React.useCallback(() => {
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
        };


        fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/getPatients`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            setData(data);
        })
        .catch(response => {
            console.log(response)
        })

        console.log(data);
    }, []);


    
    return(
        <div>
            <Header/>
            <Container>                
                <GenericTable columns={columns} data={data} fetchData={fetchData} /*handleClick={handleClick}*//>
            </Container>
        </div>
    )
    
} 
export default PatientListNurse