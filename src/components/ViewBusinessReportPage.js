import React, {Component} from 'react';
import {Container, Form, Col, Button, InputGroup} from 'react-bootstrap'
import {serviceConfig} from '../appSettings.js'
import GenericTable from "./GenericTable.js"
import Header from "./Header.js"
import {LineChart} from 'react-chartkick'
import 'chart.js'
import ModalAlert from './ModalAlert.js'

function ViewBusinessReportPage() {

    const [data, setData] = React.useState([]);
    const [avgClinic, setAvgClinic] = React.useState([]);
    const [chartData, setChartData] = React.useState([]);

    const [startDate, setStartDate] = React.useState([]);
    const [endDate, setEndDate] = React.useState([]);

    
    let startDateRef = React.useRef(null);
    let endDateRef = React.useRef(null);
    let child = React.useRef(null);

    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Doctors list',
            columns: [
              {
                Header: 'Id',
                accessor: 'id',
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
                Header: 'Avgrating',
                accessor: 'avgrating',
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

        fetch(`${serviceConfig.baseURL}/clinic/viewBusinessReport`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json(); 
        })
        .then((data) =>  {
            setData(data.doctors);
            setAvgClinic(data.rating);
        })
        .catch(response => {
            console.log(response);
        })

    }, []);

    function handleSubmit(){
      if(startDate.length && endDate.length){
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`},
        }

        fetch(`${serviceConfig.baseURL}/clinic/viewBusinessReport/${startDate}/${endDate}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json(); 
        })
        .then((data) =>  {
            console.log(data.chart);
            setChartData(data.chart);
        })
        .catch(response => {
            console.log(response);
        })
      }else{
        child.current.showModal();
      }
      console.log(startDate);
    }

    return(
        <div>
            <Header/>
            <Container>
                <GenericTable columns={columns} data={data} fetchData={fetchData}/>
                <hr/>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} md="6">
                    <InputGroup style={{marginTop:'3%'}}>
                      <InputGroup.Prepend>
                          <InputGroup.Text>Start date: </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        required
                        ref={startDateRef}
                        value={startDate}
                        type="date"
                        onChange = {e => setStartDate(e.target.value)}
                      />
                    </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                    <InputGroup style={{marginTop:'3%'}}>
                      <InputGroup.Prepend>
                          <InputGroup.Text>End date: </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        required
                        ref={endDateRef}
                        value={endDate}
                        type="date"
                        onChange = {e => setEndDate(e.target.value)}
                      />
                    </InputGroup>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} className="text-center">
                      <Button variant="success" onClick={() => handleSubmit()}>
                        View checkup chart for selected dates
                      </Button>
                    </Form.Group>
                  </Form.Row>
                </Form>
                <LineChart data={chartData}/>

                <ModalAlert message={"You did not enter start/end dates correctly"} ref={child}/>
            </Container>
        </div>
    )
    
}
export default ViewBusinessReportPage; 