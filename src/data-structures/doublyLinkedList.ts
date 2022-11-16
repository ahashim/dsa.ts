import test from "ava";

/*
 * @dev Implements a node within a doubly linked list.
 */
class Node<T> {
  constructor(public value: T, public next?: Node<T>, public prev?: Node<T>) {}
}

test.only("nodes", (t) => {
  const { head, tail } = nodesFromSentence("hello world!");

  t.is(head.next?.value, "world!");
  t.is(tail.prev?.value, "hello");
});

/*
 * @dev Helper function to generate a linked list of nodes from a sentence.
 */
const nodesFromSentence = (
  sentence: string
): { head: Node<string>; tail: Node<string> } => {
  // create nodes from words
  const nodes = sentence.split(" ").map((word) => new Node(word));

  // link them to each other
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].next = nodes[i + 1];
    nodes[i].prev = nodes[i - 1];
  }

  return {
    head: nodes[0],
    tail: nodes[nodes.length - 1],
  };
};

/*
 * @dev Out of bounds error for insertion & deletion.
 */
// const outOfBoundsError = new Error("LinkedList: index out of bounds");
