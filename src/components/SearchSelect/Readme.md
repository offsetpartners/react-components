SearchSelect Example

Example:

```jsx
import { useState } from "react";
import Select from "antd/lib/select";
import { MapPin } from "react-feather";
import { useDebounce } from "react-use";
import { SearchSelect } from "@offsetpartners/react-components";

const [mounted, setMounted] = useState(false);
const [search, setSearch] = useState("");
const [options, setOptions] = useState([]);
const [, cancel] = useDebounce(
  () => {
    if (mounted && search.length > 0) {
      fetch("https://randomuser.me/api/?results=5")
        .then((res) => res.json())
        .then((json) => {
          const newOpt = json.results.map((user) => ({
            label: user.name.first + " " + user.name.last,
            value: user.login.username,
          }));
          setOptions(newOpt);
        });
    }
  },
  800,
  [search]
);
useState(() => {
  cancel();
  setMounted(true);

  return () => {
    setMounted(false);
  };
}, []);

<>
  <h4>Dynamic Options</h4>
  <SearchSelect
    options={options}
    filterOption={false}
    autoClearSearchValue={false}
    searchValue={search}
    onSearch={(v) => {
      setSearch(v);
    }}
  ></SearchSelect>

  <h4 style={{ marginTop: 20 }}>Static Options</h4>
  <SearchSelect options={["Apple", "Orange", "Banana"]}></SearchSelect>
</>;
```
