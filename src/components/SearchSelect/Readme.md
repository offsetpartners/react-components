SearchSelect Example

Example:

```jsx
import { MapPin } from "react-feather";
import { common, SearchSelect } from "@offsetpartners/react-components";

const options = common.flatten(["Apple", "Orange", "Grapes"]);
<SearchSelect
  options={options}
//   suffixIcon={<MapPin />}
/>;
```
