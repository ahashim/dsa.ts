/* eslint-disable @typescript-eslint/no-explicit-any */
import test from "ava";

type Callback = (...args: any[]) => any;

/*
 * @dev Implements a throttle control for a function.
 */
const throttle = (fn: Callback, wait = 300): ReturnType<typeof fn> => {
  let engaged: boolean, lastRun: number, timerID: number;

  return function (this: any, args: any) {
    if (!engaged) {
      // apply local context to the function to start throttling
      fn.apply(this, args);

      // mark it as being ran
      lastRun = Date.now();

      // engage throttle
      engaged = true;
    } else {
      // clear the old timer
      clearTimeout(timerID);

      // create a new timer to engage throttle with remaining wait time
      timerID = setTimeout(() => {
        if (Date.now() - lastRun >= wait) {
          // call it if its past the wait window (throttle disengaged)
          fn.apply(this, args);

          // update the last run
          lastRun = Date.now();
        }
        // time remaining until it can be called again
      }, Math.max(wait - (Date.now() - lastRun), 0));
    }
  };
};

test.only("throttle", (t) => {
  let callCount = 0;
  const throttled = throttle(() => callCount++, 32);

  throttled();
  throttled();
  throttled();
  throttled();
  throttled();

  t.is(callCount, 1);
});
