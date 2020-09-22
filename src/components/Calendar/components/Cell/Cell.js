import PropTypes from "prop-types";
import React, { memo } from "react";
/**
 *
 * @param {Boolean} active
 * @param {Boolean} isToday
 * @param {Boolean} isLastWeek
 */
const getCellClass = (active, isToday, isLastWeek) => {
  const className = ["fig-calendar-cell"];
  if (isToday) {
    className.push("fig-calendar-cell-today");
  }

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

const Cell = ({
  active,
  selected,
  children,
  onClick,
  isToday,
  hasEvent,
  isLastWeek,
}) => {
  const eventClassName = ["fig-calendar-event-indicator"];

  hasEvent
    ? eventClassName.push("fig-calendar-event-active")
    : eventClassName.push("fig-calendar-event-inactive");
  return (
    <td
      className={getCellClass(active, isToday && !selected, isLastWeek)}
      onClick={() => {
        if (onClick && typeof onClick === "function") onClick();
      }}
    >
      <div className="fig-calendar-grid-wrapper">
        <div className={getGridClass(active, selected)}>
          <div className="fig-calendar-day-wrapper">
            <div className="fig-calendar-day-cell">
              <span className="fig-calendar-day">{children}</span>
            </div>
            <span className={eventClassName.join(" ")} />
          </div>
        </div>
      </div>
    </td>
  );
};

Cell.propTypes = {
  active: PropTypes.bool,
  isToday: PropTypes.bool,
  selected: PropTypes.bool,
  isLastWeek: PropTypes.bool,

  onClick: PropTypes.func,
  hasEvent: PropTypes.bool,
};

Cell.defaultProps = {
  active: false,
  isToday: false,
  hasEvent: false,
  selected: false,
  isLastWeek: false,
};

export default memo(Cell);
