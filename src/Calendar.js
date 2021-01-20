// Work your magic here!
import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import Header from "./Header"
import dayStyles from "./styles"
import "./index.css";

export const Calendar = ({ value, onChange, events, startingDate, onClickDate }) => {
    const [calendar, setCalendar] = useState([]);         // weeks and days
    // const value = moment()
    const startDay = useMemo(() => value.clone().startOf("month").startOf("week"), [value]); //Use Memo actua la primera vez y luego solo si cambia value
    const endDay =  useMemo(() => value.clone().endOf("month").endOf("week"), [value]);

    useEffect(() => {
        const day = startDay.clone().subtract(1, "day");      // subtract Muta el momento original restando tiempo.
        const array = [];

        while (day.isBefore(endDay, "day")) {                 //isBefore Comprueba si un momento es anterior a otro
            array.push(
                Array(7).fill(0).map(() => day.add(1, "day").clone())
            );
        }

        setCalendar(array);
    }, [value,endDay,startDay]);

    return (
        <div className="calendar">
            <Header value={value} setValue={onChange} />
            <div className="container">
                <div className="dayNames">
                    {
                        ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"].map(e => <div className="week">{e}</div>)
                    }
                </div>
                {calendar.map((week, weekIndex) => (
                    <div key={weekIndex}>
                        {week.map((day, dayIndex) => (
                            <div key={dayIndex} className="day" onClick={() => onChange(day)}>
                                <div className={dayStyles(day, value)}>

                                    {day.format("D").toString()}
                                    {events[0].filter(event => day.format("DD,MM,YY").toString() === (new moment(event.date)).format("DD,MM,YY").toString())?.map
                                        ((event,eventIndex) => <label key={eventIndex} className="event"> {event.title}</label>)}
                                    {/* traigo los eventos */}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}