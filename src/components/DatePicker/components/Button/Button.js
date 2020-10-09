import React from "react";
import moment from "moment";
import { Button } from "antd";
import Popover from "../Popover";
import { Calendar } from "react-feather";
import { useDatePicker } from "components/DatePicker/provider";

export default () => {
  const { type, value, format } = useDatePicker();
  let text;

  if (type === "range") {
    text = `${moment(value[0]).format(format)}-${moment(value[1]).format(
      format
    )}`;
  } else {
    text = moment(value).format(format);
  }
  return (
    <Popover>
      <Button type="ghost" className="fig-datepicker-button">
        <Calendar size={18} strokeWidth={1.5} />
        <span className="fig-typography fig-body" style={{ marginLeft: 8 }}>
          {text}
        </span>
      </Button>
    </Popover>
  );
};
