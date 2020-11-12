Timepicker Example

```jsx
import { Select } from "antd";
import { useState } from "react";
import { TimePicker } from "@offsetpartners/react-components";

const [type, setType] = useState("single");
<div style={{ maxWidth: 300, display: "flex", flexDirection: "column" }}>
  <Select
    value={type}
    onChange={(v) => setType(v)}
    style={{ marginBottom: 16 }}
    options={[
      { label: "Single", value: "single" },
      { label: "Range", value: "range" },
    ]}
  />

  <TimePicker type={type} onSave={(id, v) => console.log(v.getHours())} />
</div>;
```
