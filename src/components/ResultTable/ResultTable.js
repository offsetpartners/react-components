import { Table } from "antd";
import PropTypes from "prop-types";
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

ResultTable.propTypes = {
  /**
   * A callback for when rowKeys are selected/unselected
   * which passes all of the id's of the selectedRowKeys
   * and their respected Data Object
   *
   * @param {Array.<Number>} selectedRowKeys
   * @param {Any} records All the corresponding objects that are selected
   */
  onSelect: PropTypes.func,
  type: PropTypes.oneOf(["orders", "customers"]).isRequired,

  /**
   * Data to display on the Table
   */
  data: PropTypes.any,
};

ResultTable.defaultProps = {
  type: "orders",

  data: [],
};

ResultTable.validProps = Object.keys(ResultTable.propTypes);

export default ResultTable;
