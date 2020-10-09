DatePicker Example

```jsx
import { Select } from "antd";
import { useState } from "react";
import { DatePicker } from "@offsetpartners/react-components";

const [type, setType] = useState("single");
<>
  <Select
    value={type}
    onChange={(v) => setType(v)}
    style={{ marginBottom: 16 }}
    options={[
      { label: "Single", value: "single" },
      { label: "Range", value: "range" },
    ]}
  />

  <DatePicker type={type} />
</>;
```
