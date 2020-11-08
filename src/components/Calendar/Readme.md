Calendar Example

```jsx
import moment from "moment";
import { Select } from "antd";
import { useState } from "react";
import { Calendar } from "@offsetpartners/react-components";

const [view, setView] = useState("day");
const [selectedDate, setSelectedDate] = useState(new Date());
const events = {
  ["10-2020"]: [
    {
      id: 1,
      timestamp: `2020-${selectedDate.getMonth() + 1}-${12} 00:00:00`,
    },
  ],
};

<>
  <Select
    defaultValue="day"
    onChange={(v) => setView(v)}
    options={[
      { label: "Day View", value: "day" },
      { label: "Month View", value: "month" },
    ]}
  />
  <p>The selected date: {moment(selectedDate).format("MMMM DD, YYYY")}</p>
  <Calendar
    view={view}
    selected={selectedDate}
    maxDate={new Date()}
    setSelected={(v) => setSelectedDate(v)}
    onDateChange={(month, year, forceUpdate) => {
      const temp = [];
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          for (let i = 1; i < 26; i++) {
            const rand = Math.floor(Math.random() * Math.floor(25));

            if (rand <= i) {
              temp.push({
                id: i,
                timestamp: `${year}-${month + 1}-${i} 00:00:00`,
              });
            }
          }
          // changeEvents(temp);
          events[month + 1 + "-" + year] = temp;
          forceUpdate();

          resolve();
        }, 1200);
      });
    }}
    doesCellHaveEvent={(d) => {
      const d1 = new Date(d);
      const temp = events[d1.getMonth() + 1 + "-" + d1.getFullYear()] || [];
      const found = temp.find((event) => {
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

Done with HTML:

```html
<body>
  ...
  <div class="fig-calendar"></div>
  ...

  <script>
    let events = [];

    function changeEvents(e) {
      events = e;
    }
    FigureReact = {
      Calendar: {
        onDateChange: function (month, year, forceUpdate) {
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
          forceUpdate();
        },
        doesCellHaveEvent: function (d) {
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
        },
      },
    };
  </script>

  <script src="https://unpkg.com/@offsetpartners/react-components@latest/dist/figure.js"></script>
</body>
```
