import React from 'react';
//import axios from 'axios';
//import Header from '../../Header/Header';
//import './DoctorCalendar.css'
//import Footer from '../../Footer/Footer';
import { withRouter } from 'react-router';
import {serviceConfig} from '../appSettings.js'
import {
  Calendar,
  DateLocalizer,
  momentLocalizer,
  globalizeLocalizer,
  move,
  Views,
  Navigate,
  components,
} from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const CustomEvent = (event) => { 
  return ( 

  <span><strong style={{ color: 'orange' }}>{event.event.title}</strong><em><br></br> Ordination: {event.event.ordination}
  <br></br> Patient: {event.event.patient} </em></span> 
  ) 
}

class DoctorCalendar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
            appointments: [],
            dog: [
                  {
                  start: Date,
                  end: Date,
                  }
              ],
           
    }
  }

  renderDates = () =>{

    // let appointments = [...this.state.appointments];


    // for (var i = 0; i < appointments.length; i++){
    //   appointments[i].start = new Date(appointments[i].start);
    //   //appointments[i].end = new Date(appointments[i].end);
    //   //this.state.dog[i].start = new Date(appointments[i].startTime);
    //   //this.state.dog[i].end = new Date(appointments[i].endTime);
    //   console.log(appointments[i].strat);
    //   //this.setState({appointments});
    // }
    // //console.log(this.state.dog);
    

    for (var i = 0; i < this.state.appointments.length; i++){
      this.state.appointments[0].start = '2020-02-15';
      this.state.appointments[0].end = '2020-02-16';
      this.state.appointments[i].description = 'Event'; 
      console.log(this.state.appointments[i].start);
      //this.setState({appointments});
    }
    //console.log(this.state.dog);
  }
  componentDidMount(){
    this.getCheckups();
}

getCheckups(){
    const token = JSON.parse(localStorage.getItem('token'));
        const requestOptions = {
           method: 'GET',
           headers: {
                       'Content-Type': 'application/json',
                       'Authorization' : `Bearer ${token.accessToken}`
        }
       };
  
       fetch(`${serviceConfig.baseURL}/clinicalCenterAdministrator/getCheckups`, requestOptions)
          .then(response => {
              return response.json();
          })
          .then((data)=>{
             this.setState({appointments : data});
             console.log(this.state.appointments);
             //this.renderDates();
          })
          .catch(response=>{
            //  const promise = Promise.resolve(response.json());
            //  promise.then(data => {
            //     alert(data.messege);
            //  })
          })
}
  render() {
    console.log(this.state.appointments);
        return (
          <div className="DoctorCalendar">
            {/* <Header/> */}
            <div className="cal" style={{ height: '500pt'}}>
            <Calendar
              showMultiDayTimes={true}
              selectable
              localizer={localizer}
              events={this.state.appointments}
              components={{event:CustomEvent}, { agenda: { event: CustomEvent } }}

              style={{ maxHeight: "100%" }}
              onSelectEvent={obj => {
                 window.location.href='/checkupInfo/'+obj.id;
                }
              }
              startAccessor="start"
              endAccessor="end"
            />
            </div>
            {/* <Footer/> */}
          </div>
        )
  }
}

export default withRouter (DoctorCalendar);