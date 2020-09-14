import { Table } from "antd";
import getColumn from "./lib/columns";
import data from "./placeholder.json";
import data2 from "./customerPlaceholder.json";
import CommonProps from "./lib/common.js";
import React, { useState } from "react";

export default function ResultTable({ type = "customers" }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = getColumn(type);

  return (
    <Table
      columns={columns}
      scroll={{ x: "max-content" }}
      dataSource={Object.values(type === "orders" ? data : data2)}
      {...CommonProps(selectedRowKeys, setSelectedRowKeys)}
    />
  );
}
