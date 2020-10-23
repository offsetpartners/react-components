import handlers from "./helpers";
import React, {
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
} from "react";

let uniqueId = 0;
const QueryBuilderContext = createContext(0);
const QueryBuilderProvider = ({
  inputs,
  onSave,
  initial,
  disabled,
  children,
}) => {
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

  const [loading, setLoading] = useState(false);

  if (!inputs.orders || !inputs.customers) {
    throw new Error("You must provide an input for both Orders and Customers!");
  }

  const [result, setResult] = useState(() => {
    if (initial && typeof initial.result === "object") {
      const { result } = initial;

      if (
        (result.orders && Array.isArray(result.orders)) ||
        (result.customers && Array.isArray(result.customers))
      ) {
        return result;
      }
    }

    return {};
  });

  const {
    handleSave,
    handleDelete,
    handleNewRule,
    handleNewSegment,
    handleRuleChange,
    getObjectFromType,
    handleSegmentChange,
  } = handlers(uniqueId, inputs, orders, changeOrders, customers, changeCustomers);

  const gatedSave = useCallback((type) => {
    if (disabled) return;

    setLoading(true);
    handleSave(type, setResult, setLoading, onSave);
  });

  const value = useMemo(
    () => ({
      inputs,
      initial,
      loading,
      disabled,

      orders,
      changeOrders,

      customers,
      changeCustomers,

      result,
      setResult,

      handleDelete,
      handleNewRule,
      handleNewSegment,
      handleRuleChange,
      getObjectFromType,
      handleSegmentChange,
      handleSave: gatedSave,
    }),
    [loading, result, orders, customers]
  );
  return (
    <QueryBuilderContext.Provider value={value}>
      {children}
    </QueryBuilderContext.Provider>
  );
};

/**
 * @returns {QueryBuilderContext}
 */
export const useQueryBuilder = () => useContext(QueryBuilderContext);

export default QueryBuilderProvider;
