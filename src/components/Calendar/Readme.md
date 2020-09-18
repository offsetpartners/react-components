Calendar Example

```jsx
import { useState } from "react";
import { Calendar } from "@offsetpartners/react-components";

const [selectedDate, setSelectedDate] = useState(new Date());
const [events, changeEvents] = useState(() => {
  const temp = [];
  for (let i = 1; i < 26; i++) {
    const rand = Math.floor(Math.random() * Math.floor(25));

    if (rand <= i) {
      temp.push({
        id: i,
        timestamp: `2020-${selectedDate.getMonth() + 1}-${i} 00:00:00`,
      });
    }
  }
  return temp;
});

<>
  <p>The selected date: {selectedDate.toJSON()}</p>
  <Calendar
    selected={selectedDate}
    setSelected={(v) => setSelectedDate(v)}
    onDateChange={(month, year) => {
      const temp = [];
      for (let i = 1; i < 26; i++) {
        const rand = Math.floor(Math.random() * Math.floor(25));

        if (rand <= i) {
          temp.push({
            id: i,
            timestamp: `${year}-${month + 1}-${i} 00:00:00`,
          });
        }
      }
      changeEvents(temp);
    }}
    doesCellHaveEvent={(d) => {
      const d1 = new Date(d);
      const found = events.find((event) => {
        const d2 = new Date(event.timestamp);

        return (
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate()
        );
      });
      return found;
    }}
  />
</>;
```
