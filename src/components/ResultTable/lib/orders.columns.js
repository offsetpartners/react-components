import React from "react";
import moment from "moment";
import { Col, Row, Tag, Popover, Typography } from "antd";
import { classNames, shipMethods } from "./tag.config";
import { common } from "@offsetpartners/react-components";

const { formatMoney } = common;

export default [
  { title: "ORDER #", dataIndex: "order_id" },
  {
    title: "STATUS",
    dataIndex: "status",
    render: (text, record, index) => {
      const { payment_status, ship_status } = record;
      return (
        <>
          <Tag className={classNames[payment_status]}>{payment_status}</Tag>
          <Tag className={classNames[ship_status]}>{ship_status}</Tag>
        </>
      );
    },
  },
  {
    title: "CUSTOMER",
    dataIndex: "first_name",
    render: (text, record, index) => {
      const fullName = `${record.first_name} ${record.last_name}`;

      const customerPreview = (
        <>
          <Row>
            <Col span={24}>
              <Typography.Text strong>Phone: </Typography.Text>
              <Typography.Text>{record.phone || "-"}</Typography.Text>
            </Col>

            <Col span={24}>
              <Typography.Text strong>Email: </Typography.Text>
              <Typography.Text>{record.email || "-"}</Typography.Text>
            </Col>

            <Col span={24}>
              <Typography.Text strong>Company: </Typography.Text>
              <Typography.Text>{record.company || "-"}</Typography.Text>
            </Col>
          </Row>
        </>
      );

      return (
        <Popover
          content={customerPreview}
          overlayStyle={{ maxWidth: 300 }}
          title={
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              {fullName}
            </Typography.Title>
          }
        >
          <Typography.Link
            strong
            href={`/customers/overview/${record.customer_id}`}
          >
            {fullName}
          </Typography.Link>
        </Popover>
      );
    },
  },
  {
    title: "DATE",
    dataIndex: "datestamp",
    render: (text, record, index) => {
      return moment(text).format("MMM DD, YYYY, hh:mm a");
    },
  },
  {
    title: "SHIPPING",
    dataIndex: "shipping_state",
    render: (text, record, index) => {
      const {
        shipping,
        shipping_state,
        shipping_method_code,
        shipping_method_name,
        shipping_method_carrier,
      } = record;

      const method =
        shipMethods?.[shipping_method_carrier]?.[shipping_method_code] ||
        shipping_method_name ||
        "-";
      return (
        <>
          <Tag>{shipping_state}</Tag>${formatMoney(shipping)}, {method}
        </>
      );
    },
  },
  {
    align: "right",
    title: "AMOUNT",
    dataIndex: "total",
    sorter: (a, b) => a.total - b.total,
    render: (text, record, index) => {
      return <Typography.Text strong>$ {formatMoney(text)}</Typography.Text>;
    },
  },
];
