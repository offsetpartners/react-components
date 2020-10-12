import { Table } from "antd";
import propTypes from "./propTypes";
import getColumn from "./lib/columns";
import CommonProps from "./lib/common.js";
import React, { useState, useEffect } from "react";

const ResultTable = ({ type = "orders", data, onSelect }) => {
  const [isMounted, setMounted] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = getColumn(type);

  useEffect(() => {
    if (isMounted && typeof onSelect === "function") {
      const records = selectedRowKeys.map((key) => {
        if (typeof data === "undefined") return;
        if (!Array.isArray(data)) return;

        try {
          return data.find((obj) => obj.id === key);
        } catch (e) {}

        return undefined;
      });
      onSelect(selectedRowKeys, records);
    }

    return () => {};
  }, [selectedRowKeys]);

  useEffect(() => setMounted(true), []);

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: "max-content" }}
      {...CommonProps(selectedRowKeys, setSelectedRowKeys)}
    />
  );
};

ResultTable.propTypes = propTypes;

ResultTable.defaultProps = {
  type: "orders",

  data: [],
};

ResultTable.validProps = Object.keys(ResultTable.propTypes);

export default ResultTable;
