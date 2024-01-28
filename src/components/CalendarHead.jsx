import React, { useCallback } from "react";
import propTypes from "prop-types";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const CalendarHead = ({ month, year }) => {
  const navigate = useNavigate();

  const goToNextMonth = useCallback(() => {
    if (Number(month) === 12) {ß
      navigate(`/${Number(year) + 1}/1`);
      return;
    }
    navigate(`/${year}/${Number(month) + 1}`);
  }, [month, year, navigate]);

  const goToPrevMonth = useCallback(() => {
    if (Number(month) === 1) {
      navigate(`/${Number(year) - 1}/12`);
      return;
    }
    navigate(`/${year}/${Number(month) - 1}`);
  }, [month, year, navigate]);

  return (
    <div className="month-container">
      <button className="nav-button" onClick={goToPrevMonth}>
        <span className="arrow left" />
      </button>
      <h1 className="month-name">
        {format(new Date(`${year}/${month}/1`), "MMMM y")}
      </h1>
      <button className="nav-button" onClick={goToNextMonth}>
        <span className="arrow right" />
      </button>
    </div>
  );
};

CalendarHead.propTypes = {
  month: propTypes.string,
  year: propTypes.string
};

export default CalendarHead;
