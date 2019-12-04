import React from 'react';
import './styles/App.css';
import { Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.js'
import RegisterPage from './components/RegisterPage.js'
import RegisterClinic from './components/RegisterClinic.js'
import PatientInfo from './components/PatientInfo.js'
import EditPatientInfo from './components/EditPatientInfo.js'


import './styles/App.css';
import ClinicCentAdmin from './components/ClinicCentAdmin.js';
import CCPerson from './components/CCPerson.js';
import EditClinicProfile from './components/EditClinicProfile.js';
import EditClinicAdminProfile from './components/EditClinicAdminProfile.js';
import EditPatientPassword from './components/EditPatientPassword.js'

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/registerClinic" component={RegisterClinic}/>
      <Route path="/clinicCentAdmin" component={CCPerson}/>
      <Route path="/editClinicProfile" component={EditClinicProfile}/>
      <Route path="/editClinicAdminProfile" component={EditClinicAdminProfile} />

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
