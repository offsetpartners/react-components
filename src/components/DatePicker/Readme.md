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

  <DatePicker
    type={type}
    initialValue={[
      new Date(new Date().setMonth(1)),
      new Date(new Date(new Date().setMonth(1)).setDate(11)),
    ]}
    // maxDate={new Date()}
    maxDateRange={5}
    onSave={(inutId, value) => {
      console.log(value)
    }}
  />
</>;
```

Done with HTML:

```html
<body>
  ...
  <div class="fig-datepicker"></div>
  ...

  <script>
    const value1 = new Date(new Date().setMonth(1));
    const value2 =   new Date(new Date(new Date().setMonth(1)).setDate(11);
    FigureReact = {
      DatePicker: {
        type: "range",
        intialValues: [value1, value2]
      },
    };
  </script>

  <script src="https://unpkg.com/@offsetpartners/react-components@latest/dist/figure.js"></script>
</body>
```
