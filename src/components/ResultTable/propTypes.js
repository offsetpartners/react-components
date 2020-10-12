import PropTypes from "prop-types";

export default {
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
