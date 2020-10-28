import moment from "moment";
import * as Feather from "react-feather";
import Calendar from "components/Calendar";
import { Row, Col, Input, message } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { useDatePicker } from "components/DatePicker/provider";
import { getPresetFromValue } from "components/DatePicker/utils";

export default () => {
  const {
    type,
    items,
    month,
    year,
    value,
    maxDate,
    maxDateRange,
    setValue,
    setMonth,
    setYear,
    setPreset,
  } = useDatePicker();

  const [focused, setFocused] = useState(0);

  const startDate = moment(value[0]);
  const endDate = moment(value[1]);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  useEffect(() => {
    if (startDateRef && endDateRef) {
      focused === 0 ? startDateRef.current.focus() : endDateRef.current.focus();
    }
  }, [focused]);
  return (
    <>
      <Row className="fig-datepicker-input-group">
        <Col span={10}>
          <Input
            size="small"
            ref={startDateRef}
            placeholder="Start Date"
            onClick={() => setFocused(0)}
            value={startDate.format("M/D/YYYY")}
            prefix={<Feather.Calendar width={18} height={18} />}
            className={focused === 0 && "ant-input-affix-wrapper-focused"}
          />
        </Col>

        <Col
          span={4}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather.ArrowRight width={18} height={18} />
        </Col>

        <Col span={10}>
          <Input
            size="small"
            ref={endDateRef}
            placeholder="End Date"
            onClick={() => setFocused(1)}
            value={endDate.format("M/D/YYYY")}
            prefix={<Feather.Calendar width={18} height={18} />}
            className={focused === 1 && "ant-input-affix-wrapper-focused"}
          />
        </Col>
      </Row>

      <Calendar
        year={year}
        month={month}
        selected={value}
        maxDate={maxDate}
        setYear={setYear}
        setMonth={setMonth}
        headerComponents={{ left: ["previousMonth"], right: ["nextMonth"] }}
        generateClassNames={(d) => {
          const momentObj = moment(d);
          const isAfter = momentObj.isAfter(startDate);
          const isBefore = momentObj.isBefore(endDate);
          if (isAfter && isBefore) {
            return {
              grid: "fig-date-picker-between",
            };
          }
        }}
        onCellClick={(d) => {
          // Flag for indicating if an invalid date
          // was selected. Ie, Start Date is after End Date
          // or vice versa
          let invalidDateFlag = false;
          const otherIndex = focused === 0 ? 1 : 0;
          let newValue = moment(d);
          let oldValue = moment(value[otherIndex]);

          // If End Date Selected is Before Start Date
          if (focused === 1 && newValue.isSameOrBefore(oldValue)) {
            const _old = oldValue.clone();
            oldValue = newValue;
            newValue = _old;

            invalidDateFlag = true;
          }
          // If Start Date Selected is After End Date
          else if (focused === 0 && newValue.isSameOrAfter(oldValue)) {
            const _old = oldValue.clone();
            oldValue = newValue;
            newValue = _old;

            invalidDateFlag = true;
          }

          const newValues = [];
          newValues[focused] = newValue;
          newValues[otherIndex] = oldValue;

          // Ensure that the Value selected is within the maxDateRange provided
          const isToDateTooFar =
            maxDateRange && newValues[1].diff(newValues[0], "d") > maxDateRange;
          if (isToDateTooFar) {
            message.warning(
              `You cannot exceed the max date range of ${maxDateRange}!`
            );

            if (focused === 0) {
              if (invalidDateFlag) {
                newValues[0] = newValues[1];
              }
              newValues[1] = newValues[0].clone().add(maxDateRange, "d");
            } else {
              if (invalidDateFlag) {
                newValues[1] = newValues[0];
              }
              newValues[0] = newValues[1].clone().subtract(maxDateRange, "d");
            }
          }

          // Focus on other element
          setFocused(otherIndex);
          // Map through New Values and ensure a Date is
          // passed as opposed to a moment object
          setValue(newValues.map((value) => value.toDate()));
          // Check if Value falls within a Preset
          setPreset(getPresetFromValue(type, items, newValues) || false);
        }}
      />
    </>
  );
};
