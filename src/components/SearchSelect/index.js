import SearchSelect from "./SearchSelect";
import renderSearchSelect from "common/renderSearchSelect";

try {
  renderSearchSelect();
} catch (e) {}

// Also allows to be used within a React Application
SearchSelect.displayName = "SearchSelect";
export default SearchSelect;
