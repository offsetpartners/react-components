import moment from "moment";
import { memo } from "react";
import { Row, Col, Space, Button } from "antd";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";
import Dropdown from "./Dropdown";
import { useCalendar } from "components/Calendar/provider";
import { MONTHS, YEARS_ARRAY } from "components/Calendar/lib/constants";

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

const PreviousWeek = ({
  selected,
  setSelected,
  month,
  setMonth,
  year,
  setYear,
}) => {
  return (
    <Button
      type="text"
      shape="circle"
      icon={<ChevronsLeft strokeWidth={1.3} />}
      onClick={() => {
        const momentSelected = moment(selected);

        const newDay = momentSelected.clone().subtract(1, "week");

        if (newDay.month() !== month) {
          setMonth(newDay.month());
        }

        if (newDay.year() !== year) {
          setYear(newDay.year());
        }

        setSelected(newDay.toDate());
      }}
      className="fig-calendar-header-btn fig-calendar-header-btn-left"
    />
  );
};

const PreviousDay = ({
  selected,
  setSelected,
  month,
  setMonth,
  year,
  setYear,
}) => {
  return (
    <Button
      type="text"
      shape="circle"
      icon={<ChevronLeft strokeWidth={1.3} />}
      className="fig-calendar-header-btn fig-calendar-header-btn-left"
      onClick={() => {
        const momentSelected = moment(selected);

        const newDay = momentSelected.clone().subtract(1, "d");

        if (newDay.month() !== month) {
          setMonth(newDay.month());
        }

        if (newDay.year() !== year) {
          setYear(newDay.year());
        }

        setSelected(newDay.toDate());
      }}
    />
  );
};

const NextWeek = ({
  selected,
  setSelected,
  month,
  setMonth,
  year,
  setYear,
}) => {
  return (
    <Button
      type="text"
      shape="circle"
      icon={<ChevronsRight strokeWidth={1.3} />}
      onClick={() => {
        const momentSelected = moment(selected);

        const newDay = momentSelected.clone().add(1, "week");

        if (newDay.month() !== month) {
          setMonth(newDay.month());
        }

        if (newDay.year() !== year) {
          setYear(newDay.year());
        }

        setSelected(newDay.toDate());
      }}
      className="fig-calendar-header-btn fig-calendar-header-btn-right"
    />
  );
};

const NextDay = ({ selected, setSelected, month, setMonth, year, setYear }) => {
  return (
    <Button
      type="text"
      shape="circle"
      icon={<ChevronRight strokeWidth={1.3} />}
      onClick={() => {
        const momentSelected = moment(selected);

        const newDay = momentSelected.clone().add(1, "d");

        if (newDay.month() !== month) {
          setMonth(newDay.month());
        }

        if (newDay.year() !== year) {
          setYear(newDay.year());
        }

        setSelected(newDay.toDate());
      }}
      className="fig-calendar-header-btn fig-calendar-header-btn-right"
    />
  );
};

/**
 *
 * @param {("left"|"right")} type
 * @param {{ calendar: {left: [String], right: [String]}, day: {left: [String], right: [String]} }} components
 */
const getComponents = (type = "left", components, props) => {
  const { view, year, setYear, month, setMonth, selected, setSelected } = props;
  const providedComponents = components[view][type];

  if (view.toLowerCase() === "day") {
    return providedComponents.map((comp) => {
      const key = `${type}-${comp}`;
      switch (comp) {
        case "previousWeek":
          return (
            <PreviousWeek
              key={key}
              month={month}
              setMonth={setMonth}
              year={setYear}
              setYear={setYear}
              selected={selected}
              setSelected={setSelected}
            />
          );
        case "previousDay":
          return (
            <PreviousDay
              key={key}
              month={month}
              setMonth={setMonth}
              year={setYear}
              setYear={setYear}
              selected={selected}
              setSelected={setSelected}
            />
          );
        case "nextWeek":
          return (
            <NextWeek
              key={key}
              month={month}
              setMonth={setMonth}
              year={setYear}
              setYear={setYear}
              selected={selected}
              setSelected={setSelected}
            />
          );
        case "nextDay":
          return (
            <NextDay
              key={key}
              month={month}
              setMonth={setMonth}
              year={setYear}
              setYear={setYear}
              selected={selected}
              setSelected={setSelected}
            />
          );
      }
    });
  } else {
    return providedComponents.map((comp) => {
      const key = `${type}-${comp}`;
      switch (comp) {
        case "previousYear":
          return <PreviousYear key={key} year={year} setYear={setYear} />;
        case "previousMonth":
          return <PreviousMonth key={key} month={month} setMonth={setMonth} />;
        case "nextYear":
          return <NextYear key={key} year={year} setYear={setYear} />;
        case "nextMonth":
          return <NextMonth key={key} month={month} setMonth={setMonth} />;
      }
    });
  }
};

const Header = () => {
  const {
    view,
    maxDate,

    month,
    setMonth,
    year,
    setYear,
    selected,
    setSelected,
    headerComponents,
  } = useCalendar();
  const props = { view, month, setMonth, year, setYear, selected, setSelected };
  const Left = getComponents("left", headerComponents, props);
  const Right = getComponents("right", headerComponents, props);

  const selectedMoment = moment(selected);
  return (
    <Row align="middle">
      <Col
        span={6}
        className="fig-sm-body fig-sm-body-semibold fig-calendar-header-left"
      >
        <Space size={2}>{Left}</Space>
      </Col>

      <Col span={12} className="fig-calendar-header-month">
        <span className="fig-body fig-body-semibold">
          <Dropdown
            label={MONTHS[month].displayName}
            menuProps={{ selectedKeys: [month.toString()] }}
            items={MONTHS.map((m, i) => {
              const additionalProps = {};
              const tempMoment = moment(`${i + 1}/1/${year}`, "M/D/YYYY");
              if (tempMoment.isAfter(moment(maxDate), "month")) {
                additionalProps.disabled = true;
              }

              return { key: i, label: m.displayName, props: additionalProps };
            })}
            onClick={(clicked) => {
              setMonth(Number(clicked.key));

              if (view === "day") {
                const newSelected = selectedMoment
                  .clone()
                  .set("month", Number(clicked.key));
                setSelected(newSelected.toDate());
              }
            }}
          />

          {view === "day" && (
            <Dropdown
              label={selectedMoment.format("Do") + ","}
              menuProps={{ selectedKeys: [selected.getDate().toString()] }}
              onClick={(clicked) => {
                const newSelected = selectedMoment
                  .clone()
                  .set("date", clicked.key);
                setSelected(newSelected.toDate());
              }}
              items={Array.from(
                { length: selectedMoment.daysInMonth() },
                (_, i) => {
                  const additionalProps = {};
                  const tempMoment = moment(`${month + 1}/${i + 1}/${year}`, "M/D/YYYY");
                  if (tempMoment.isAfter(moment(maxDate), "day")) {
                    additionalProps.disabled = true;
                  }

                  return {
                    key: i + 1,
                    label: i + 1,
                    props: additionalProps,
                  };
                }
              )}
            />
          )}

          <Dropdown
            label={year}
            menuProps={{ selectedKeys: [year.toString()] }}
            onClick={(clicked) => {
              setYear(Number(clicked.key));

              if (view === "day") {
                const newSelected = selectedMoment
                  .clone()
                  .set("year", Number(clicked.key));
                setSelected(newSelected.toDate());
              }
            }}
            items={YEARS_ARRAY(maxDate.getFullYear()).map((y) => ({
              key: y,
              label: y,
            }))}
          />
        </span>
      </Col>

      <Col span={6} className="fig-sm-body-semibold fig-calendar-header-right">
        <Space size={2}>{Right}</Space>
      </Col>
    </Row>
  );
};

export default memo(Header);
