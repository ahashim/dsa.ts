import test from "ava";

/*
 * @dev Recursively count the number of characters in an array of strings.
 * @time O(n)
 * @space O(n)
 */
const characterCount = (arr: string[]): number => {
  return arr.length === 1 // base case
    ? arr[0].length
    : arr[0].length + characterCount(arr.slice(1)); // pop first item & recurse
};

test("characterCount", (t) => {
  const actual = characterCount(["ab", "c", "def", "ghij"]);
  const expected = 10;

  t.is(actual, expected);
});

/*
 * @dev Recursively select even numbers from an array.
 * @time O(n)
 * @space O(n)
 */
const selectEven = (arr: number[]): number[] => {
  if (arr.length === 0) return arr; // base case

  return arr[0] % 2 === 0
    ? [arr[0], ...selectEven(arr.slice(1))] // add current even num + recurse
    : selectEven(arr.slice(1)); // skip current odd number & recurse
};

test("selectEven", (t) => {
  const actual = selectEven([1, 2, 3, 4, 5]);
  const expected = [2, 4];

  t.deepEqual(actual, expected);
});

/*
 * @dev Recursively calculate "triangle" numbers.
 * @time O(n)
 * @space O(n)
 */
const triangle = (n: number): number => {
  return n == 1 // base case
    ? 1
    : n + triangle(n - 1); // recurse
};

test("triangle", (t) => {
  const actual = triangle(127);
  const expected = 8128;

  t.is(actual, expected);
});

/*
 * @dev Recursively find index of the letter "x" within a string.
 * @time O(n)
 * @space O(n)
 */
const indexOfX = (str: string): number => {
  return str[0] === "x" // base case
    ? 0
    : 1 + indexOfX(str.slice(1));
};

test("indexOfX", (t) => {
  const actual = indexOfX("abcdefghijklmnopqrstuvwxyz");
  const expected = 23;

  t.is(actual, expected);
});

/*
 * @dev Recursively calculate the number of paths from the opposite corners of
 * a NxM grid:
 * +--+--+--+--+--+--+--+
 * |XX|  |  |  |  |  |  |
 * +--+--+--+--+--+--+--+
 * |  |  |  |  |  |  |  |
 * +--+--+--+--+--+--+--+
 * |  |  |  |  |  |  |XX|
 * +--+--+--+--+--+--+--+
 *
 * @time O(n)
 * @space O(n)
 */
const uniquePaths = (rows: number, cols: number): number => {
  return rows === 1 || cols === 1 // base case
    ? 1
    : uniquePaths(rows - 1, cols) + uniquePaths(rows, cols - 1);
};

test("uniquePaths", (t) => {
  const actual = uniquePaths(3, 7);
  const expected = 28;

  t.is(actual, expected);
});
