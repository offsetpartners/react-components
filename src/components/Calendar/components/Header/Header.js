import PropTypes from "prop-types";
import React, { memo } from "react";
import { Row, Col, Space, Button } from "antd";
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
      className="fig-calendar-header-btn fig-calendar-header-btn-left"
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
      className="fig-calendar-header-btn fig-calendar-header-btn-left"
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
      className="fig-calendar-header-btn fig-calendar-header-btn-right"
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
      className="fig-calendar-header-btn fig-calendar-header-btn-right"
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

const Header = (props) => {
  const { month, year, components } = props;

  const Left = getComponents("left", components, props);
  const Right = getComponents("right", components, props);

  return (
    <Row align="middle">
      <Col
        span={8}
        className="fig-sm-body fig-sm-body-semibold fig-calendar-header-left"
      >
        <Space size={2}>{Left}</Space>
      </Col>

      <Col span={8} className="fig-calendar-header-month">
        <span className="fig-body fig-body-semibold">
          {MONTHS[month].displayName} {year}
        </span>
      </Col>

      <Col span={8} className="fig-sm-body-semibold fig-calendar-header-right">
        <Space size={2}>{Right}</Space>
      </Col>
    </Row>
  );
};

Header.propTypes = {
  month: PropTypes.number.isRequired,
  setMonth: PropTypes.func.isRequired,

  year: PropTypes.number.isRequired,
  setYear: PropTypes.func.isRequired,

  components: PropTypes.shape({
    left: PropTypes.arrayOf(
      /**
       *
       * @enum {("nextYear"|"nextMonth"|"previousYear"|"previousMonth")}
       */
      PropTypes.oneOf([
        "nextYear",
        "nextMonth",
        "previousYear",
        "previousMonth",
      ])
    ),
    right: PropTypes.arrayOf(
      /**
       *
       * @enum {("nextYear"|"nextMonth"|"previousYear"|"previousMonth")}
       */
      PropTypes.oneOf([
        "nextYear",
        "nextMonth",
        "previousYear",
        "previousMonth",
      ])
    ),
  }),
};

export default memo(Header);
