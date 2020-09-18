import React from "react";
import moment from "moment";
import { Mail, Phone } from "react-feather";
import { classNames, shipMethods } from "./tag.config";
import { common } from "@offsetpartners/react-components";
import { Col, Row, Tag, Avatar, Popover, Typography, Space } from "antd";

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
      const { email, phone, first_name, last_name } = record;
      const fullName = `${first_name} ${last_name}`;

      const customerPreview = (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Avatar size="large" style={{ backgroundColor: "#AA7B71" }}>
              {first_name[0]}
              {last_name[0]}
            </Avatar>
          </Col>

          <Col>
            <Typography.Text strong style={{ fontSize: 14 }}>
              {fullName}
            </Typography.Text>
          </Col>

          <Col span={24} style={{ marginTop: 8 }}>
            <Row align="middle">
              <Mail size={12} />

              <Col>
                <Typography.Text
                  ellipsis
                  style={{ fontSize: 12, marginLeft: 8 }}
                >
                  {email || "-"}
                </Typography.Text>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Row align="middle">
              <Phone size={12} />

              <Col>
                <Typography.Text style={{ fontSize: 12, marginLeft: 8 }}>
                  {phone || "-"}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      );

      return (
        <Popover content={customerPreview} overlayStyle={{ maxWidth: 260 }}>
          <a href={`/customers/overview/${record.customer_id}`}>
            <Typography.Text strong>{fullName}</Typography.Text>
          </a>
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
