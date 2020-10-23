import PropTypes from "prop-types";

export default {
  /**
   * A callback function that will be executed once Query
   * @typedef {Function|Null} onSave
   * @param {"orders"|"customers"} type Type of Query <br/>
   * @param {Array} query Converted Rules to Elastic Search Query <br/>
   * @param {Function} setRule Function that will re-render the Component as well as
   * change the Result internal State for the Component. When called, you must pass
   * an array for function to execute. <br />
   */
  onSave: PropTypes.func,

  /**
   * Sets the ability for Users to change Tabs, Segments/Rules, and Save Button
   */
  disabled: PropTypes.bool,

  /**
   * Inputs
   * @typedef {{orders: QueryBuilderInput, customers: QueryBuilderInput}} inputs
   */
  inputs: PropTypes.shape({
    orders: PropTypes.object,
    customers: PropTypes.object,
  }),

  /**
   * Initial State of Component
   * @property {Types} type
   * @property {Object} query
   * @property {{orders: Array, customers: Array}} result
   */
  initial: PropTypes.shape({
    type: PropTypes.string,
    query: PropTypes.object,
    result: PropTypes.shape({
      orders: PropTypes.array,
      customers: PropTypes.array,
    }),
  }),
};
