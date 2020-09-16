import React from "react";
import "./styles/index.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Col, Row, Typography } from "antd";

export default function Calendar() {
  return (
    <FullCalendar
      eventDisplay="none"
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      dayCellClassNames="fig-calendar-day-cell"
      dayCellContent={(
        date,
        _,
        isPast,
        isFuture,
        isToday,
        isOther,
        resource,
        el
      ) => {
        const { dayNumberText } = date;
        return (
          <Row align="middle" justify="center">
            <Col span={24}>
              <Typography.Text>{dayNumberText}</Typography.Text>
            </Col>
            <Col span={24}>
              <Typography.Text>Event</Typography.Text>
            </Col>
          </Row>
        );
      }}
      dayHeaderFormat={{ weekday: "narrow" }}
      headerToolbar={{
        left: "prevYear,prev",
        center: "title",
        right: "next,nextYear",
      }}
    />
  );
}
