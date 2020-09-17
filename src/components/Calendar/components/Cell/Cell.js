import { Space, Typography } from "antd";
import React, { memo } from "react";
/**
 *
 * @param {Object} styles
 * @param {Boolean} active
 */
const getCellClass = (active) => {
  if (active) {
    return "fig-calendar-cell fig-calendar-cell-active";
  }

  return "fig-calendar-cell fig-calendar-cell-inactive";
};

/**
 *
 * @param {Object} styles
 * @param {Boolean} active
 * @param {Boolean} selected
 */
const getGridClass = (active, selected) => {
  if (active && selected) {
    return "fig-calendar-grid fig-calendar-grid-active fig-calendar-grid-selected";
  } else if (active) {
    return "fig-calendar-grid fig-calendar-grid-active";
  }

  return "fig-calendar-grid fig-calendar-grid-inactive";
};

export default memo(({ active, selected, children, onClick }) => {
  return (
    <td
      className={getCellClass(active)}
      onClick={() => {
        if (onClick && typeof onClick === "function") onClick();
      }}
    >
      <div className="fig-calendar-grid-wrapper">
        <div className={getGridClass(active, selected)}>
          <Space direction="vertical" className="fig-calendar-day-wrapper">
            <div className="fig-calendar-day-cell">
              <p className="fig-calendar-day">{children}</p>
            </div>

            <div className="fig-calendar-event-indicator"></div>
          </Space>
        </div>
      </div>
    </td>
  );
});
