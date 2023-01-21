import React from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

export const MyCalender = ({ handleSelect, selectionRange }) => {
  return (
    <DateRange
      minDate={new Date()}
      ranges={selectionRange}
      onChange={handleSelect}
    />
  );
};
