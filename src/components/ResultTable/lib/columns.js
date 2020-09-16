import ordersColumns from "./orders.columns";
import customersColumns from "./customers.columns";

/**
 * @param {("orders"|"customers")} type
 */
export default (type) => {
  switch (type) {
    case "orders":
      return ordersColumns;
    case "customers":
      return customersColumns;
  }
};
