/**
 * Flattens an Array.
 * If parameter isn't an array then just return it.
 * @param {Array} array
 */
export default (array) => {
  if (!array || !Array.isArray(array)) {
    return array;
  }

  return [].concat([], ...array);
};
