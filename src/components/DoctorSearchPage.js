import React, {useState} from 'react';
import {Container,Button, Modal, Alert} from 'react-bootstrap'
import {useLocation} from 'react-router-dom';
import {serviceConfig} from '../appSettings.js';
import  GenericTable from "./GenericTable.js";
import Header from './Header.js';

function DoctorSearchPage(){

    const [data, setData] = useState([]);
    const [doctor, setDoctor] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [alertSuccesShow, setAlertSuccessShow] = useState(false);
    const [scheduled, setScheduled] = useState(false);
    const [scheduleFailed, setScheduleFailed] = useState(false);
    
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

        let urlID = 'searchDoctors';
        
        if(location.pathname.includes('/scheduleDoctors')){
          urlID += `/${urlParser.get('id')}`
          setAlertSuccessShow(true);
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
            console.log(response);
        })
    }, []);	

    function handleClick(rowProps){
      if(location.pathname.includes('/scheduleDoctors')){
        setModalShow(true);
        setDoctor(rowProps.name + ' ' + rowProps.surname);
        setDoctorId(rowProps.id);
      }
    };

    function confirmAppointment(e){
      setModalShow(false)
      fetchAppointment();
    }

    function fetchAppointment(){
      let scheduleDTO = {
        checkupDate: urlParser.get('date'),
        checkupTime: urlParser.get('time'),
        checkupType: urlParser.get('type'),
        doctorId: doctorId
      }
      
      const token = JSON.parse(localStorage.getItem('token'));

      const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`
            },
            body: JSON.stringify(scheduleDTO)
      }

      fetch(`${serviceConfig.baseURL}/clinic/schedule`, requestOptions)
      .then(response => {
        setAlertSuccessShow(false);
        if (!response.ok) {
          return Promise.reject(response);
        }
        setScheduled(true);
        return response.json(); 
      })
      .catch(response => {
          setScheduleFailed(true);
      })
    }

    return(
        <div> 
            <Header/>
            <Container>
                {alertSuccesShow &&
                      <Alert variant="success" onClose={() => setAlertSuccessShow(false)} dismissible>
                      <Alert.Heading>Well done!</Alert.Heading>
                      <p>
                        Now select doctor of your choice in the list below to continue..
                      </p>
                    </Alert>
                }

                {scheduled &&
                      <Alert variant="success" onClose={() => setAlertSuccessShow(false)} dismissible>
                      <Alert.Heading>Well done!</Alert.Heading>
                      <p>
                        You have successfully scheduled an appointment!
                      </p>
                    </Alert>
                }   

                {scheduleFailed &&
                      <Alert variant="danger" onClose={() => setAlertSuccessShow(false)} dismissible>
                      <Alert.Heading>Something went wrong...</Alert.Heading>
                      <p>
                        Something went wrong while trying to schedule your appointment!
                      </p>
                    </Alert>
                }   

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
                  <Button variant="success" onClick={confirmAppointment}>
                    Confirm
                  </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
    
}
export default DoctorSearchPage; 