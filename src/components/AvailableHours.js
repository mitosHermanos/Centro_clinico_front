import React, {useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);


function AvailableHours({passedDate, shift, events}){
    
    const [date, setDate] = useState(new Date());

    function parseDate(input) {
        var parts = input.split('-');
        return new Date(parts[0], parts[1]-1, parts[2]);
    }

    useEffect(() => {
        setDate(parseDate(passedDate));
    }, [passedDate])     

    useEffect(() => {
        console.log(events)
    }, [events])    

    return(
        <div style={{height: '100vh', margin: '10px'}}>
            <Calendar
                selectable
                localizer={localizer}
                events={events}
                views={['day', 'week', 'month']}
                defaultView={"day"}
                date={date}
                onNavigate={date => setDate(date)}
                step={15}
                timeslots={1}
                min = {!shift ? new Date() : new Date(0, 0, 0, shift.startTime[0], shift.startTime[1], 0)}
                max = {!shift ? new Date() : new Date(0, 0, 0, shift.endTime[0], shift.endTime[1]-1, 59)}
            />
        </div>
    )
} export default AvailableHours;