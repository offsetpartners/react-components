ResultTable Example

```jsx
import { useState } from "react";
import { Select } from "antd";
import { ResultTable } from "@offsetpartners/react-components";

const [type, toggleType] = useState("orders");

<>
  <Select defaultValue="orders" style={{ marginBottom: 20 }} onSelect={(v) => toggleType(v)}>
    <Select.Option value="orders">Orders</Select.Option>
    <Select.Option value="customers">Customers</Select.Option>
  </Select>

  <ResultTable type={type} />
</>;
```
