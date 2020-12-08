import moment from "moment";
import common from "common";
import { classNames } from "./tag.config";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Tag from "antd/lib/tag";
import Typography from "antd/lib/typography";

const { formatMoney } = common;

export default [
  {
    fixed: true,
    dataIndex: "id",
    title: "CUSTOMER #",
    render: (text, record, index) => {
      const hasNotes = record.temporary_customer_notes;
      const statusText = hasNotes ? "Needs Attn" : record.status || "-";
      const className = hasNotes
        ? classNames["Needs Attention"]
        : classNames[record.status];
      return (
        <Row>
          <Col span={24}>
            <Typography.Text>{text}</Typography.Text>
          </Col>

          <Col span={24}>
            <Tag className={className}>{statusText}</Tag>
          </Col>
        </Row>
      );
    },
  },
  {
    fixed: true,
    title: "NAME",
    dataIndex: "first_name",
    render: (text, record, index) => {
      const fullName = `${record.first_name} ${record.last_name}`;
      const hasLocation = record.mailing_city && record.mailing_state;
      return (
        <Row>
          <Col span={24}>
            <Typography.Text strong>{fullName}</Typography.Text>
          </Col>

          {hasLocation && (
            <Col span={24}>
              <Typography.Text>
                {record.mailing_city} {record.mailing_state}
              </Typography.Text>
            </Col>
          )}
        </Row>
      );
    },
  },
  {
    title: "CONTACT",
    dataIndex: "email",
    render: (text, record, index) => {
      const number = record.phone || record.mobile || record.work || "-";

      return (
        <Row>
          <Col span={24}>
            <Typography.Text>{record.email}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text>{number}</Typography.Text>
          </Col>
        </Row>
      );
    },
  },
  {
    title: "AGE",
    dataIndex: "birthday",
    render: (text, record, index) => {
      const birthday = moment(text, "YYYY-MM-DD");
      const age = moment().diff(birthday, "years");

      return age || "-";
    },
  },
  {
    title: "JOINED",
    dataIndex: "created",
    render: (text, record, index) => {
      const momentObj = moment(text, "YYYY-MM-DD hh:mm:ss");
      const date = momentObj.format("MM/DD/YYYY");
      return (
        <Row>
          <Col span={24}>{date || "-"}</Col>
        </Row>
      );
    },
  },
  {
    title: "SOURCE",
    dataIndex: "customer_source",
    render: (text, record, index) => {
      return text || "-";
    },
  },
  {
    title: "REFERRAL",
    dataIndex: "referral_source",
    render: (text, record, index) => {
      return (
        <Row>
          <Col span={24}>{text || "-"}</Col>

          {record?.note && <Col span={24}>{record.note}</Col>}
        </Row>
      );
    },
  },
  {
    title: "LAST ORDER",
    dataIndex: "last_order",
    render: (text, record, index) => {
      const format = moment(text, "YYYY-MM-DD");

      if (format.isValid()) {
        return format.format("MM/DD/YYYY");
      }
      return "-";
    },
  },
  {
    title: "CREDIT",
    dataIndex: "credits",
    render: (text, record, index) => {
      return `$${formatMoney(text) || "0.00"}`;
    },
  },
  {
    title: "LIFETIME",
    align: "right",
    dataIndex: "order_total",
    sorter: (a, b) => a.order_total - b.order_total,
    render: (text, record, index) => {
      return `$${formatMoney(text)}`;
    },
  },
];
