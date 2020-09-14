import { Table } from "antd";
import getColumn from "./lib/columns";
import data from "./placeholder.json";
import data2 from "./customerPlaceholder.json";
import CommonProps from "./common.js";
import React, { useState } from "react";

export default function ResultTable({ type = "orders" }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = getColumn(type);

  return (
    <Table
      columns={columns}
      scroll={{ x: true, scrollToFirstRowOnChange: true }}
      dataSource={Object.values(type === "orders" ? data : data2)}
      {...CommonProps(selectedRowKeys, setSelectedRowKeys)}
    />
  );
}
