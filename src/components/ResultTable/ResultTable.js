import { Table } from "antd";
import PropTypes from "prop-types";
import getColumn from "./lib/columns";
import React, { useState } from "react";
import CommonProps from "./lib/common.js";

const ResultTable = ({ type = "orders", data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = getColumn(type);

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: "max-content" }}
      {...CommonProps(selectedRowKeys, setSelectedRowKeys)}
    />
  );
};

ResultTable.propTypes = {
  type: PropTypes.oneOf(["orders", "customers"]),

  /**
   * Data to display on the Table
   */
  result: PropTypes.any,
};

export default ResultTable;
