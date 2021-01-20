Filter Example

Example:

```jsx
import { Filter } from "@offsetpartners/react-components";

const options = {
  order_channel: {
    type: "multi_select",
    label: "Order Channel",
    values: ["Web", "POS", "Admin"],
  },
  shipping_status: {
    type: "multi_select",
    label: "Shipping Status",
    values: ["Shipped", "Cancelled", "Delivered"],
  },
  payment_status: {
    type: "boolean_select",
    label: "New Signups",
    values: ["Paid", "Not Paid"],
  },
  shipping_date: {
    type: "date",
    label: "Shipping Date",
    props: {
      type: "range",
    },
  },
  first_name: {
    type: "text",
    label: "First Name",
  },
};
<>
  <Filter options={options} />
</>;
```
