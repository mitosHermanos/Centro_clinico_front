import React from 'react';
<<<<<<< HEAD
=======
import logo from './logo.svg';
import './App.css';
>>>>>>> 2fe75bd2c1180ffa69ae815d12d6c77f25a07754
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
<<<<<<< HEAD
=======

>>>>>>> 2fe75bd2c1180ffa69ae815d12d6c77f25a07754

function App() {
  return (
    <div className="App">
<<<<<<< HEAD

=======
>>>>>>> 2fe75bd2c1180ffa69ae815d12d6c77f25a07754
      <Route exact path="/" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/patientInfo" component={PatientInfo} />
      <Route exact path="/" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/registerClinic" component={RegisterClinic}/>
      <Route path="/clinicCentAdmin" component={CCPerson}/>
      <Route path="/editClinicProfile" component={EditClinicProfile}/>
      <Route path="/editClinicAdminProfile" component={EditClinicAdminProfile} />
    </div>
  );
}

export default App;
