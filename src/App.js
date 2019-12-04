import React from 'react';
import './styles/App.css';
import { Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.js'
import RegisterPage from './components/RegisterPage.js'
import RegisterClinic from './components/RegisterClinic.js'
import PatientInfo from './components/PatientInfo.js'
import EditPatientInfo from './components/EditPatientInfo.js'
import EditPatientPassword from './components/EditPatientPassword.js'
import ClinicCentAdmin from './components/ClinicCentAdmin.js';
import CCPerson from './components/CCPerson.js';
import EditClinicProfile from './components/EditClinicProfile.js';
import EditClinicAdminProfile from './components/EditClinicAdminProfile.js';
import ViewBusinessReportPage from './components/ViewBusinessReportPage.js';
import RegisterDoctorPage from './components/RegisterDoctorPage.js';
import RoomSearchPage from './components/RoomSearchPage.js';
import DoctorSearchPage from './components/DoctorSearchPage.js';
import CheckupTypeSearchPage from './components/CheckupTypeSearchPage';
import CheckupDateSearchPage from './components/CheckupDateSearchPage';
import ClinicAdminHomePage from './components/ClinicAdminHomePage';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/registerClinic" component={RegisterClinic}/>
      <Route path="/clinicCentAdmin" component={CCPerson}/>
      <Route path="/editClinicProfile" component={EditClinicProfile}/>
      <Route path="/editClinicAdminProfile" component={EditClinicAdminProfile} /> 
      <Route path="/viewBusinessReport" component={ViewBusinessReportPage}/>
      <Route path="/registerDoctor" component={RegisterDoctorPage} />
      <Route path="/searchRooms" component={RoomSearchPage}/>
      <Route path="/searchDoctors" component={DoctorSearchPage}/>
      <Route path="/searchCheckupTypes" component={CheckupTypeSearchPage}/>
      <Route path="/searchCheckupDates" component={CheckupDateSearchPage}/>
      <Route path="/clinicAdminHomePage" component={ClinicAdminHomePage}/>
      <Route path="/patientHomePage" component={Header}/>

      <Route
        path="/patientProfile"
        render={({ match: { url } }) => (
        <>
          <Route path={`${url}/`} component={PatientInfo} exact />
          <Route path={`${url}/edit`} component={EditPatientInfo} />
          <Route path={`${url}/password`} component={EditPatientPassword} />
        </>
        )}
      />

    </div>
  );
}

export default App;
