import React, {useState} from 'react';
import {Container,Button, Modal} from 'react-bootstrap'
import {useLocation} from 'react-router-dom';
import {serviceConfig} from '../appSettings.js';
import  GenericTable from "./GenericTable.js";

function DoctorSearchPage(){

    const [data, setData] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Doctors list',
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
                Header: 'Average rating',
                accessor: 'avgrating',
              },
            ],
          },
        ],
        []
    )  

    let location = useLocation()
    let urlParser = new URLSearchParams(location.search)

    const fetchData = React.useCallback(() => {
        const token = JSON.parse(localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`
              }
        }

        let urlID = '';

        if(location.pathname.includes('/scheduleDoctors')){
          urlID = `searchDoctors/${urlParser.get('id')}`
        } else {
          urlID = 'searchDoctors';
        }

        fetch(`${serviceConfig.baseURL}/clinic/${urlID}`, requestOptions)
        .then(response => {
          if (!response.ok) {
            return Promise.reject(response);
          }
          return response.json(); 
        })
        .then((data) =>  {
            setData(data)
        })
        .catch(response => {
            const promise = Promise.resolve(response.json());
            promise.then(data => {
                alert(data.message);
            })
        })

    });	

    function handleClick(rowProps){
      setModalShow(true);
      setDoctor(rowProps.name + ' ' + rowProps.surname);
    };

    return(
        <div> 
            <Container>
                <GenericTable columns={columns} data={data} fetchData={fetchData} handleClick={handleClick}/>
            </Container>

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <h3>Confirm appointment</h3>
                </Modal.Header>
                <Modal.Body style={{display:"flex"}}>
                  <Container>
                    <span>Date:</span>
                    <i>&nbsp;{urlParser.get('date')}</i>
                    <br/><br/>
                    <span>Time:</span>
                    <i>&nbsp;{urlParser.get('time')}</i>
                    <br/><br/>
                    <span>Type:</span>
                    <i>&nbsp;{urlParser.get('type')}</i>
                  </Container>
                  <Container>
                    <span>Doctor:</span>
                    <i>&nbsp;{doctor}</i>
                    <br/><br/>
                    <span>Clinic:</span>
                    <i>&nbsp;{urlParser.get('clinic')}</i>
                    <br/><br/>
                    <span>Duration:</span>
                    <i>&nbsp;{urlParser.get('duration')}</i>
                    <br/><br/>
                    <span>Price:</span>
                    <i>&nbsp;{urlParser.get('price')}</i>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={() => setModalShow(false)}>
                    Cancel
                  </Button>
                  <Button variant="success">
                    Confirm
                  </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
    
}
export default DoctorSearchPage; 