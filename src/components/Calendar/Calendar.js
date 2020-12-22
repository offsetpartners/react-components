import moment from "moment";
import { memo } from "react";
import PropTypes from "prop-types";
import Week from "./components/Week";
import Header from "./components/Header";
import CalendarProvider from "./provider";
import DaysLabel from "./components/DaysLabel";

const Calendar = memo((props) => {
  const { view } = props;
  return (
    <CalendarProvider {...props}>
      <div className="fig-calendar-wrapper">
        <table className="fig-calendar-table">
          <thead className="fig-calendar-header">
            <tr className="fig-calendar-header-row">
              <th className="fig-calendar-header-cell">
                <Header />
              </th>
            </tr>
          </thead>

          {view === "month" && (
            <tbody className="fig-calendar-body">
              <tr className="fig-calendar-container">
                <DaysLabel />
              </tr>

              <tr className="fig-calendar-container">
                <Week />
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </CalendarProvider>
  );
});

Calendar.displayName = "Calendar";
Calendar.defaultProps = {
  view: "month",
  maxDate: moment().add(5, "y").endOf("year").toDate(),
  daysLabelType: "narrow",
  headerComponents: {
    day: {
      left: ["previousWeek", "previousDay"],
      right: ["nextDay", "nextWeek"],
    },
    month: {
      left: ["previousYear", "previousMonth"],
      right: ["nextMonth", "nextYear"],
    },
  },
};
Calendar.propTypes = {
  /**
   * Max Date
   */
  maxDate: PropTypes.instanceOf(Date),

  /**
   * Selected Date
   */
  selected: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
  /**
   * Setter for Selected Date
   */
  setSelected: PropTypes.func,

  /**
   * If provided you must also provide setter fns and year prop
   * to allow the Component to be Controlled.
   */
  month: PropTypes.number,
  /**
   * Setter function for Month
   */
  setMonth: PropTypes.func,

  /**
   * If provided you must also provide setter fns and month prop
   * to allow the Component to be Controlled.
   */
  year: PropTypes.number,
  /**
   * Setter function for Year
   */
  setYear: PropTypes.func,

  /**
   * Error callback
   *
   * @param {String} error
   */
  onError: PropTypes.func,

  /**
   * Callback for when a cell is clicked
   *
   * @param {Date} date
   */
  onCellClick: PropTypes.func,

  /**
   * Callback for when Date Changes
   *
   * @param {Number} month <br />
   * @param {Number} year <br />
   * @param {Function} forceUpdate Force Component to re-render. Example after running a Network Request.
   */
  onDateChange: PropTypes.func,

  /**
   * Check a Data Source to indicate whether Date has an Event.
   * If nothing is provided then Event Indicator will not render.
   */
  doesCellHaveEvent: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

  /**
   * Control what DaysLabel renders
   *
   * @example type="long" -> Monday, type="short" -> Mon, type="narrow" -> M
   */
  daysLabelType: PropTypes.oneOf(["long", "short", "narrow"]),

  /**
   * Control what is displayed on the Header
   *
   */
  headerComponents: PropTypes.shape({
    month: PropTypes.shape({
      left: PropTypes.arrayOf(
        /**
         *
         * @enum {("nextYear"|"nextMonth"|"previousYear"|"previousMonth")}
         */
        PropTypes.oneOf([
          "nextYear",
          "nextMonth",
          "previousYear",
          "previousMonth",
        ])
      ),
      right: PropTypes.arrayOf(
        /**
         *
         * @enum {("nextYear"|"nextMonth"|"previousYear"|"previousMonth")}
         */
        PropTypes.oneOf([
          "nextYear",
          "nextMonth",
          "previousYear",
          "previousMonth",
        ])
      ),
    }),
    day: PropTypes.shape({
      left: PropTypes.arrayOf(
        /**
         *
         * @enum {("nextWeek"|"nextDay"|"previousWeek"|"previousDay")}
         */
        PropTypes.oneOf(["nextWeek", "nextDay", "previousWeek", "previousDay"])
      ),
      right: PropTypes.arrayOf(
        /**
         *
         * @enum {("nextWeek"|"nextDay"|"previousWeek"|"previousDay")}
         */
        PropTypes.oneOf(["nextWeek", "nextDay", "previousWeek", "previousDay"])
      ),
    }),
  }),

  /**
   * The type of View to render
   *
   * @todo Create more views, ie: "week", etc.
   */
  view: PropTypes.oneOf(["day", "month"]),

  /**
   * Generate Custom Classname depending on the day
   *
   * @param {Date} date
   */
  generateClassNames: PropTypes.func,
};
export default Calendar;
