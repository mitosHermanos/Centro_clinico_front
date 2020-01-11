import React, { useState } from 'react';
import {Container} from 'react-bootstrap'
import  GenericTable from "./GenericTable.js"
import Header from "./Header.js"
import {serviceConfig} from '../appSettings.js'

function PatientClinicList() {

    const [data, setData] = React.useState([]);
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Clinics list',
            columns: [
              {
                Header: 'Name',
                accessor: 'name',
              },
              {
                Header: 'Description',
                accessor: 'description',
              },
            ],
          },
        ],
        []
    )  

    const fetchData = React.useCallback(() => {
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
        };


        fetch(`${serviceConfig.baseURL}/clinic/all`, requestOptions)
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

    }, []);


    return(
        <div>
            <Header/>
            <Container>
                <GenericTable columns={columns} data={data} fetchData={fetchData}/>
            </Container>
        </div>
    )
    
} export default PatientClinicList;