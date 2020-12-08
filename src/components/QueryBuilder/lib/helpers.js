import "./typeDefs";
import message from "antd/lib/message";
import {
  DATE_CONDITIONS,
  NUMBER_CONDITIONS,
  KEYWORD_CONDITIONS,
  MULTI_SELECT_CONDITIONS,
  BOOLEAN_SELECT_CONDITION,
} from "./conditions";
import flatten from "common/flatten";

/**
 * Helper Functions
 * @param {Number} uniqueId For handling setting id for Rules and Segements
 * @param {{orders: QueryBuilderInput, customers: QueryBuilderInput}} inputs
 * @param {QueryBuilderType} orders
 * @param {Functiong} changeOrders
 * @param {QueryBuilderType} customers
 * @param {Function} changeCustomers
 */
export default (
  uniqueId,
  inputs,
  orders,
  changeOrders,
  customers,
  changeCustomers
) => {
  /**
   * @type {GetObjectFromType}
   */
  const getObjectFromType = (type = "orders") => {
    switch (type) {
      case "orders":
        return {
          object: orders,
          inputs: inputs.orders,
          handlerFunction: changeOrders,
        };
      case "customers":
        return {
          object: customers,
          inputs: inputs.customers,
          handlerFunction: changeCustomers,
        };
    }
  };

  /**
   * @type {ChangeSegmentHandler}
   */
  const handleSegmentChange = (type = "orders", index, key, value) => {
    switch (type) {
      case "orders":
        const newOrderSegments = orders.segments.map((segment, i) => {
          if (i !== index) return segment;

          segment[key] = value;
          return segment;
        });
        const newOrders = Object.assign({}, orders, newOrderSegments);
        changeOrders(newOrders);
        return;
      case "customers":
        const newCustomerSegments = customers.segments.map((segment, i) => {
          if (i !== index) return segment;

          segment[key] = value;
          return segment;
        });
        const newCustomers = Object.assign({}, customers, newCustomerSegments);
        changeCustoemrs(newCustomers);
        return;
    }
  };

  /**
   * @type {NewSegmentHandler}
   */
  const handleNewSegment = (type = "orders") => {
    const { object, handlerFunction } = getObjectFromType(type);

    if (object) {
      const newSegment = {
        id: uniqueId++,
        rules: [{ rule: undefined, value: undefined, condition: undefined }],
      };
      const newSegments = object.segments.concat([newSegment]);
      handlerFunction((prevState) => ({
        ...prevState,
        ...{ segments: newSegments },
      }));
    }
  };

  /**
   * @type {DeleteHandler}
   */
  const handleDelete = (type = "orders", segmentIndex, ruleIndex) => {
    const { object, handlerFunction } = getObjectFromType(type);
    const segments = object.segments;
    const currentSegment = segments[segmentIndex];
    const shouldDeleteSegment = segmentIndex && !ruleIndex;
    const hasMoreThanOneRule = currentSegment.rules.length > 1;

    if (segments.length === 1 && !hasMoreThanOneRule) {
      message.error("Must have atleast one Segment.");
      return;
    }

    // If Segment only has one Rule
    if (!hasMoreThanOneRule || shouldDeleteSegment) {
      const newSegments = segments.filter((segment, i) => i !== segmentIndex);
      const newObject = { ...object, ...{ segments: newSegments } };
      handlerFunction((prevState) => ({
        ...prevState,
        ...newObject,
      }));
      message.success("Successfully Deleted Segment!");
      return;
    }

    const newSegments = segments.map((segment, i) => {
      if (i !== segmentIndex) return segment;

      const newRules = segment.rules.filter((rule, j) => j !== ruleIndex);

      const newSegment = { ...segment, rules: newRules };
      return newSegment;
    });
    const newObject = { ...object, ...{ segments: newSegments } };
    handlerFunction((prevState) => ({
      ...prevState,
      ...newObject,
    }));
    message.success("Successfully Deleted Rule!");
    return;
  };

  /**
   * Change Any Object within a Rule
   * @type {ChangeRuleHandler}
   */
  const handleRuleChange = (
    type = "orders",
    segmentIndex,
    ruleIndex,
    key,
    value
  ) => {
    const { object, handlerFunction } = getObjectFromType(type);

    const newSegments = object.segments.map((segment, i) => {
      if (i !== segmentIndex) return segment;
      segment.rules[ruleIndex][key] = value;

      // Reset Value if Rule type changed
      if (key === "rule") segment.rules[ruleIndex].value = undefined;

      return segment;
    });

    const newObject = { ...object, ...{ segments: newSegments } };
    handlerFunction((prevState) => ({ ...prevState, ...newObject }));
  };

  /**
   * @type {NewRuleHandler}
   */
  const handleNewRule = (type = "orders", segmentIndex) => {
    const { object, handlerFunction } = getObjectFromType(type);
    const newRule = { rule: undefined, condition: undefined, value: undefined };

    const newSegments = object.segments.map((segment, i) => {
      if (i !== segmentIndex) return segment;

      segment.rules.push(newRule);

      return segment;
    });
    const newObject = { ...object, ...{ segments: newSegments } };
    handlerFunction((prevState) => ({ ...prevState, ...newObject }));
  };

  /**
   * Takes a Segment and turns all of its Rules
   * into valid ElasticSearch Queries
   * @param {Types} type
   */
  const convertToQuery = (type) => {
    const { inputs, object } = getObjectFromType(type);

    const { segments } = object;

    /**
     * @param {String} rule
     * @param {RuleTypes} type
     * @param {String} condition
     * @param {Any} value
     */
    const ruleToElasticSearch = ({ rule, type, condition, value }) => {
      let _type, _value;

      // If required params don't exist
      if (!rule || !type || !condition || !value) return null;

      switch (type) {
        case "date":
          _type = DATE_CONDITIONS[condition].type;
          _value = DATE_CONDITIONS[condition].value(value);
          break;
        case "number":
          _type = NUMBER_CONDITIONS[condition].type;
          _value = NUMBER_CONDITIONS[condition].value(value);
          break;
        case "keyword":
          _type = KEYWORD_CONDITIONS[condition].type;
          _value = KEYWORD_CONDITIONS[condition].value(value);
          break;
        case "multi_select":
          _type = MULTI_SELECT_CONDITIONS[condition].type;
          _value = MULTI_SELECT_CONDITIONS[condition].value(value);
          break;
        case "boolean_select":
          _type = BOOLEAN_SELECT_CONDITION[condition].type;
          _value = BOOLEAN_SELECT_CONDITION[condition].value(value);
          break;
        case "country_region_select":
          const { keys } = inputs[rule];
          if (inputs[rule] && inputs[rule].keys) {
            return [
              {
                type: "term",
                key: keys[0],
                value: value[0],
              },
              {
                type: "term",
                key: keys[1],
                value: value[1],
              },
            ];
          } else {
            return null;
          }
      }

      return {
        type: _type,
        key: rule,
        ..._value,
      };
    };

    // Flatten array to cleanup nested arrays
    const flattened = segments.map((segment) =>
      flatten(segment.rules.map((rule) => flatten(ruleToElasticSearch(rule))))
    );

    return flattened;
  };

  /**
   * @type {SaveHandler}
   */
  const handleSave = (type = "orders", setResult, setLoading, onSave) => {
    const converted = convertToQuery(type);

    // Filter any invalid Rules
    const filtered = converted.map((query) =>
      query.filter((obj) => {
        if (!obj) return false;

        const hasValue = typeof obj.value !== "undefined";
        const rangeHasValue =
          typeof obj.from !== "undefined" || typeof obj.to !== "undefined";
        return !!(obj.type && obj.key && !!(hasValue || rangeHasValue));
      })
    );

    const rinse = filtered.filter((array) => array.length > 0);

    if (typeof onSave === "function") {
      onSave(type, rinse, (data) => {
        // Return Early if no data provided
        // Or data returns is not an Array
        if (!data || !Array.isArray(data)) return;
        setResult((previousState) => {
          setLoading(false);
          return { ...previousState, [type]: data };
        });
      });
    }
  };

  return {
    handleSave,
    handleDelete,
    handleNewRule,
    convertToQuery,
    handleNewSegment,
    handleRuleChange,
    getObjectFromType,
    handleSegmentChange,
  };
};
