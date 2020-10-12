import moment from "moment";
import { Row, Col, Input } from "antd";
import * as Feather from "react-feather";
import Calendar from "components/Calendar";
import React, { useRef, useState, useEffect } from "react";
import { useDatePicker } from "components/DatePicker/provider";

export default () => {
  const { month, year, value, setValue, setMonth, setYear } = useDatePicker();

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
          const otherIndex = focused === 0 ? 1 : 0;
          let newValue = moment(d);
          let oldValue = moment(value[otherIndex]);

          // If End Date Selected is Before Start Date
          if (focused === 1 && newValue.isSameOrBefore(oldValue)) {
            const _old = oldValue.clone();
            oldValue = newValue;
            newValue = _old;
          } else if (focused === 0 && newValue.isSameOrAfter(oldValue)) {
            const _old = oldValue.clone();
            oldValue = newValue;
            newValue = _old;
          }

          const newValues = [];
          newValues[focused] = newValue.toDate();
          newValues[otherIndex] = oldValue.toDate();

          setValue(newValues);
          setFocused(otherIndex);
        }}
      />
    </>
  );
};
