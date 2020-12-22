import moment from "moment";

export const MONTHS = [
  { code: "JAN", displayName: "January" },
  { code: "FEB", displayName: "February" },
  { code: "MAR", displayName: "March" },
  { code: "APR", displayName: "April" },
  { code: "MAY", displayName: "May" },
  { code: "JUN", displayName: "June" },
  { code: "JUL", displayName: "July" },
  { code: "AUG", displayName: "August" },
  { code: "SEP", displayName: "September" },
  { code: "OCT", displayName: "October" },
  { code: "NOV", displayName: "November" },
  { code: "DEC", displayName: "December" },
];

export const WEEKS_ARRAY = [0, 1, 2, 3, 4, 5];
export const DAYS_ARRAY = [0, 1, 2, 3, 4, 5, 6];

export const MIN_YEAR = moment().subtract(100, "years").year();

/**
 * @param {Number|Null} maxYear
 * @returns {Array<number>} YEARS
 */
export const YEARS_ARRAY = (maxYear) => {
  const year = new Date().getFullYear() + 5;
  const len =
    typeof maxYear === "undefined"
      ? year - MIN_YEAR + 1
      : maxYear - MIN_YEAR + 1;
  return Array.from(new Array(len), (val, index) => MIN_YEAR + index).reverse();
};

/**
 * @param {"long"|"short"|"narrow"} type
 */
export const GET_WEEKDAYS = (type = "short") => {
  switch (type) {
    case "long":
      return [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
    case "narrow":
      return ["S", "M", "T", "W", "T", "F", "S"];
    default:
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  }
};

export const ERRORS = {
  /**
   *
   * @param {Dat} maxDate
   */
  maxDate: (maxDate) =>
    `Cannot exceed the max date of ${moment(maxDate).format("MMM D, YYYY")}`,
};
