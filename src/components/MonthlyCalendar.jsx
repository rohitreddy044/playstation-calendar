import {
  getDate,
  getDaysInMonth,
  isSameMonth,
  lastDayOfMonth,
  lastDayOfWeek,
} from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchEvents,
  getDayName,
  getFilledArray,
  getFormattedDate,
  mapDataByDate,
} from "../utils/helper";
import CalendarHead from "./CalendarHead";
import Days from "./Days";
import EventDate from "./EventDate";
import EventDetails from "./EventDetails";
import { daysOfWeek } from "./constants";

const MonthlyCalendar = () => {
  const { year, month } = useParams();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [listOfEvents, setListOfEvents] = useState({});

  const startOn = getDayName(new Date(year, Number(month) - 1, 1));
  const emptyDates = getFilledArray(daysOfWeek.indexOf(startOn));
  const formatDate = (dt) =>
    getFormattedDate(new Date(year, Number(month) - 1, dt));

  const totalDays = getDaysInMonth(new Date(year, Number(month) - 1));
  const datesOfMonth = getFilledArray(totalDays).map((v, k) => k + 1);

  const showAfterDate = useMemo(() => {
    if (!selectedEvent?.date || !selectedEvent?.event) {
      return 0;
    }
    const { event } = selectedEvent;
    const endOfWeek = lastDayOfWeek(event.launchDate);
    const endOfMonth = lastDayOfMonth(event.launchDate);
    if (isSameMonth(endOfMonth, endOfWeek)) {
      return getDate(endOfWeek);
    }
    return getDate(endOfMonth);
  }, [selectedEvent, month, year]);

  useEffect(() => {
    fetchEvents().then((data) => {
      if (!Array.isArray(data)) {
        setListOfEvents({});
        return;
      }
      const mappedData = mapDataByDate(data);
      setListOfEvents(mappedData);
    });
  }, []);

  useEffect(() => {
    setSelectedEvent(null);
  }, [month, year]);

  return (
    <div className="month-calendar-container">
      <CalendarHead month={month} year={year} />
      <Days />
      <div className="dates-container">
        {emptyDates.map((day) => (
          <span key={`empty-day-${day}`} className="empty-date" />
        ))}
        {datesOfMonth.map((date) => (
          <>
            <EventDate
              key={formatDate(date)}
              date={date}
              event={listOfEvents[formatDate(date)]}
              onSelectEvent={(data) =>
                setSelectedEvent((prev) =>
                  prev?.date === data?.date ? null : data
                )
              }
            />
            {showAfterDate === date && (
              <EventDetails
                key={`event-details-${date}-${month}`}
                event={selectedEvent.event}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default MonthlyCalendar;
