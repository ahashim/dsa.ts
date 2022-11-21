import test from "ava";

/*
 * @dev Zips the values of 2 arrays together into an output array of tuples.
 */
const zip = (arr1: unknown[], arr2: unknown[]): unknown[][] | null => {
  // cannot zip if either array is empty
  if (arr1.length === 0 || arr2.length === 0) return null;

  // zip up to the smaller array's size
  const lowerBound = Math.min(arr1.length, arr2.length),
    zipped: unknown[][] = [];

  // iterate & zip
  for (let i = 0; i < lowerBound; i++) zipped.push([arr1[i], arr2[i]]);

  return zipped;
};

test("same sized arrays", (t) => {
  const arr1 = [1, 3, 5, 7];
  const arr2 = [2, 4, 6, 8];

  t.deepEqual(zip(arr1, arr2), [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
  ]);
});

test("different sized arrays", (t) => {
  const arr1 = [1, 3, 5, 7, 9, 11, 13];
  const arr2 = [2, 4, 6, 8];

  t.deepEqual(zip(arr1, arr2), [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
  ]);
});

test("an empty array", (t) => {
  const arr1: number[] = [];
  const arr2 = [2, 4, 6, 8];

  t.deepEqual(zip(arr1, arr2), null);
});
