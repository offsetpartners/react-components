import moment from "moment";
import PropTypes from "prop-types";
import { memo } from "react";
import { useCalendar } from "components/Calendar/provider";
/**
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
 * @param {Boolean} active
 * @param {Boolean} selected
 */
const getGridClass = (active, selected) => {
  const className = ["fig-calendar-grid"];
  if (active) {
    className.push("fig-calendar-grid-active");
  } else {
    className.push("fig-calendar-grid-inactive");
  }

  if (selected) {
    className.push("fig-calendar-grid-selected");
  }

  return className.join(" ");
};

/**
 * @param {Boolean} selected
 * @param {Date} date
 */
const generateSelected = (selected, date) => {
  if (Array.isArray(selected)) {
    return (
      selected.filter((s) => moment(s).isSame(moment(date), "d")).length > 0
    );
  } else {
    return moment(selected).isSame(moment(date), "d");
  }
};

const hasClassnameGenerator = (generateClassNames, date) => {
  return typeof generateClassNames === "function"
    ? generateClassNames(date)
    : undefined;
};

const Cell = (props) => {
  const {
    date,
    active,
    isLastWeek,

    children,
  } = props;
  const {
    selected,
    onCellClick,
    setSelected,
    doesCellHaveEvent,
    defaultClassNames,
    generateClassNames,
  } = useCalendar();

  // Internal Properties
  const isToday = moment(date).isSame(moment(), "d");
  const isSelected = generateSelected(selected, date);
  const additionalClassNames = {
    ...defaultClassNames,
    ...hasClassnameGenerator(generateClassNames, date),
  };

  // Setup DayLabel
  const dayClassName = `fig-calendar-day ${
    (additionalClassNames &&
      additionalClassNames.day &&
      additionalClassNames.day.index) ||
    ""
  }`;
  const DayLabel = () => {
    return <span className={dayClassName}>{children}</span>;
  };

  // Setup Event Indicator
  const shouldRenderEvent =
    typeof doesCellHaveEvent !== undefined &&
    (typeof doesCellHaveEvent === "function" ||
      typeof doesCellHaveEvent === "boolean");
  const hasEvent = shouldRenderEvent && doesCellHaveEvent(date);
  const eventClassName = [
    "fig-calendar-event-indicator",
    additionalClassNames.event || "",
  ];
  if (hasEvent) {
    eventClassName.push("fig-calendar-event-active");
  } else {
    eventClassName.push("fig-calendar-event-inactive");
  }
  const EventIndicator = () => {
    return shouldRenderEvent && <span className={eventClassName.join(" ")} />;
  };

  // Setup Container ClassNames
  const cellClassName = `${getCellClass(
    active,
    isToday && !isSelected,
    isLastWeek
  )} ${additionalClassNames.cell}`;
  const wrapperClassName = `fig-calendar-grid-wrapper ${
    additionalClassNames.wrapper || ""
  }`;
  const gridClassName = `${getGridClass(active, isSelected)} ${
    additionalClassNames.grid || ""
  }`;
  const dayWrapperClassName = `fig-calendar-day-wrapper ${
    (additionalClassNames.day && additionalClassNames.day.wrapper) || ""
  }`;
  const dayCellClassName = `fig-calendar-day-cell ${
    (additionalClassNames.day && additionalClassNames.day.cell) || ""
  }`;

  return (
    <td
      className={cellClassName}
      onClick={() => {
        if (!active) return;
        if (onCellClick && typeof onCellClick === "function") onCellClick(date);
        setSelected(date);
      }}
    >
      <div className={wrapperClassName}>
        <div className={gridClassName}>
          <div className={dayWrapperClassName}>
            <div className={dayCellClassName}>
              <DayLabel />
            </div>
            <EventIndicator />
          </div>
        </div>
      </div>
    </td>
  );
};

Cell.propTypes = {
  active: PropTypes.bool,
  isLastWeek: PropTypes.bool,
  date: PropTypes.instanceOf(Date).isRequired,
};

Cell.defaultProps = {
  active: false,
  date: undefined,
  isLastWeek: false,
};

export default memo(Cell);
