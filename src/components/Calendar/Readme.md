Calendar Example

```jsx
import { useState } from "react";
import { Calendar } from "@offsetpartners/react-components";

const [selectedDate, setSelectedDate] = useState(new Date());

<>
    <p>The selected date: {selectedDate.toJSON()}</p>
    <Calendar selected={selectedDate} setSelected={(v) => setSelectedDate(v)} />
</>
```
