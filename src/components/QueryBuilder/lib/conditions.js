import moment from "moment";

export const MULTI_SELECT_CONDITIONS = {
  "exactly matches": {
    type: "terms",
    value: (values) => {
      return {
        value: values,
      };
    },
  },
  "doesn't exactly match": {
    type: "not_terms",
    value: (values) => {
      return {
        value: values,
      };
    },
  },
};
export const BOOLEAN_SELECT_CONDITION = {
  is: {
    type: "match_phrase",
    value: (bool) => {
      return {
        value: bool,
      };
    },
  },
  "is not": {
    type: "not_match_phrase",
    value: (bool) => {
      return {
        value: bool,
      };
    },
  },
};
export const NUMBER_CONDITIONS = {
  "is less than": {
    type: "range",
    value: (number) => {
      return {
        to: number - 1,
      };
    },
  },
  "is greater than": {
    type: "range",
    value: (number) => {
      return {
        from: number - 1,
      };
    },
  },
  "is equal to": {
    type: "range",
    value: (number) => {
      return {
        from: number,
        to: number,
      };
    },
  },
  "is less than or equal to": {
    type: "range",
    value: (number) => {
      return {
        to: number,
      };
    },
  },
  "is greather than or equal to": {
    type: "range",
    value: (number) => {
      return {
        from: number,
      };
    },
  },
  "is between": {
    type: "range",
    value: (numbers) => {
      return {
        from: numbers[0],
        to: numbers[1],
      };
    },
  },
};
export const DATE_CONDITIONS = {
  "is before": {
    type: "range",
    value: (date) => {
      return {
        to: moment(date).subtract(1, "d").unix(),
      };
    },
  },
  "is after": {
    type: "range",
    value: (date) => {
      return {
        from: moment(date).add(1, "d").unix(),
      };
    },
  },
  "is equal": {
    type: "range",
    value: (date) => {
      const momentDate = moment(date);
      return {
        to: momentDate.clone().endOf("date").unix(),
        from: momentDate.clone().startOf("day").unix(),
      };
    },
  },
  "is before or equal to": {
    type: "range",
    value: (date) => {
      return {
        to: moment(date).unix(),
      };
    },
  },
  "is after or equal to": {
    type: "range",
    value: (date) => {
      return { from: moment(date).unix() };
    },
  },
  "is between": {
    type: "range",
    value: (date) => {
      return {
        from: moment(date[0]).unix(),
        to: moment(date[1]).unix(),
      };
    },
  },
};
export const KEYWORD_CONDITIONS = {
  //   "contains": {
  //  type: "match_phrase"
  //   },
  // "does not contain",
  "exactly matches": {
    type: "match_phrase",
    value: (phrase) => {
      return {
        value: phrase,
      };
    },
  },
  "does not exactly match": {
    type: "not_match_phrase",
    value: (phrase) => {
      return {
        value: phrase,
      };
    },
  },
  // "starts with",
  // "does not start with",
  // "ends with",
  // "does not end with",
};
