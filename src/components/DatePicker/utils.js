import moment from "moment";

/**
 * @param {"range"|"single"} type
 * @param {Number} maxDateRange
 * @param {Array.<String>} disabledPresets
 */
export const generateItems = (type, maxDateRange, disabledPresets = []) => {
  /**
   * @type {Array.<{key: String, label: String, date: moment.Moment|[moment.Moment, moment.Moment]}>} items
   */
  let items;
  const today = moment();
  if (type === "range") {
    const last2Days = [today.clone().subtract(2, "d"), today];
    const last3Days = [today.clone().subtract(3, "d"), today];
    const last7Days = [today.clone().subtract(7, "d"), today];
    const last10Days = [today.clone().subtract(10, "d"), today];
    const last30Days = [today.clone().subtract(30, "d"), today];
    const currentWeek = [today.clone().startOf("week"), today];
    const currentMonth = [today.clone().startOf("month"), today];
    const currentYear = [today.clone().startOf("year"), today];

    const _lastWeek = today.clone().subtract(1, "week");
    const lastWeek = [
      _lastWeek.clone().startOf("week"),
      _lastWeek.clone().endOf("week"),
    ];
    const _lastMonth = today.clone().subtract(1, "month");
    const lastMonth = [
      _lastMonth.clone().startOf("month"),
      _lastMonth.clone().endOf("month"),
    ];
    const _lastYear = today.clone().subtract(1, "year");
    const lastYear = [
      _lastYear.clone().startOf("year"),
      _lastYear.clone().endOf("year"),
    ];

    const currentQuarter = [today.clone().startOf("quarter"), today];
    const _lastQuarter = today.clone().subtract(1, "quarter");
    const lastQuarter = [
      _lastQuarter.clone().startOf("quarter"),
      _lastQuarter.clone().endOf("quarter"),
    ];
    const _quarterOne = today.clone().quarter(1);
    const quarterOne = [
      _quarterOne.clone().startOf("quarter"),
      _quarterOne.clone().endOf("quarter"),
    ];
    const _quarterTwo = today.clone().quarter(2);
    const quarterTwo = [
      _quarterTwo.clone().startOf("quarter"),
      _quarterTwo.clone().endOf("quarter"),
    ];
    const _quarterThree = today.clone().quarter(3);
    const quarterThree = [
      _quarterThree.clone().startOf("quarter"),
      _quarterThree.clone().endOf("quarter"),
    ];
    const _quarterFour = today.clone().quarter(4);
    const quarterFour = [
      _quarterFour.clone().startOf("quarter"),
      _quarterFour.clone().endOf("quarter"),
    ];
    items = [
      { key: "LAST_2_DAYS", label: "Last 2 Days", date: last2Days },
      { key: "LAST_3_DAYS", label: "Last 3 Days", date: last3Days },
      { key: "LAST_7_DAYS", label: "Last 7 Days", date: last7Days },
      { key: "LAST_10_DAYS", label: "Last 10 Days", date: last10Days },
      { key: "LAST_30_DAYS", label: "Last 30 Days", date: last30Days },
      { key: "LAST_WEEK", label: "Previous Week", date: lastWeek },
      { key: "LAST_MONTH", label: "Previous Month", date: lastMonth },
      { key: "LAST_QUARTER", label: "Previous Quarter", date: lastQuarter },
      { key: "LAST_YEAR", label: "Previous Year", date: lastYear },
      { key: "CURRENT_WEEK", label: "Week to Date", date: currentWeek },
      { key: "CURRENT_MONTH", label: "Month to Date", date: currentMonth },
      {
        date: currentQuarter,
        key: "CURRENT_QUARTER",
        label: "Quarter to Date",
      },
      { key: "CURRENT_YEAR", label: "Year to Date", date: currentYear },
      { key: "QUARTER_ONE", label: "1st Quarter", date: quarterOne },
      { key: "QUARTER_TWO", label: "2nd Quarter", date: quarterTwo },
      { key: "QUARTER_THREE", label: "3rd Quarter", date: quarterThree },
      { key: "QUARTER_FOUR", label: "4th Quarter", date: quarterFour },
    ];
  } else {
    const yesterday = today.clone().subtract(1, "d");
    const startOfWeek = today.clone().startOf("week");
    const endOfWeek = today.clone().endOf("week");
    const startOfMonth = today.clone().startOf("month");
    const endOfMonth = today.clone().endOf("month");
    const startOfQuarter = today.clone().startOf("quarter");
    const endOfQuarter = today.clone().endOf("quarter");
    items = [
      { key: "TODAY", label: "Today", date: today },
      { key: "YESTERDAY", label: "Yesterday", date: yesterday },
      { key: "START_OF_WEEK", label: "Start of Week", date: startOfWeek },
      { key: "END_OF_WEEK", label: "End of Week", date: endOfWeek },
      { key: "START_OF_MONTH", label: "Start of Month", date: startOfMonth },
      { key: "END_OF_MONTH", label: "End of Month", date: endOfMonth },
      {
        key: "START_OF_QUARTER",
        label: "Start of Quarter",
        date: startOfQuarter,
      },
      { key: "END_OF_QUARTER", label: "End of Quarter", date: endOfQuarter },
    ];
  }
  let filtered = items;

  if (type === "range" && maxDateRange) {
    filtered = items.filter((i) => {
      return i.date[1].diff(i.date[0], "days") + 1 <= maxDateRange;
    });
  }

  return filtered.filter((i) => !disabledPresets.includes(i.key));
};

/**
 * Get Preset from Selected Date
 * @param {"range"|"single"} type
 * @param {Array.<{key: String, label: String, date: moment.Moment}>} items
 * @param {moment.Moment|[moment.Moment]} value
 */
export const getPresetFromValue = (type, items, value) => {
  if (type === "range") {
    const _value = [moment(value[0]), moment(value[1])];

    return items.find(
      (i) =>
        _value[0].isSame(i.date[0], "d") && _value[1].isSame(i.date[1], "d")
    );
  } else {
    const _value = moment(value);
    return items.find((i) => _value.isSame(i.date, "d"));
  }
};

/**
 * @param {"range"|"single"} type
 * @param {{key: String, label: String, date: moment.Moment}} preset
 * @param {Function} setPreset
 */
export const getValueFromPreset = (type, preset, setPreset) => {
  setPreset(preset);

  if (type === "range") {
    const today = moment();

    if (preset && preset.date && Array.isArray(preset.date)) {
      return [preset.date[0].toDate(), preset.date[1].toDate()];
    }
    return [today.toDate(), today.clone().add(1, "d")];
  } else {
    return preset.date.toDate();
  }
};
