import React, { useCallback, useEffect, useState } from "react";
import propTypes from "prop-types";

const EventDate = ({ date, event, onSelectEvent }) => {
  const [eventThumb, setThumb] = useState(null);

  useEffect(() => {
    if (event) {
      import(`../assets/${event.imageFilenameThumb}.webp`).then((img) =>
        setThumb(img.default)
      );
    }
  }, [event]);

  const handleSelectEvent = useCallback(() => {
    if (!event) return;
    onSelectEvent({ date, event });
  }, [date, event]);

  return (
    <button className="date-text" onClick={handleSelectEvent}>
      <h4 className={`date ${eventThumb ? "has-event" : ""}`}>{date}</h4>
      {eventThumb && <img className="event-thumb" src={eventThumb} />}
    </button>
  );
};

EventDate.propTypes = {
  date: propTypes.string,
  event: propTypes.object,
  onSelectEvent: propTypes.func,
};

export default EventDate;
