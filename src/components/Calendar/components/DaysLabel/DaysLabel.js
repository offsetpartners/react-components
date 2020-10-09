import React, { memo } from "react";
import { useCalendar } from "components/Calendar/provider";
import { GET_WEEKDAYS } from "components/Calendar/lib/constants";

const DaysLabel = () => {
  const { daysLabelType } = useCalendar();
  return GET_WEEKDAYS(daysLabelType).map((day, index) => {
    return (
      <td key={`${day}-${index}`} className="fig-calendar-days-label">
        <span className="fig-label-title">{day}</span>
      </td>
    );
  });
};

export default memo(DaysLabel);
