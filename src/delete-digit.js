const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const numStr = String(n);
  let maxResult = 0;
  for (let i = 0; i < numStr.length; i++) {
    const result = Number(numStr.slice(0, i) + numStr.slice(i + 1));
    maxResult = Math.max(maxResult, result);
  }
  return maxResult;
}

module.exports = {
  deleteDigit
};
