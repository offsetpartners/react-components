import React from "react";
import moment from "moment";

const handlers = (props) => {
  const { selected, setSelected } = props;

  return {
    // DatePicker handlers
    datepicker: {
      /**
       * @param {string} id Selection identifier
       * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e Event Object
       * @param {Object} props Additional Props
       */
      onParentChange: (id, e, props) => {
        const { type } = props;
        const isChecked = e.target.checked;

        switch (type) {
          case "single":
            if (isChecked) {
              setSelected((prev) => ({
                ...prev,
                [id]: new Date(),
              }));
            } else {
              const oldKeys = Object.keys(selected);
              const newKeys = oldKeys.filter((key) => key !== id);
              setSelected((prev) => {
                const newSelected = {};
                newKeys.forEach((key) => {
                  newSelected[key] = prev[key];
                });
                return newSelected;
              });
            }
            break;
          default:
            // For multiple type
            if (isChecked) {
              const today = moment();
              const nextDay = today.clone().add(1, "d");
              setSelected((prev) => ({
                ...prev,
                [id]: [today.toDate(), nextDay.toDate()],
              }));
            } else {
              const oldKeys = Object.keys(selected);
              const newKeys = oldKeys.filter((key) => key !== id);
              setSelected((prev) => {
                const newSelected = {};
                newKeys.forEach((key) => {
                  newSelected[key] = prev[key];
                });
                return newSelected;
              });
            }
        }
      },
    },
    // Select handlers
    select: {
      /**
       * @param {string} id Selection identifier
       * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e Event Object
       * @param {Object} props Additional Props
       */
      onParentChange: (id, e, props) => {
        const { type, values } = props;
        const isChecked = e.target.checked;

        switch (type) {
          case "single":
            if (isChecked) {
              setSelected((prev) => ({
                ...prev,
                [id]: values[0] || true,
              }));
            } else {
              const oldKeys = Object.keys(selected);
              const newKeys = oldKeys.filter((key) => key !== id);
              setSelected((prev) => {
                const newSelected = {};
                newKeys.forEach((key) => {
                  newSelected[key] = prev[key];
                });
                return newSelected;
              });
            }
            break;
          default:
            // For multiple type
            if (isChecked) {
              setSelected((prev) => ({
                ...prev,
                [id]: [],
              }));
            } else {
              const oldKeys = Object.keys(selected);
              const newKeys = oldKeys.filter((key) => key !== id);
              setSelected((prev) => {
                const newSelected = {};
                newKeys.forEach((key) => {
                  newSelected[key] = prev[key];
                });
                return newSelected;
              });
            }
        }
      },
      /**
       * @param {string} id Selection identifier
       * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e Event Object
       * @param {Object} props Additional Props
       */
      onChildChange: (id, e, props) => {
        const { option, options } = props;
        const isChecked = e.target.checked;

        if (id === "SELECT_ALL") {
          if (isChecked) {
            setSelected((prev) => ({
              ...prev,
              [option]: ["SELECT_ALL"].concat(
                options.map((o) => (o.value ? o.value : o))
              ),
            }));
          } else {
            setSelected((prev) => ({
              ...prev,
              [option]: [],
            }));
          }
          return;
        }

        if (isChecked) {
          setSelected((prev) => ({
            ...prev,
            [option]: prev[option]
              .concat([id])
              .filter((o) => o !== "SELECT_ALL"),
          }));
        } else {
          const oldValues = selected[option];
          const newValues = oldValues.filter((key) => key !== id);
          setSelected((prev) => ({
            ...prev,
            [option]: newValues.filter((o) => o !== "SELECT_ALL"),
          }));
        }
      },
    },
  };
};

export default handlers;
