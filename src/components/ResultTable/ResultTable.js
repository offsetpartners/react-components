import moment from "moment";
import data from "./placeholder.json";
import CommonProps from "./common.js";
import React, { useState } from "react";
import { Tag, Table, Typography } from "antd";
import { classNames, shipMethods } from "./lib/tag.config";

export default function ResultTable({}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = [
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
            <Tag>{shipping_state}</Tag>${shipping}, {method}
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
        return <Typography.Text strong>$ {text}</Typography.Text>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={Object.values(data)}
      {...CommonProps(selectedRowKeys, setSelectedRowKeys)}
    />
  );
}
