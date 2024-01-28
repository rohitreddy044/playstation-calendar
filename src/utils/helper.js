import { format } from "date-fns";

const FETCH_EVENTS_URL = "https://amock.io/api/playstation-calendar-events";

export const getDayName = (dt) => format(dt, "EEEE");

export const getFilledArray = (size) => Array(size).fill();
export const getFormattedDate = (dt) => format(dt, "dd-MM-yyyy");
export const mapDataByDate = (data) =>
  data.reduce((acc, curr) => {
    const dt = getFormattedDate(curr.launchDate);
    return { ...acc, [dt]: curr };
  }, {});

export const fetchEvents = () =>
  fetch(FETCH_EVENTS_URL).then((res) => res.json());
