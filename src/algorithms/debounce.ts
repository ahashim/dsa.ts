/* eslint-disable @typescript-eslint/no-explicit-any */
import test from "ava";

type Callback = (...args: any[]) => any;

/*
 * @dev Implements a debouncer.
 */
const debounce = (fn: Callback, wait: number): ReturnType<typeof fn> => {
  let timerID: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timerID);

    // apply timerID context via closure
    timerID = setTimeout(() => fn.apply(this, args), wait);
  };
};

test("debounce", (t) => {
  let callCount = 0;

  const debounced = debounce((value: string) => {
    ++callCount;
    return value;
  }, 32);

  const actual = [debounced("a"), debounced("b"), debounced("c")];
  const expected = [undefined, undefined, undefined];

  t.is(callCount, 0);
  t.deepEqual(actual, expected);
});
