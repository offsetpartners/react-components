import React from "react";
import "./styles/index.less";
import "./styles/index.css";
import { Tabs, Layout } from "antd";
import QueryTab from "./components/QueryTab";
import QueryBuilderProvider from "./Provider";
import { ORDERS_INPUTS, CUSTOMERS_INPUTS } from "./lib/inputs";

export default function QueryBuilder() {
  const { TabPane } = Tabs;
  const { Content } = Layout;

  return (
    <Layout
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Content
        style={{
          width: "100%",
          maxWidth: 960,
          display: "flex",
          padding: "50px 50px",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
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
