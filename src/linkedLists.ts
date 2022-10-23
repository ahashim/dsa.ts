import test from "ava";

/*
 * @dev Implements a Node within a linked list.
 * @time O(1)
 * @space O(n)
 */
class Node<T> {
  public data: T;
  public next: Node<T> | undefined;

  constructor(value: T, nextNode: Node<T> | undefined = undefined) {
    this.data = value;
    this.next = nextNode;
  }
}

test("data", (t) => {
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

  deleteAt = (index: number) => {
    // head of the list
    if (index === 0 && this.head.next) this.head = this.head.next;

    let currentIndex = 0;
    let currentNode = this.head;

    // move to node right before deletion
    while (currentIndex < index - 1 && currentNode.next) {
      currentNode = currentNode.next;
      currentIndex++;
    }

    // connect the nodes around the index to delete
    currentNode.next = currentNode.next?.next;
  };

  indexOf = (value: T): number | undefined => {
    let currentIndex = 0;
    let currentNode: Node<T> | undefined = this.head;

    while (currentNode) {
      if (currentNode?.data === value) return currentIndex;

      currentNode = currentNode?.next;
      currentIndex++;
    }

    return;
  };

  insertAt = (index: number, value: T): void => {
    const newNode = new Node(value);

    if (index === 0) {
      // beginnning of the list
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let currentIndex = 0;
      let currentNode = this.head;

      // get the node right before where we want to insert
      while (currentIndex < index - 1 && currentNode.next) {
        currentNode = currentNode.next;
        currentIndex++;
      }

      // link the new node the one after the current node (now at the new index)
      newNode.next = currentNode?.next;

      // link the previous node to the new node to complete the list
      currentNode.next = newNode;
    }
  };

  read = (index: number): T | undefined => {
    let currentIndex = 0;
    let currentNode: Node<T> | undefined = this.head;

    while (currentIndex < index) {
      currentNode = currentNode.next;
      currentIndex++;

      if (!currentNode) return;
    }

    return currentNode.data;
  };
}

test("deleteAt", (t) => {
  const list = new LinkedList(nodesFromSentence("do or do not")[0]);
  const index = 2;
  list.deleteAt(index);

  const actual = list.read(index);
  const expected = "not";

  t.is(actual, expected);
});

test("head", (t) => {
  const list = new LinkedList(nodesFromSentence("hello world!")[0]);

  const actual = list.head.data;
  const expected = "hello";

  t.is(actual, expected);
});

test("indexOf", (t) => {
  const list = new LinkedList(nodesFromSentence("i have altered the deal")[0]);

  const actual = list.indexOf("deal");
  const expected = 4;

  t.is(actual, expected);
});

test("insertAt", (t) => {
  const list = new LinkedList(nodesFromSentence("i sand")[0]);
  const index = 1;
  list.insertAt(index, "hate");

  const actual = list.read(index + 1);
  const expected = "sand";

  t.is(actual, expected);
});

test("read", (t) => {
  const list = new LinkedList(nodesFromSentence("i am the senate!")[0]);

  const actual = list.read(3);
  const expected = "senate!";

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
