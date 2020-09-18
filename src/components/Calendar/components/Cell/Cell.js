import React, { memo } from "react";
/**
 *
 * @param {Object} styles
 * @param {Boolean} active
 */
const getCellClass = (active, isLastWeek) => {
  const className = ["fig-calendar-cell"];
  if (isLastWeek) {
    className.push("fig-calendar-cell-last-week");
  }

  if (active) {
    className.push("fig-calendar-cell-active");
  } else {
    className.push("fig-calendar-cell-inactive");
  }

  return className.join(" ");
};

/**
 *
 * @param {Object} styles
 * @param {Boolean} active
 * @param {Boolean} selected
 */
const getGridClass = (active, selected) => {
  const className = ["fig-calendar-grid"];
  if (active && selected) {
    className.push("fig-calendar-grid-active", "fig-calendar-grid-selected");
  } else if (active && !selected) {
    className.push("fig-calendar-grid-active");
  } else if (!active) {
    className.push("fig-calendar-grid-inactive");
  }

  return className.join(" ");
};

export default memo(({ active, selected, children, onClick, isLastWeek }) => {
  return (
    <td
      className={getCellClass(active, isLastWeek)}
      onClick={() => {
        if (onClick && typeof onClick === "function") onClick();
      }}
    >
      <div className="fig-calendar-grid-wrapper">
        <div className={getGridClass(active, selected)}>
          <div className="fig-calendar-day-wrapper">
            <div className="fig-calendar-day-cell">
              <p className="fig-calendar-day">{children}</p>
            </div>

            <div className="fig-calendar-event-indicator"></div>
          </div>
        </div>
      </div>
    </td>
  );
});
