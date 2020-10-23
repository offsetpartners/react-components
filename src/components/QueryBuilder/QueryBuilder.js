import propTypes from "./propTypes";
import React, { memo } from "react";
import { Tabs, Layout } from "antd";
import QueryTab from "./components/QueryTab";
import QueryBuilderProvider, { useQueryBuilder } from "./lib/Provider";

const QueryBuilder = (props) => {
  return (
    <QueryBuilderProvider {...props}>
      <Content />
    </QueryBuilderProvider>
  );
};

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

QueryBuilder.propTypes = propTypes;

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

export default memo(QueryBuilder);
