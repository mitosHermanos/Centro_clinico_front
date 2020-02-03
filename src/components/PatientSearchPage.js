import React, {Component} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import GenericTable from "./GenericTable.js"
import Header from "./Header.js"

function PatientSearchPage() {

    const [data, setData] = React.useState([]);
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Patients list',
            columns: [
              {
                Header: 'SSN',
                accessor: 'socialSecurityNumber',
              },
              {
                Header: 'Name',
                accessor: 'name',
              },
              {
                Header: 'Surname',
                accessor: 'surname',
              },
              {
                Header: 'Email',
                accessor: 'email',
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
                'Authorization' : `Bearer ${token.accessToken}`},
        }

        fetch(`${serviceConfig.baseURL}/clinic/getAllPatients`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json(); 
        })
        .then((data) =>  {
            setData(data);
        })
        .catch(response => {
            console.log(response);
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
    
}
export default PatientSearchPage; 