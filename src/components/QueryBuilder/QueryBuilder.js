import { memo } from "react";
import Tabs from "antd/lib/tabs";
import PropTypes from "prop-types";
import Layout from "antd/lib/layout";
import QueryTab from "./components/QueryTab";
import QueryBuilderProvider, { useQueryBuilder } from "./lib/Provider";

const QueryBuilder = memo((props) => {
  return (
    <QueryBuilderProvider {...props}>
      <Content />
    </QueryBuilderProvider>
  );
});

const Content = () => {
  const { TabPane } = Tabs;
  const { inputs, loading, disabled, initial } = useQueryBuilder();

  return (
    <Layout className="fig-query-builder-layout">
      <Layout.Content className="fig-query-builder-content">
        <Tabs animated defaultActiveKey={initial.type}>
          <TabPane disabled={loading || disabled} key="orders" tab="Orders">
            <QueryTab type="orders" inputs={inputs.orders} />
          </TabPane>
          <TabPane
            key="customers"
            tab="Customers"
            disabled={loading || disabled}
          >
            <QueryTab type="customers" inputs={inputs.customers} />
          </TabPane>
        </Tabs>
      </Layout.Content>
    </Layout>
  );
};

QueryBuilder.defaultProps = {
  disabled: false,
  onSave: undefined,

  inputs: {
    orders: null,
    customers: null,
  },

  initial: {
    type: "orders",
    query: undefined,
    result: {
      orders: null,
      customers: null,
    },
  },
};

QueryBuilder.propTypes = {
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

export default QueryBuilder;
