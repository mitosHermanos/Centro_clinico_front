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
import PrescriptionTable from './components/PrescriptionTable';
import CCAdminDecline from './components/CCAdminDecline';
import PatientClinicList from './components/PatientClinicList';
import ClinicInfo from './components/ClinicInfo';
import ScheduleDoctor from './components/ScheduleDoctor'
import PredefineCheckupPage from './components/PredefineCheckupPage.js';
import PredefinedCheckups from './components/PredefinedCheckups';
import PastCheckupsPatient from './components/PastCheckupsPatient';
import ScheduleRoomPage from './components/ScheduleRoomPage';
import PatientListNurse from './components/PatientListNurse';
import PatientList from './components/PatientList'
import MedicalRecord from './components/MedicalRecord';
import DoctorInfo from './components/DoctorInfo';
import EditDoctorInfo from './components/EditDoctorInfo';
import EditDoctorPassword from './components/EditDoctorPassword';
import PatientSearchPage from './components/PatientSearchPage';
import PatientMedicalRecord from './components/PatientMedicalRecord'
import AbsenceRequestPage from './components/AbsenceRequestPage';
import ApproveAbsenceRequestPage from './components/ApproveAbsenceRequestPage';
import EditClinicAdminPassword from './components/EditClinicAdminPassword';
import ClinicAdminInfo from './components/ClinicAdminInfo'

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
      <Route path="/patientListNurse" component={PatientListNurse} />
      <Route path="/searchRooms" component={RoomSearchPage}/>
      <Route path="/seeRoomSchedule" component={RoomSearchPage}/>

      <Route path="/patientListBeta" component={PatientList}/>

      <Route path="/searchDoctors" component={DoctorSearchPage}/>
      <Route path="/searchCheckupTypes" component={CheckupTypeSearchPage}/>
      <Route path="/searchCheckupDates" component={CheckupDateSearchPage}/>
      <Route path="/registerClinicCentAdmin" component={RegisterClinicCentAdmin}/>

      <Route path="/reportDiagnosis/:id" component={Report}/>
      <Route path="/medicalRecord/:id" component={MedicalRecord}/>
      
      <Route path="/addToReport" component={ReportDiagnosis}/>
      <Route path="/home" component={Homepage}/>
      <Route path="/activated" component={AccountActivated}/>
      <Route path="/prescriptionTable" component={PrescriptionTable}/>
      <Route path="/decline/:id" component={CCAdminDecline}/>
      <Route path="/clinicsList" component={PatientClinicList}/>      
      <Route path="/patientList" component={PatientListNurse}/>      
      <Route path="/scheduleDoctors" component={DoctorSearchPage}/>
      <Route path="/doctorsInClinic/:id" component={ScheduleDoctor}/>
      <Route path="/predefineCheckup" component={PredefineCheckupPage}/>
      <Route path="/predefinedList/:id" component={PredefinedCheckups}/>
      <Route path="/pastCheckups" component={PastCheckupsPatient}/>
      <Route path="/scheduleRooms" component={ScheduleRoomPage}/>
      <Route path="/searchPatients" component={PatientSearchPage}/>
      <Route path="/patientMedicalRecord" component={PatientMedicalRecord}/>
      <Route path="/createAbsenceRequest" component={AbsenceRequestPage}/>
      <Route path="/pendingAbsenceRequests" component={ApproveAbsenceRequestPage}/>

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

      <Route
        path="/doctorProfile"
        render={({ match: { url } }) => (
        <>
          <Route path={`${url}/`} component={DoctorInfo} exact />
          <Route path={`${url}/edit`} component={EditDoctorInfo} />
          <Route path={`${url}/password`} component={EditDoctorPassword} />
        </>
        )}
      />

      <Route
        path="/clinicAdminProfile"
        render={({ match: { url } }) => (
        <>
          <Route path={`${url}/`} component={ClinicAdminInfo} exact />
          <Route path={`${url}/edit`} component={EditClinicAdminProfile} />
          <Route path={`${url}/password`} component={EditClinicAdminPassword} />
        </>
        )}
      />

      <Route path="/clinicInfo/:id" component={ClinicInfo}/>

    </div>
  );
}

export default App;
