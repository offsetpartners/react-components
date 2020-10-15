import "./typeDefs";
import { message } from "antd";

export default (uniqueId, orders, changeOrders, customers, changeCustomers) => {
  /**
   * @type {GetObjectFromType}
   */
  const getObjectFromType = (type = "orders") => {
    switch (type) {
      case "orders":
        return { object: orders, handlerFunction: changeOrders };
      case "customers":
        return { object: customers, handlerFunction: changeCustomers };
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

  const convertToQuery = (type) => {
    const { object } = getObjectFromType(type);

    /**
     * @type {Array<Rule>} arr
     */
    const arr = [];

    const { segments } = object;

    // Get Rules from each Segment
    const rules = segments.map((segment) => segment.rules);

    // "date",
    // "number",
    // "keyword",
    // "multi_select",
    // "boolean_select",
    // "country_region_select",
    const Types = {
      date: "range",
      number: "range",
      keyword: "term",
      multi_select: "terms"
    };
    /**
     * 
     * @param {RuleTypes} type 
     * @param {String} condition 
     * @param {Any} value 
    //  * @returns
     */
    const ruleToElasticSearch = (type, condition, value) => {
      switch (type) {
        case "date":
          return {
            
          }
      }
    };

    rules.map((rule) => {});
  };

  return {
    getObjectFromType,
    handleSegmentChange,
    handleNewSegment,
    handleDelete,
    handleRuleChange,
    handleNewRule,
  };
};
