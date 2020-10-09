import moment from "moment";
import React, {
  useMemo,
  useState,
  useContext,
  createContext,
  useCallback,
} from "react";

const DatePickerContext = createContext({
  format: "MMM D",
  type: "single" || "range",

  setValue: () => {},
  value: new Date() || [new Date()],

  onSave: () => {},
});

const DatePickerProvider = ({
  children,

  type,
  value,
  onSave,
  setValue,
  format = "MMM D",
}) => {
  const [_value, _setValue] = useState(
    type === "range"
      ? [moment().toDate(), moment().add(1, "d").toDate()]
      : moment().toDate()
  );
  const handleValueChange = useCallback((v) => {
    if (typeof setValue === "function") return setValue(v);
    _setValue(v);
  });
  const handleSave = useCallback(() => {
    if (typeof onSave === "function") onSave(value);
  });

  const providerValue = useMemo(
    () => ({
      type,
      format,

      onSave: handleSave,
      value: value || _value,
      setValue: handleValueChange,
    }),
    [value || _value]
  );

  return (
    <DatePickerContext.Provider value={providerValue}>
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePicker = () => useContext(DatePickerContext);
export default DatePickerProvider;
