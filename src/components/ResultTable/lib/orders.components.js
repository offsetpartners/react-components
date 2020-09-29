import React from "react";
import { IconText } from "components";
import { classNames } from "./tag.config";
import { Row, Col, Tag, Typography, Popover } from "antd";
import { common } from "@offsetpartners/react-components";

const { formatMoney } = common;

export const LinkTooltip = ({ type, href, text, record }) => {
  let Content;
  const popoverProps = {};
  switch (type) {
    case "customer":
      const { email, phone } = record;
      Content = (
        <>
          <IconText icon="mail" text={email} />
          <IconText icon="phone" text={phone} />
        </>
      );
      popoverProps.overlayStyle = {
        maxWidth: 260,
      };
      popoverProps.title = (
        <Typography.Text className="fig-typography fig-body fig-body-md">
          Quickview Customer Details
        </Typography.Text>
      );

      break;
    case "order":
      const products = record.products || [];
      Content = products.map((p, index) => {
        const key = `product-${p.id}-${index}`;
        const isFirst = index === 0;
        const isLast = index === products.length - 1;

        const offset = !isFirst && { marginTop: 16 };
        const border = !isLast && {
          paddingBottom: 16,
          borderBottom: "1px solid #dee2e6",
        };
        const rowStyle = { ...offset, ...border, flexWrap: "nowrap" };
        return (
          <Row key={key} align="top" gutter={[8, 0]} style={rowStyle}>
            <Col span={3} style={{ marginTop: 4 }}>
              <Tag color="#2a2f56">{p.quantity > 10 ? "10+" : p.quantity}</Tag>
            </Col>

            <Col style={{ overflow: "hidden" }}>
              <Row>
                <Col>
                  <Typography.Text className="fig-typography fig-sm-body fig-sm-body-md">
                    {p.name || "-"} ({p.bottle_size})
                  </Typography.Text>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Typography.Text className="fig-typography fig-xs">
                    SKU: {p.sku || "-"}
                  </Typography.Text>

                  <Typography.Text
                    style={{ marginLeft: 14 }}
                    className="fig-typography fig-xs"
                  >
                    ${formatMoney(p.price)} each
                  </Typography.Text>
                </Col>
              </Row>
            </Col>

            <Col span={6} style={{ textAlign: "end" }}>
              <Typography.Text className="fig-typography fig-sm-body fig-sm-body-md">
                ${formatMoney(p.price * p.quantity) || 0}
              </Typography.Text>
            </Col>
          </Row>
        );
      });
      popoverProps.overlayStyle = {
        padding: 0,
        maxWidth: 350,
      };
      popoverProps.title = (
        <Typography.Text className="fig-typography fig-body fig-body-md">
          Quickview Order Details
        </Typography.Text>
      );
      break;
    case "message":
      const { gift_message = "", editable_notes = "" } = record;
      Content = (
        <Row align="top" gutter={[8, 0]}>
          <Col span={24}>
            <IconText text={editable_notes} icon="MessageSquare" />
          </Col>

          <Col span={24}>
            <IconText text={gift_message} icon="gift" />
          </Col>
        </Row>
      );
      popoverProps.overlayStyle = {
        maxWidth: 260,
      };
      popoverProps.title = (
        <Typography.Text className="fig-typography fig-body fig-body-md">
          Quickview Order Messages
        </Typography.Text>
      );
      break;
  }

  if (href) {
    return (
      <Popover content={Content} {...popoverProps}>
        <a href={href}>
          <Typography.Text className="fig-typography fig-body">
            {text}
          </Typography.Text>
        </a>
      </Popover>
    );
  } else {
    return (
      <Popover content={Content} {...popoverProps}>
        <Typography.Text
          style={{ cursor: "default" }}
          className="fig-typography fig-body"
        >
          {text}
        </Typography.Text>
      </Popover>
    );
  }
};

export const Label = ({ objKey, text }) => {
  const className = classNames[objKey];
  return <Tag className={className}>{text}</Tag>;
};
