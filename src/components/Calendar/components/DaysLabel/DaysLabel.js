import PropTypes from "prop-types";
import React, { memo } from "react";
import { GET_WEEKDAYS } from "components/Calendar/lib/constants";

const DaysLabel = ({ type }) => {
  return GET_WEEKDAYS(type).map((day, index) => {
    return (
      <td key={`${day}-${index}`} className="fig-calendar-days-label">
        <span className="fig-label-title">{day}</span>
      </td>
    );
  });
};

DaysLabel.propTypes = {
  type: PropTypes.oneOf(["long", "short", "narrow"]),
};

DaysLabel.defaultProps = {
  type: "short",
};

export default memo(DaysLabel);
