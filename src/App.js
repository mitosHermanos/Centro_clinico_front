import React from 'react';
import './styles/App.css';
import { Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.js'
import RegisterPage from './components/RegisterPage.js'
import RegisterClinic from './components/RegisterClinic.js'
import PatientInfo from './components/PatientInfo.js'


import './styles/App.css';
import ClinicCentAdmin from './components/ClinicCentAdmin.js';
import CCPerson from './components/CCPerson.js';
import EditClinicProfile from './components/EditClinicProfile.js';
import EditClinicAdminProfile from './components/EditClinicAdminProfile.js';
import ViewBusinessReportPage from './components/ViewBusinessReportPage.js';
import EnterDiagnosis from './components/EnterDiagnosis.js';
import EnterMedicine from './components/EnterMedicine.js';

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
      <Route path="/newDiagnosis" component={EnterDiagnosis} />
      <Route path="/newMedicine" component={EnterMedicine}/>
    </div>
  );
}

export default App;
