import moment from "moment";
import { useDebounce } from "react-use";
import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";

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
    left: ["previousYear", "previousMonth"],
    right: ["nextMonth", "nextYear"],
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

  // Data fetching Props
  onCellClick,
  onDateChange,
  doesCellHaveEvent,

  // UI Props
  children,
  daysLabelType,
  headerComponents,
  generateClassNames,
}) => {
  // Internal
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
  const [, updateState] = useState();
  const [mounted, setMounted] = useState(false);

  // Default State Setter
  const [_selected, _setSelected] = useState(new Date());
  const [_month, _setMonth] = useState(moment().month());
  const [_year, _setYear] = useState(moment().year());

  // Handler Functions
  const handleYearChange = useCallback((v) => {
    if (setYear && typeof setYear === "function") return setYear(v);
    _setYear(v);
  }, []);
  const handleMonthChange = useCallback((v) => {
    let _v = v;
    if (v < 0) {
      _v = 11;
      handleYearChange((y) => y - 1);
    } else if (v > 11) {
      _v = 0;
      handleYearChange((y) => y + 1);
    }
    if (setMonth && typeof setMonth === "function") return setMonth(_v);
    _setMonth(_v);
  }, []);
  const handleCellSelect = useCallback((v) => {
    if (setSelected && typeof setSelected === "function") return setSelected(v);
    _setSelected(v);
  }, []);
  // Force Component to Re-render
  const forceUpdate = useCallback(() => {
    return updateState({});
  }, []);

  // Run useDateChange Hook
  const [, cancel] = useDateChange(
    month || _month,
    year || _year,
    mounted,
    onDateChange,
    forceUpdate
  );
  // Run on Mount
  useCalendarMount(cancel, setMounted);

  const value = useMemo(
    () => ({
      // UI
      daysLabelType,
      headerComponents,
      defaultClassNames,
      generateClassNames,

      // Component Wide State
      selected: selected || _selected,
      setSelected: handleCellSelect,
      month: month || _month,
      setMonth: handleMonthChange,
      year: year || _year,
      setYear: handleYearChange,

      // Cell Specific props
      onCellClick,
      doesCellHaveEvent,
    }),
    [
      selected || _selected,
      month || _month,
      year || _year,
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
