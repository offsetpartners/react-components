import React, { memo } from "react";
import { Row, Col, Space, Button, Typography } from "antd";
import { MONTHS } from "components/Calendar/lib/constants";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";

export default memo(({ month, setMonth, year, setYear }) => {
  return (
    <Row align="middle">
      <Col span={8} className="fig-calendar-header-left">
        <Space>
          <Button
            type="text"
            shape="circle"
            icon={<ChevronsLeft />}
            onClick={() => setYear(year - 1)}
          />
          <Button
            type="text"
            shape="circle"
            icon={<ChevronLeft />}
            onClick={() => setMonth(month - 1)}
          />
        </Space>
      </Col>

      <Col span={8} className="fig-calendar-header-month">
        <Typography.Title level={4} className="fig-calendar-header-month-text">
          {MONTHS[month].displayName} {year}
        </Typography.Title>
      </Col>

      <Col span={8} className="fig-calendar-header-right">
        <Space>
          <Button
            type="text"
            shape="circle"
            icon={<ChevronRight />}
            onClick={() => setMonth(month + 1)}
          />
          <Button
            type="text"
            shape="circle"
            icon={<ChevronsRight />}
            onClick={() => setYear(year + 1)}
          />
        </Space>
      </Col>
    </Row>
  );
});
