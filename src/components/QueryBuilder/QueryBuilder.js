import React from "react";
import "styles/index.less";
import "./styles/index.css";
import { Tabs, Layout } from "antd";
import QueryTab from "./components/QueryTab";
import QueryBuilderProvider from "./lib/Provider";
import { ORDERS_INPUTS, CUSTOMERS_INPUTS } from "./lib/inputs";

export default function QueryBuilder() {
  const { TabPane } = Tabs;
  const { Content } = Layout;

  return (
    <Layout className="fig-query-builder-layout">
      <Content className="fig-query-builder-content">
        <QueryBuilderProvider>
          <Tabs animated>
            <TabPane key="0" tab="Orders">
              <QueryTab type="orders" inputs={ORDERS_INPUTS} />
            </TabPane>
            <TabPane key="1" tab="Customers">
              <QueryTab type="customers" inputs={CUSTOMERS_INPUTS} />
            </TabPane>
          </Tabs>
        </QueryBuilderProvider>
      </Content>
    </Layout>
  );
}
