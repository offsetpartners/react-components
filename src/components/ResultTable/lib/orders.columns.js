import moment from "moment";
import Space from "antd/lib/space";
import { shipMethods } from "./tag.config";
import IconText from "components/IconText";
import formatMoney from "common/formatMoney";
import Typography from "antd/lib/typography";
import { Gift, LogIn, LogOut, MessageSquare } from "react-feather";
import Label from "components/ResultTable/components/Orders/Label";
import LinkTooltip from "components/ResultTable/components/Orders/LinkTooltip";

export default [
  {
    title: "ORDER #",
    dataIndex: "order_id",
    render: (text, record, index) => {
      return (
        <LinkTooltip
          text={text}
          type="order"
          record={record}
          href={`/orders/overview/${record.customer_id}`}
        />
      );
    },
  },
  {
    title: "STATUS",
    dataIndex: "status",
    render: (text, record, index) => {
      const { payment_status, ship_status } = record;
      return (
        <>
          <Label objKey={payment_status} text={payment_status} />
          <Label objKey={ship_status} text={ship_status} />
        </>
      );
    },
  },
  {
    title: "MESSAGE",
    dataIndex: "editable_notes",
    render: (text, record, index) => {
      const { gift_message = "", editable_notes = "" } = record;

      return (
        <>
          <LinkTooltip
            type="message"
            record={record}
            text={
              <>
                {editable_notes && editable_notes.length > 0 && (
                  <IconText
                    Icon={MessageSquare}
                    iconProps={{ bordered: true }}
                  />
                )}
                {gift_message && gift_message.length > 0 && (
                  <IconText Icon={Gift} iconProps={{ bordered: true }} />
                )}
              </>
            }
          />
        </>
      );
    },
  },
  {
    title: "CUSTOMER",
    dataIndex: "first_name",
    render: (text, record, index) => {
      const { first_name, last_name } = record;
      const fullName = `${first_name} ${last_name}`;

      return (
        <LinkTooltip
          record={record}
          text={fullName}
          type="customer"
          href={`/customers/overview/${record.customer_id}`}
        />
      );
    },
  },
  {
    title: "DATE",
    dataIndex: "datestamp",
    render: (text, record, index) => {
      return (
        <Typography.Text className="fig-typography fig-body">
          {moment(text, "YYYY-MM-DD hh:mm:ss").format("MMM DD, YYYY, hh:mm a")}
        </Typography.Text>
      );
    },
  },
  {
    title: "ITEMS",
    dataIndex: "products",
    render: (text, record, index) => {
      try {
        if (record.products && Array.isArray(record.products)) {
          return (
            <LinkTooltip
              type="order"
              record={record}
              text={record.products.length}
            />
          );
        }
      } catch (e) {}
      return 0;
    },
  },
  {
    title: "SHIPPING",
    dataIndex: "shipping_state",
    render: (text, record, index) => {
      const {
        shipping,
        shipping_state,
        actual_ship_date,
        requested_ship_date,
        shipping_method_code,
        shipping_method_name,
        shipping_method_carrier,
      } = record;

      const method =
        shipMethods?.[shipping_method_carrier]?.[shipping_method_code] ||
        shipping_method_name ||
        "-";
      const actual =
        actual_ship_date &&
        moment(actual_ship_date, "YYYY-MM-DD").format("MM/DD/YYYY");

      const requested =
        requested_ship_date &&
        moment(requested_ship_date, "YYYY-MM-DD").format("MM/DD/YYYY");
      return (
        <>
          <div>
            <Label text={shipping_state} />${formatMoney(shipping)}, {method}
          </div>

          {(actual || requested) && (
            <Space size={14} align="center">
              {requested && (
                <IconText size="small" Icon={LogOut} text={requested} />
              )}

              {actual && <IconText size="small" Icon={LogIn} text={actual} />}
            </Space>
          )}
        </>
      );
    },
  },
  {
    align: "right",
    title: "AMOUNT",
    dataIndex: "total",
    sorter: (a, b) => a.total - b.total,
    render: (text, record, index) => {
      return <Typography.Text strong>$ {formatMoney(text)}</Typography.Text>;
    },
  },
];
