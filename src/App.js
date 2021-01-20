import React, { useState } from 'react';
import { Calendar } from './Calendar';
import moment from "moment";
import "./index.css"

const fakeEvents = [{
    date: "Wed Jan 27 2021",
    title: 'Trash day!',
}, {
    date: new Date(),
    title: 'Other stuff',
},{
    date: "Fri Oct 8 2021",
    title: 'My birthday!',
},{
    date: "Tues Feb 2 2021",
    title: 'Birthday mom!',
},{
    date: "Thu Dec 31 2020",
    title: 'Bye 2020!',
}
];

export const App = () => {

    const events = useState(fakeEvents);           // [eventSate, setEventState]
    const [value, setValue] = useState(moment()); // today
    
    return (
        <div>
            <Calendar
            value={value}
            onChange={setValue}
            events={events}
            />
        </div>
    );
}
