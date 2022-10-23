import test from "ava";

/*
 * @dev Implements a Node within a linked list.
 * @time O(1)
 * @space O(n)
 */
class Node<T> {
  public data: T;
  public next: Node<T> | null;

  constructor(value: T, nextNode: Node<T> | null = null) {
    this.data = value;
    this.next = nextNode;
  }
}

test.only("node", (t) => {
  const [n1] = nodesFromSentence("hello world!");
  const actual = n1.next?.data;
  const expected = "world!";

  t.is(actual, expected);
});

/*
 * @dev Implements a singly Linked List.
 * @time O(1)
 * @space O(n)
 */
class LinkedList<T> {
  public head: Node<T>;

  constructor(start: Node<T>) {
    this.head = start;
  }
}

test("head", (t) => {
  const list = new LinkedList(nodesFromSentence("hello world!")[0]);
  const actual = list.head.data;
  const expected = "hello";

  t.is(actual, expected);
});

/*
 * @dev Helper function to generate a linked list of nodes from a sentence.
 * @time O(n)
 * @space O(n)
 */
const nodesFromSentence = (sentence: string): Node<string>[] => {
  // create nodes from words
  const nodes = sentence.split(" ").map((word) => new Node(word));

  // link them to each other
  for (let i = 0; i < nodes.length; i++) nodes[i].next = nodes[i + 1];

  return nodes;
};
