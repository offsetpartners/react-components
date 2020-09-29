import React from "react";
import { Tag } from "antd";
import { classNames } from "../../lib/tag.config";

export default ({ objKey, text }) => {
  const className = classNames[objKey];
  return <Tag className={className}>{text}</Tag>;
};
