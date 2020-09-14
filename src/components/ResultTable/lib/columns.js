import React from "react";
import moment from "moment";
import { Row, Col, Tag, Typography } from "antd";
import { classNames, shipMethods } from "./tag.config";
import { common } from "@offsetpartners/react-components";

/**
 * @param {("orders"|"customers")} type
 */
export default (type) => {
  const { formatMoney } = common;
  switch (type) {
    case "orders":
      return [
        { title: "ORDER #", dataIndex: "order_id" },
        {
          title: "STATUS",
          dataIndex: "status",
          render: (text, record, index) => {
            const { payment_status, ship_status } = record;
            return (
              <>
                <Tag className={classNames[payment_status]}>
                  {payment_status}
                </Tag>
                <Tag className={classNames[ship_status]}>{ship_status}</Tag>
              </>
            );
          },
        },
        {
          title: "CUSTOMER",
          dataIndex: "first_name",
          render: (text, record, index) => {
            return `${record.first_name} ${record.last_name}`;
          },
        },
        {
          title: "DATESTAMP",
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
    case "customers":
      return [
        {
          title: "ID",
          dataIndex: "id",
          render: (text, record, index) => {
            const hasNotes = record.temporary_customer_notes;
            const statusText = hasNotes ? "Needs Attn" : record.status || "-";
            const className = hasNotes
              ? classNames["Needs Attention"]
              : classNames[record.status];
            return (
              <Row>
                <Col span={24}>{text}</Col>

                <Col span={24}>
                  <Tag className={className}>{statusText}</Tag>
                </Col>
              </Row>
            );
          },
        },
        {
          title: "NAME",
          dataIndex: "first_name",
          render: (text, record, index) => {
            return `${record.first_name} ${record.last_name}`;
          },
        },
        {
          title: "CONTACT",
          dataIndex: "email",
          render: (text, record, index) => {
            const number = record.phone || record.mobile || record.work || "-";

            return (
              <Row>
                <Col span={24}>{record.email}</Col>
                <Col span={24}>{number}</Col>
              </Row>
            );
          },
        },
        {
          title: "AGE",
          dataIndex: "birthday",
          render: (text, record, index) => {
            const birthday = moment(text, "YYYY-MM-DD");
            const age = moment().diff(birthday, "years");

            return age || "-";
          },
        },
        {
          title: "JOINED",
          dataIndex: "created_date",
          render: (text, record, index) => {
            const format = moment(text, "YYYY-MM-DD").format("MM/DD/YYYY");

            return format || "-";
          },
        },
        {
          title: "SOURCE",
          dataIndex: "customer_source",
          render: (text, record, index) => {
            return text || "-";
          },
        },
        {
          title: "REFERRAL",
          dataIndex: "referral_source",
          render: (text, record, index) => {
            return (
              <Row>
                <Col span={24}>{text || "-"}</Col>

                {record?.note && <Col span={24}>{record.note}</Col>}
              </Row>
            );
          },
        },
        {
          title: "LAST ORDER",
          dataIndex: "last_order",
          render: (text, record, index) => {
            const format = moment(text, "YYYY-MM-DD");

            if (format.isValid()) {
              return format.format("MM/DD/YYYY");
            }
            return "-";
          },
        },
        {
          title: "CREDIT",
          dataIndex: "credits",
          render: (text, record, index) => {
            return `$${formatMoney(text) || "0.00"}`;
          },
        },
        {
          title: "LIFETIME",
          dataIndex: "order_total",
          render: (text, record, index) => {
            return `$${formatMoney(text)}`;
          },
        },
      ];
  }
};
