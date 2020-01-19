import React from 'react';
import './styles/App.css';
import { Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.js'
import RegisterPage from './components/RegisterPage.js'
import RegisterClinic from './components/RegisterClinic.js'
import PatientInfo from './components/PatientInfo.js'
import EditPatientInfo from './components/EditPatientInfo.js'
import EditPatientPassword from './components/EditPatientPassword.js'
import CCPerson from './components/CCPerson.js';
import EditClinicProfile from './components/EditClinicProfile.js';
import EditClinicAdminProfile from './components/EditClinicAdminProfile.js';
import ViewBusinessReportPage from './components/ViewBusinessReportPage.js';
import EnterDiagnosis from './components/EnterDiagnosis.js';
import EnterMedicine from './components/EnterMedicine.js';
import RegisterDoctorPage from './components/RegisterDoctorPage.js';
import RoomSearchPage from './components/RoomSearchPage.js';
import DoctorSearchPage from './components/DoctorSearchPage.js';
import CheckupTypeSearchPage from './components/CheckupTypeSearchPage';
import CheckupDateSearchPage from './components/CheckupDateSearchPage';
import Report from './components/Report'
import RegisterClinicCentAdmin from './components/RegisterClinicCentAdmin';
import ReportDiagnosis from './components/ReportDiagnosis';
import AccountActivated from './components/AccountActivated';
import Homepage from './components/Homepage';
import PatientClinicList from './components/PatientClinicList';

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
      <Route path="/registerDoctor" component={RegisterDoctorPage} />
      <Route path="/searchRooms" component={RoomSearchPage}/>
      <Route path="/searchDoctors" component={DoctorSearchPage}/>
      <Route path="/searchCheckupTypes" component={CheckupTypeSearchPage}/>
      <Route path="/searchCheckupDates" component={CheckupDateSearchPage}/>
      <Route path="/registerClinicCentAdmin" component={RegisterClinicCentAdmin}/>
      <Route path="/report" component={Report}/>
      <Route path="/addToReport" component={ReportDiagnosis}/>
      <Route path="/home" component={Homepage}/>
      <Route path="/activated" component={AccountActivated}/>
      <Route path="/clinicsList" component={PatientClinicList}/>
      <Route path="/scheduleClinics" component={PatientClinicList}/>

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
