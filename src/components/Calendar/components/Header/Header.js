import React, { memo } from "react";
import { Row, Col, Space, Button, Typography } from "antd";
import { MONTHS } from "components/Calendar/lib/constants";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";

const PreviousYear = ({ year, setYear }) => {
  return (
    <Button
      type="text"
      shape="circle"
      icon={<ChevronsLeft />}
      onClick={() => setYear(year - 1)}
    />
  );
};

const PreviousMonth = ({ month, setMonth }) => {
  return (
    <Button
      type="text"
      shape="circle"
      icon={<ChevronLeft />}
      onClick={() => setMonth(month - 1)}
    />
  );
};

const NextYear = ({ year, setYear }) => {
  return (
    <Button
      type="text"
      shape="circle"
      icon={<ChevronsRight />}
      onClick={() => setYear(year + 1)}
    />
  );
};

const NextMonth = ({ month, setMonth }) => {
  return (
    <Button
      type="text"
      shape="circle"
      icon={<ChevronRight />}
      onClick={() => setMonth(month + 1)}
    />
  );
};

/**
 *
 * @param {("left"|"center"|"right")} type
 * @param {{ left: [String], right: [String] }} components
 */
const getComponents = (type = "left", components, props) => {
  const { year, setYear, month, setMonth } = props;
  switch (type) {
    case "right":
      const rightComponents = components.right;

      const R = rightComponents.map((comp) => {
        const key = `right-${comp}`;
        switch (comp) {
          case "previousYear":
            return <PreviousYear key={key} year={year} setYear={setYear} />;
          case "previousMonth":
            return (
              <PreviousMonth key={key} month={month} setMonth={setMonth} />
            );
          case "nextYear":
            return <NextYear key={key} year={year} setYear={setYear} />;
          case "nextMonth":
            return <NextMonth key={key} month={month} setMonth={setMonth} />;
        }
      });
      return R;
    default:
      const leftComponents = components.left;

      const L = leftComponents.map((comp) => {
        const key = `left-${comp}`;
        switch (comp) {
          case "previousYear":
            return <PreviousYear key={key} year={year} setYear={setYear} />;
          case "previousMonth":
            return (
              <PreviousMonth key={key} month={month} setMonth={setMonth} />
            );
          case "nextYear":
            return <NextYear key={key} year={year} setYear={setYear} />;
          case "nextMonth":
            return <NextMonth key={key} month={month} setMonth={setMonth} />;
        }
      });
      return L;
  }
};

export default memo((props) => {
  const { month, setMonth, year, setYear, components } = props;

  const Left = getComponents("left", components, props);
  const Right = getComponents("right", components, props);

  return (
    <Row align="middle">
      <Col span={8} className="fig-calendar-header-left">
        <Space>{Left}</Space>
      </Col>

      <Col span={8} className="fig-calendar-header-month">
        <Typography.Title level={4} className="fig-calendar-header-month-text">
          {MONTHS[month].displayName} {year}
        </Typography.Title>
      </Col>

      <Col span={8} className="fig-calendar-header-right">
        <Space>{Right}</Space>
      </Col>
    </Row>
  );
});
