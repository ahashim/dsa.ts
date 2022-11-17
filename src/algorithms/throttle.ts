/* eslint-disable @typescript-eslint/no-explicit-any */
import test from "ava";

type Callback = (...args: any[]) => any;

/*
 * @dev Implements a throttle control for a function.
 */
const throttle = (fn: Callback, wait = 300): ReturnType<typeof fn> => {
  let engaged = false;

  return function (this: any, ...args: any) {
    // exit early if throttle is engaged
    if (engaged) return;

    // engage throttle
    engaged = true;

    // call the funtion with local context
    fn.apply(this, args);

    // disengage after wait time
    setTimeout(() => (engaged = false), wait);
  };
};

test("throttle", (t) => {
  let callCount = 0;
  const throttled = throttle(() => callCount++, 32);

  throttled();
  throttled();
  throttled();
  throttled();
  throttled();

  t.is(callCount, 1);
});
