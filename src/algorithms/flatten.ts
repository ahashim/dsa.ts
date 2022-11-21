import test from "ava";

/*
 * @dev Flattens an array of sub-arrays recursively up a certain depth
 */
const flatten = (arr: unknown[], depth = Infinity): unknown[] => {
  if (!arr.length) return [];

  const flat = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (Array.isArray(item) && depth > 0) {
      flat.push(...flatten(item, depth - 1));
    } else {
      flat.push(item);
    }
  }

  return flat;
};

test("zero levels deep", (t) => {
  const arr = [1, [2, [3, [4, [5, [6, [7, [8]]]]]]]];

  t.deepEqual(flatten(arr, 0), [1, [2, [3, [4, [5, [6, [7, [8]]]]]]]]);
});

test("one level deep", (t) => {
  const arr = [1, [2, [3, [4, [5, [6, [7, [8]]]]]]]];

  t.deepEqual(flatten(arr, 1), [1, 2, [3, [4, [5, [6, [7, [8]]]]]]]);
});

test("two levels deep", (t) => {
  const arr = [1, [2, [3, [4, [5, [6, [7, [8]]]]]]]];

  t.deepEqual(flatten(arr, 2), [1, 2, 3, [4, [5, [6, [7, [8]]]]]]);
});

test("infinite depth", (t) => {
  const arr = [1, [2, [3, [4, [5, [6, [7, [8]]]]]]]];

  t.deepEqual(flatten(arr), [1, 2, 3, 4, 5, 6, 7, 8]);
});

test("empty array", (t) => {
  const arr: number[] = [];

  t.deepEqual(flatten(arr), []);
});
