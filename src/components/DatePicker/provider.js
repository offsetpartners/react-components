import moment from "moment";
import { generateItems, getPresetFromValue } from "./utils";
import {
  useMemo,
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";

const DatePickerContext = createContext({
  inputId: "",
  format: "MMM D",
  maxDateRange: 0,
  maxDate: new Date(),
  type: "single" || "range",
  items: [{ key: "", label: "", date: moment() }],

  month: 0,
  setMonth: () => {},
  year: 0,
  setYear: () => {},

  preset: [],
  setPreset: () => {},
  setValue: () => {},
  value: new Date() || [new Date()],

  onSave: () => {},
  onError: () => {},
});

const DatePickerProvider = (props) => {
  // Props
  const {
    children,

    type,
    inputId,
    maxDate,
    disabled,
    format = "MMM D",
    maxDateRange = 0,
    disabledPresets = [],

    onSave,
    onError,
    onChange,

    value,
    setValue,
    initialValue,
  } = props;

  // 1. Initialize internal properties
  const refMaxDate = maxDate instanceof Date ? maxDate : null;
  const refMaxDateRange =
    typeof maxDateRange === "number" ? maxDateRange : false;
  const today = moment();
  const items = generateItems(
    type,
    refMaxDate,
    refMaxDateRange,
    disabledPresets
  );
  const [refMonth, setRefMonth] = useState(today.month());
  const [refYear, setRefYear] = useState(today.year());

  // 2. Initialize internal value state
  const [refValue, setRefValue] = useState(() => {
    let initValue, initMonth, initYear;
    // 2a. Handle initial value for `range` type
    if (type === "range") {
      // Check that the initial value provided is a
      // valid date
      if (
        typeof initialValue !== "undefined" &&
        Array.isArray(initialValue) &&
        initialValue.length === 2
      ) {
        if (
          initialValue[0] instanceof Date &&
          initialValue[1] instanceof Date
        ) {
          if (initialValue[0] > initialValue[1]) {
            initValue = [initialValue[1], initialValue[0]];
          } else {
            initValue = initialValue;
          }
        }
      } else {
        initValue = [today.toDate(), today.clone().add(1, "d").toDate()];
      }
      initMonth = initValue[0].getMonth();
      initYear = initValue[0].getFullYear();
    }
    // 2b. Handle initial value for `single` type
    else {
      // Check that the initial value provided is a
      // valid date
      if (typeof initialValue !== "undefined" && initialValue instanceof Date) {
        initValue = initialValue;
      } else {
        initValue = today.toDate();
      }
      initMonth = initValue.getMonth();
      initYear = initValue.getFullYear();
    }

    if (refMaxDate) setRefMonth(refMaxDate.getMonth());
    else setRefMonth(initMonth);
    setRefYear(initYear);
    return initValue;
  });

  // 3. Retrieve passed value state prop if
  // possible
  let actualValue = refValue;
  if (typeof value !== "undefined") {
    actualValue = value;
  }

  // 4. Initialize internal preset state
  const [preset, setPreset] = useState(
    getPresetFromValue(type, items, value || refValue) || false
  );

  // 5. Generate handler functions
  const handleValueChange = useCallback((v) => {
    let setterFn = setRefValue;
    if (typeof setValue === "function") setterFn = setValue;

    if (type === "range") {
      let fromDate = moment(v[0]);
      let toDate = moment(v[1]);

      if (refMaxDate) {
        const momentMax = moment(refMaxDate);
        if (fromDate.isSameOrAfter(momentMax, "d")) {
          fromDate = momentMax.clone().subtract(1, "d");
        }
        if (toDate.isAfter(momentMax, "d")) {
          toDate = momentMax;
        }
      }

      if (refMaxDateRange) {
        const diff = toDate.diff(fromDate, "d");
        if (diff > refMaxDateRange) {
          fromDate = toDate;
          toDate = toDate.add(refMaxDateRange, "d");
        }
      }
      setterFn([fromDate.toDate(), toDate.toDate()]);
      return;
    } else if (type === "single" && refMaxDate) {
      const momentNew = moment(v);
      const momentMax = moment(refMaxDate);
      if (momentNew.isAfter(momentMax, "d")) {
        setterFn(momentMax.toDate());
        return;
      }
    }

    setterFn(v);
    if (typeof onChange === "function") {
      onChange(v);
    }
  });
  const handleSave = useCallback((val) => {
    if (typeof onSave === "function") {
      const mMax = moment(refMaxDate);
      if (refMaxDate && moment(val).isAfter(mMax, "d")) {
        onSave(inputId, mMax.toDate());
      } else {
        onSave(inputId, val);
      }
    }
  });
  const handleError = useCallback((val) => {
    if (typeof onError === "function") onError(val);
  });

  // 6. Hook that listen to type changes to set appropriate
  // value
  useEffect(() => {
    let act = value || refValue;
    if (type === "range" && !Array.isArray(act)) {
      act = [act, moment(act).add(1, "d").toDate()];
    } else if (type === "single" && Array.isArray(act)) {
      act = act[0];
    }

    if (items && Array.isArray(items) && items.length > 0) {
      setPreset(getPresetFromValue(type, items, act) || false);
    }
    handleValueChange(act);
  }, [type]);

  // 7. Generate provided values
  const providerValue = useMemo(
    () => ({
      type,
      items,
      format,
      inputId,
      disabled,
      maxDate: refMaxDate,
      maxDateRange: refMaxDateRange,

      onSave: handleSave,
      onError: handleError,

      // Calendar State
      month: refMonth,
      setMonth: setRefMonth,
      year: refYear,
      setYear: setRefYear,

      // Date Picker State
      preset,
      setPreset,
      value: actualValue,
      setValue: handleValueChange,
    }),
    [disabled, refMonth, refYear, type, value, refValue]
  );

  // 8. Return Provider
  return (
    <DatePickerContext.Provider value={providerValue}>
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePicker = () => useContext(DatePickerContext);
export default DatePickerProvider;
