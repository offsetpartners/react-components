import PropTypes from "prop-types";
import { MomentFormatSpecification } from "moment";

export default {
  /**
   * Text to display
   */
  text: PropTypes.string,

  /**
   * Refer to Feather Icon Pack to get all Icon Names
   */
  icon: PropTypes.string,

  /**
   * Vertical Alignment
   */
  align: PropTypes.oneOf(["start", "center", "end", "baseline"]),

  /**
   * Spacing between Icon and Text
   */
  spacing: PropTypes.number,

  /**
   * Size of the Text
   */
  size: PropTypes.oneOf(["large", "default", "small"]),
  /**
   * Font Weight
   */
  variant: PropTypes.oneOf(["", "medium", "semibold"]),

  /**
   * Placement of the Icon respective of the text
   */
  iconPlacement: PropTypes.oneOf(["left", "right"]),

  /**
   * Props to pass on to Icon Component
   */
  iconProps: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    bordered: PropTypes.bool,
    borderColor: PropTypes.string,
  }),
};
