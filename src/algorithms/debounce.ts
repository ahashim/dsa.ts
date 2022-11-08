import test from "ava";

/*
 * @dev Implements a debouncer.
 */
export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number
) => {
  let timeout: number;

  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

test("debouncer", (t) => {
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
