import moment from "moment";
import { useDebounce } from "react-use";
import {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";
import { ERRORS } from "./lib/constants";

/**
 * Hook to debounce onDateChange
 * @param {Number} month
 * @param {Number} year
 * @param {Boolean} mounted
 * @param {Function|Null} onDateChange
 * @param {Function} forceUpdate
 */
const useDateChange = (month, year, mounted, onDateChange, forceUpdate) => {
  return useDebounce(
    () => {
      if (mounted && onDateChange && typeof onDateChange === "function") {
        onDateChange(month, year, () => forceUpdate());
      }
    },
    350,
    [month, year]
  );
};

/**
 * Hook to run on Calendar Mount
 * @param {Fuction} cancel
 * @param {Function} setMounted
 */
const useCalendarMount = (cancel, setMounted) => {
  return useEffect(() => {
    // Cancel onDateChange Debounce on Mount
    cancel();
    setMounted(true);

    return () => setMounted(false);
  }, []);
};

const CalendarContext = createContext({
  // UI
  view: "",
  maxDate: new Date(),
  daysLabelType: "narrow",
  defaultClassNames: {
    cell: "",
    grid: "",
    wrapper: "",
    day: {
      cell: "",
      index: "",
      wrapper: "",
    },
  },
  generateClassNames: undefined,
  headerComponents: {
    calendar: {
      left: ["previousYear", "previousMonth"],
      right: ["nextMonth", "nextYear"],
    },
    day: {
      left: ["previousWeek", "previousDay"],
      right: ["nextDay", "nextWeek"],
    },
  },

  // Component Wide State
  selected: new Date(),
  setSelected: () => {},
  month: 0,
  setMonth: () => {},
  year: 0,
  setYear: () => {},

  // Cell Specific props
  onCellClick: () => {},
  doesCellHaveEvent: () => {},
});

const CalendarProvider = ({
  // State Props
  selected,
  setSelected,
  month,
  setMonth,
  year,
  setYear,

  // Handler props
  onError,
  onCellClick,
  onDateChange,
  doesCellHaveEvent,

  // UI Props
  view,
  maxDate,
  children,
  daysLabelType,
  headerComponents,
  generateClassNames,
}) => {
  // Internal
  /**
   * @type {Date}
   */
  const _maxDate =
    typeof maxDate !== "undefined" && maxDate instanceof Date
      ? maxDate
      : moment().add(5, "year").endOf("year").toDate();
  const defaultClassNames = {
    cell: "",
    grid: "",
    wrapper: "",
    day: {
      cell: "",
      index: "",
      wrapper: "",
    },
  };
  const [updater, updateState] = useState();
  const [mounted, setMounted] = useState(false);

  // Default State Setter
  const [_selected, _setSelected] = useState(new Date());
  const [_month, _setMonth] = useState(moment().month());
  const [_year, _setYear] = useState(moment().year());
  let actualSelected = _selected,
    actualMonth = _month,
    actualYear = _year;
  if (typeof selected !== "undefined") {
    actualSelected = selected;
  }
  if (typeof month !== "undefined") {
    actualMonth = month;
  }
  if (typeof year !== "undefined") {
    actualYear = year;
  }

  // Handler Functions
  const handleYearChange = useCallback((v) => {
    let setterFn = _setYear;

    if (setYear && typeof setYear === "function") setterFn = setYear;

    if (actualMonth > _maxDate.getMonth() && v >= _maxDate.getFullYear()) {
      setterFn(_maxDate.getFullYear());
      handleMonthChange(_maxDate.getMonth());
      typeof onError === "function" && onError(ERRORS.maxDate(_maxDate));
      return;
    }

    if (v > _maxDate.getFullYear()) {
      setterFn(_maxDate.getFullYear());
      typeof onError === "function" && onError(ERRORS.maxDate(_maxDate));
      return;
    }

    setterFn(v);
  });
  const handleMonthChange = useCallback((v) => {
    let _v = v;
    let setterFn = _setMonth;
    if (typeof setMonth === "function") setterFn = setMonth;

    if (_v > _maxDate.getMonth() && actualYear >= _maxDate.getFullYear()) {
      setterFn(_maxDate.getMonth());
      typeof onError === "function" && onError(ERRORS.maxDate(_maxDate));
      return;
    }

    if (v < 0) {
      _v = 11;
      handleYearChange((y) => y - 1);
    } else if (v > 11) {
      _v = 0;
      handleYearChange((y) => y + 1);
    }

    setterFn(_v);
  });
  const handleCellSelect = useCallback((v) => {
    let setterFn = _setSelected;
    if (typeof setSelected === "function") setterFn = setSelected;

    if (v > _maxDate) {
      setterFn(_maxDate);
      typeof onError === "function" && onError(ERRORS.maxDate(_maxDate));
      return;
    }
    setterFn(v);
  });

  // Force Component to Re-render
  const forceUpdate = useCallback(() => {
    return updateState({});
  }, []);

  // Run useDateChange Hook
  const [, cancel] = useDateChange(
    actualMonth,
    actualYear,
    mounted,
    onDateChange,
    forceUpdate
  );
  // Run on Mount
  useCalendarMount(cancel, setMounted);
  const value = useMemo(
    () => ({
      // UI
      view,
      daysLabelType,
      headerComponents,
      defaultClassNames,
      maxDate: _maxDate,
      generateClassNames,

      // Component Wide State
      selected: actualSelected,
      setSelected: handleCellSelect,
      month: actualMonth,
      setMonth: handleMonthChange,
      year: actualYear,
      setYear: handleYearChange,

      // Cell Specific props
      onCellClick,
      doesCellHaveEvent,
    }),
    [
      updater,
      actualYear,
      actualMonth,
      actualSelected,
      doesCellHaveEvent,
      generateClassNames,
    ]
  );

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);

export default CalendarProvider;
