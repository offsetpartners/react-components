QueryBuilder Example

```jsx
import { QueryBuilder } from "@offsetpartners/react-components";
import { ORDERS_INPUTS, CUSTOMERS_INPUTS } from "./lib/inputs.mocks";

<QueryBuilder
  inputs={{ orders: ORDERS_INPUTS, customers: CUSTOMERS_INPUTS }}
  onSave={(type, query, setResult) => {
    const temp = [];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        for (let i = 1; i < 5; i++) {
          const rand = Math.floor(Math.random() * Math.floor(25));

          if (rand <= i) {
            temp.push({
              id: i.toString(),
              last_name: "Ragojos",
              first_name: "Victor",
            });
          }
        }

        setResult(temp);

        resolve();
      }, 1200);
    });
  }}
/>;
```

Done with HTML:

```html
<body>
  ...
  <div id="fig-query-builder"></div>
  ...

  <script>
    FigureReact = {
      QueryBuilder: {},
    };
  </script>

  <script src="https://unpkg.com/@offsetpartners/react-components@latest/dist/figure.js"></script>
</body>
```
