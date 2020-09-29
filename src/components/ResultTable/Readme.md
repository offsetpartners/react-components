ResultTable Example

```jsx
import { Select } from "antd";
import { useState } from "react";
import { orders, customers } from "./mocks";
import { ResultTable } from "@offsetpartners/react-components";

const [type, toggleType] = useState("orders");

<>
  <Select
    defaultValue="orders"
    style={{ marginBottom: 20 }}
    onSelect={(v) => toggleType(v)}
  >
    <Select.Option value="orders">Orders</Select.Option>
    <Select.Option value="customers">Customers</Select.Option>
  </Select>

  <ResultTable
    type={type}
    data={type === "orders" ? orders : customers}
    onSelect={(keys, records) => {
      console.log(keys, records);
    }}
  />
</>;
```

Done with HTML:

```html
<body>
  ...
  <div class="fig-result-table"></div>
  ...

  <script>
    FigureReact = {
      ResultTable: {
        data: orders,
        type: "orders",
        onSelect: function (keys, records) {
          console.log(keys, records);
        },
      },
    };
  </script>

  <script src="https://unpkg.com/@offsetpartners/react-components@latest/dist/figure.js"></script>
</body>
```
