export const getTextWidth = (text, font) => {
  // re-use canvas object for better performance
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};

export const fixOptions = (options) => {
  const fixed = options.map((option) => {
    if (typeof option !== "object") {
      return { value: option, label: option };
    } else if (option.value && option.label) {
      return option;
    } else {
      throw new Error(
        "SearchSelect failed: You must either provide an array of string/number or an object with a structure of { value: (String|Number), label: (String|Number)}"
      );
    }
  });

  if (!Array.isArray(fixed) || fixed.length === 0) {
    return [];
  }

  return fixed;
};

export const handleChange = (
  val = [],
  selectWidth,
  optionValues,
  setSelectMaxTagCount
) => {
  if (Array.isArray(val)) {
    let width = 0;
    let tagCount = null;

    const offset = 20;
    const ratio = 0.6;

    setSelectMaxTagCount(null);
    const sorted = val.sort(function (a, b) {
      const findA = optionValues.find(function (f) {
        if (!f.value) return f === a;
        else return f.value === a;
      });

      const findB = optionValues.find(function (f) {
        if (!f.value) return f === b;
        else return f.value === b;
      });

      if (findA.label && findB.label) {
        return findA.label.length - findB.label.length;
      }

      return findA.length - findB.length;
    });

    sorted.forEach(function (v, index) {
      const find = optionValues.find(function (f) {
        if (!f.value) return f === v;
        else return f.value === v;
      });

      if (find && find.label) {
        width += getTextWidth(find.label, "bold 14pt arial") + offset;
      } else {
        width += getTextWidth(find, "bold 14pt arial") + offset;
      }
      if (typeof tagCount === "number") return;
      if (selectWidth <= 0) return;
      if (width <= selectWidth * ratio) return;

      tagCount = index;
    });
    setSelectMaxTagCount(tagCount);
    return sorted;
  } else {
    return val;
  }
};
