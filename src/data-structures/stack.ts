import test from "ava";

class Stack<T> {
  private items: Array<T>;

  constructor() {
    this.items = [];
  }

  peek = (): T => this.items[this.items.length - 1];

  pop = (): T | undefined => this.items.pop();

  push = (el: T): number => this.items.push(el);
}

/*
 * @dev Reverses a string using a stack
 */
const reverse = (str: string): string => {
  const stack: Stack<string> = new Stack();
  let result = "";

  // add characters to stack
  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
  }

  // remove them from stack in reverse order onto the result
  while (stack.peek()) {
    result += stack.pop();
  }

  return result;
};

test("reverse", (t) => {
  const actual = reverse("hello world!");
  const expected = "!dlrow olleh";

  t.is(actual, expected);
});
