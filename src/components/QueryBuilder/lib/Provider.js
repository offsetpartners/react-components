import handlers from "./helpers";
import React, { useMemo, useState, useContext, createContext } from "react";

let uniqueId = 0;

const QueryBuilderContext = createContext({
  orders: {},
  customers: {},
  getObjectFromType: function () {},
  handleSegmentChange: function () {},
  handleNewSegment: function () {},
  handleDelete: function () {},
  handleRuleChange: function () {},
  handleNewRule: function () {},
});

const QueryBuilderProvider = ({ children }) => {
  /**
   * @param {String} title
   * @returns {QueryBuilderType}
   */
  const getDefaultState = (title = "Query Title") => ({
    title,
    segments: [
      {
        id: uniqueId++,
        rules: [{ rule: undefined, value: undefined, condition: undefined }],
      },
    ],
  });

  /**
   * @type {[QueryBuilderType, Function]} orders
   */
  const [orders, changeOrders] = useState(getDefaultState("Orders Search"));
  /**
   * @type {[QueryBuilderType, Function]} customers
   */
  const [customers, changeCustomers] = useState(
    getDefaultState("Customers Search")
  );

  const {
    handleDelete,
    handleNewRule,
    handleNewSegment,
    handleRuleChange,
    getObjectFromType,
    handleSegmentChange,
  } = handlers(orders, changeOrders, customers, changeCustomers);

  const value = useMemo(
    () => ({
      orders,
      changeOrders,

      customers,
      changeCustomers,

      handleDelete,
      handleNewRule,
      handleNewSegment,
      handleRuleChange,
      getObjectFromType,
      handleSegmentChange,
    }),
    [orders, customers]
  );

  return (
    <QueryBuilderContext.Provider value={value}>
      {children}
    </QueryBuilderContext.Provider>
  );
};

export default QueryBuilderProvider;

/**
 * @returns {QueryBuilderContext}
 */
export const useQueryBuilder = () => useContext(QueryBuilderContext);
