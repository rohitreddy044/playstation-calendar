import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import { format } from "date-fns";

const EventDetails = ({ event }) => {
  const [eventImg, setEventImg] = useState(null);

  useEffect(() => {
    if (event) {
      import(`../assets/${event.imageFilenameFull}.webp`).then((img) =>
        setEventImg(img.default)
      );
    }
  }, [event]);
  return (
    <div className="event-placeholder">
      <div className="event-details">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-summary">{event.summary}</p>
        <h5 className="event-date">
          Available {format(event.launchDate, "MMMM, dd yyyy")}
        </h5>
        <div className="event-btn-container">
          <a className="action-btn primary" href={event.learnMoreLink}>
            Learn More
          </a>
          <a className="action-btn secondary" href={event.purchaseLink}>
            Pre Order Now
          </a>
        </div>
      </div>
      <img src={eventImg} className="event-image" />
    </div>
  );
};

EventDetails.propTypes = {
  event: propTypes.object,
};

export default EventDetails;
