import React from "react";
import PropTypes from "prop-types";
import * as Feather from "react-feather";
import { Space, Typography } from "antd";
import propTypes from "./propTypes";

/**
 * Returns appropriate Typography classes
 * @param {("large"|"default"|"small")} size
 * @param {("semibold"|"medium")} variant
 * @returns {Array.<String>}
 */
const getTypographyClassNames = (size, variant) => {
  let prefix = "";
  const classNames = [];
  // Get the appropriate Size
  switch (size) {
    case "large":
      prefix = "-lg-";
      classNames.push("fig-lg-body");
      break;
    case "small":
      prefix = "-sm-";
      classNames.push("fig-sm-body");
      break;
    default:
      classNames.push("fig-body");
  }

  switch (variant) {
    case "semibold":
      classNames.push(`fig${prefix}body-semibold`);
      break;
    case "medium":
      classNames.push(`fig${prefix}body-md`);
      break;
  }

  return classNames;
};

const setupIcon = (icon, iconProps) => {
  if (Feather[icon.charAt(0).toUpperCase().concat(icon.slice(1))]) {
    const Icon = Feather[icon.charAt(0).toUpperCase().concat(icon.slice(1))];
    if (iconProps.bordered) {
      const style = {
        padding: 4,
        borderRadius: 4,
        display: "flex",
        border: "1px solid",
        alignItems: "center",
        justifyContent: "center",
        borderColor: iconProps.borderColor || "rgba(79, 82, 104, 0.4)",
      };
      return (
        <div style={style}>
          <Icon {...iconProps} color="#4F5268" />
        </div>
      );
    } else {
      return <Icon {...iconProps} />;
    }
  } else {
    return null;
  }
};

const IconText = (props) => {
  const {
    text,
    size,
    icon,
    align,
    spacing,
    variant,
    iconProps,
    iconPlacement,
  } = props;
  const className = ["fig-typography"];
  className.push(getTypographyClassNames(size, variant));

  const transformBordered = iconProps.bordered ? 1 : undefined;
  const validIconProps = {
    width: 12,
    height: 12,
    ...iconProps,
    bordered: transformBordered,
  };

  const Icon = setupIcon(icon, validIconProps);

  if (iconPlacement === "right") {
    return (
      <Space size={spacing} align={align}>
        <Typography.Text className={className.join(" ")}>
          {text}
        </Typography.Text>
        {Icon}
      </Space>
    );
  }

  return (
    <Space size={spacing} align={align}>
      {Icon}
      <Typography.Text className={className.join(" ")}>{text}</Typography.Text>
    </Space>
  );
};

IconText.propTypes = propTypes;
IconText.displayName = "IconText";
IconText.defaultProps = {
  text: "",
  icon: "",
  spacing: 8,
  variant: "",
  align: "start",
  size: "default",
  iconPlacement: "left",
  iconProps: {
    width: 12,
    height: 12,
    bordered: undefined,
  },
};
export default IconText;
