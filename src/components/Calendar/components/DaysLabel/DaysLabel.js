import { Typography } from "antd";
import React, { memo } from "react";
import { GET_WEEKDAYS } from "components/Calendar/lib/constants";

export default memo(({ type = "narrow" }) => {
  return GET_WEEKDAYS(type).map((day, index) => {
    return (
      <td key={`${day}-${index}`} className="fig-calendar-days-label">
        <Typography.Text className="fig-calendar-days-label-text">
          {day}
        </Typography.Text>
      </td>
    );
  });
});
