import moment from "moment";
import { generateItems, getPresetFromValue, getValueFromPreset } from "./utils";
import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";

const DatePickerContext = createContext({
  format: "MMM D",
  type: "single" || "range",
  items: [{ key: "", label: "", date: moment() }],

  preset: [],
  setPreset: () => {},

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
  disabledPresets = [],
}) => {
  // Internal
  const items = generateItems(type, disabledPresets);

  const [_value, _setValue] = useState(() => {
    return type === "range"
      ? [moment().toDate(), moment().add(1, "d").toDate()]
      : moment().toDate();
  });
  const [preset, setPreset] = useState(
    getPresetFromValue(type, items, value || _value) || items[0]
  );
  const handleValueChange = useCallback((v) => {
    if (typeof setValue === "function") return setValue(v);
    _setValue(v);
  });
  const handleSave = useCallback(() => {
    if (typeof onSave === "function") onSave(value);
  });

  useEffect(() => {
    let act = value || _value;
    if (type === "range" && !Array.isArray(act)) {
      act = [act, moment(act).add(1, "d")];
    } else if (type !== "range" && Array.isArray(act)) {
      act = act[0];
    }
    const newPreset = getPresetFromValue(type, items, act) || items[0];
    setPreset(newPreset);
    getValueFromPreset(type, newPreset, setPreset, handleValueChange);
  }, [type]);
  const providerValue = useMemo(
    () => ({
      type,
      items,
      format,

      onSave: handleSave,

      preset,
      setPreset,
      value: value || _value,
      setValue: handleValueChange,
    }),
    [type, value || _value]
  );

  return (
    <DatePickerContext.Provider value={providerValue}>
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePicker = () => useContext(DatePickerContext);
export default DatePickerProvider;
