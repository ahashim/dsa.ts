import test from "ava";

/*
 * @dev Implements a node within a linked list.
 */
class Node<T> {
  constructor(public value: T, public next?: Node<T>) {}
}

test("nodes", (t) => {
  const n1 = nodesFromSentence("hello world!");
  const actual = n1.next?.value;
  const expected = "world!";

  t.is(actual, expected);
});

/*
 * @dev Implements a singly Linked List.
 */
class LinkedList<T> {
  public head?: Node<T>;

  constructor(initialValue?: Node<T>) {
    if (initialValue) {
      this.head = initialValue;
    }
  }

  public deleteAt = (index: number) => {
    if (this.head) {
      // head of the list
      if (index === 0 && this.head.next) this.head = this.head.next;

      let currentIndex = 0;
      let currentNode = this.head;
      const desiredIndex = index - 2;

      // traverse to two nodes right before the node to delete
      while (currentIndex !== desiredIndex && currentNode.next) {
        currentNode = currentNode.next;
        currentIndex++;
      }

      // ensure we are before the node to delete
      if (currentIndex === desiredIndex) {
        // connect the nodes around the index to delete
        currentNode.next = currentNode.next?.next;
      } else {
        throw outOfBoundsError;
      }
    } else {
      throw outOfBoundsError;
    }
  };

  public indexOf = (value: T): number | undefined => {
    let currentIndex = 0;
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode?.value === value) return currentIndex;

      currentNode = currentNode?.next;
      currentIndex++;
    }
  };

  public insertAt = (index: number, value: T): void => {
    if (this.head) {
      const newNode = new Node(value);

      if (index === 0) {
        // beginnning of the list
        newNode.next = this.head;
        this.head = newNode;
      } else {
        let currentIndex = 0;
        let currentNode = this.head;
        const desiredIndex = index - 1;

        // get the node right before where we want to insert
        while (currentIndex < desiredIndex && currentNode?.next) {
          currentNode = currentNode.next;
          currentIndex++;
        }

        if (currentIndex === desiredIndex) {
          // link the new node the one after the current node (now at the new index)
          newNode.next = currentNode?.next;

          // link the previous node to the new node to complete the list
          currentNode.next = newNode;
        } else {
          throw outOfBoundsError;
        }
      }
    } else {
      throw outOfBoundsError;
    }
  };

  public readAt = (index: number): T | undefined => {
    if (this.head) {
      let currentIndex = 0;
      let currentNode: Node<T> | undefined = this.head;

      while (currentIndex < index) {
        currentNode = currentNode.next;
        currentIndex++;

        if (!currentNode) throw outOfBoundsError;
      }

      return currentNode.value;
    }
  };

  public reverse = (): void => {
    let currentNode = this.head,
      previousNode,
      nextNode;

    while (currentNode) {
      // save the next node before stepping forward in the list
      nextNode = currentNode.next;

      // reverse the pointer of the current node
      currentNode.next = previousNode;

      // step forward & repeat
      previousNode = currentNode;
      currentNode = nextNode;
    }

    if (previousNode) this.head = previousNode;
  };

  public traverse = (): T[] => {
    const items: T[] = [];

    if (this.head) {
      let currentNode: Node<T> | undefined = this.head;

      while (currentNode) {
        items.push(currentNode.value);
        currentNode = currentNode.next;
      }
    }

    return items;
  };
}

test("deleteAt", (t) => {
  const list = new LinkedList(nodesFromSentence("do or do not"));
  const index = 2;
  list.deleteAt(index);

  const actual = list.readAt(index);
  const expected = "not";

  t.is(actual, expected);
});

test("head", (t) => {
  const list = new LinkedList(nodesFromSentence("hello there!"));

  const actual = list.head;
  const expected = "hello";

  t.is(actual?.value, expected);
});

test("indexOf", (t) => {
  const list = new LinkedList(nodesFromSentence("i have altered the deal"));

  const actual = list.indexOf("deal");
  const expected = 4;

  t.is(actual, expected);
});

test("insertAt", (t) => {
  const list = new LinkedList(nodesFromSentence("i sand"));
  const index = 1;
  list.insertAt(index, "hate");

  const actual = list.readAt(index + 1);
  const expected = "sand";

  t.is(actual, expected);
});

test("readAt", (t) => {
  const list = new LinkedList(nodesFromSentence("i am the senate"));

  const actual = list.readAt(3);
  const expected = "senate";

  t.is(actual, expected);

  const error = t.throws(() => list.readAt(100), { instanceOf: RangeError });

  t.is(error?.message, "LinkedList: index out of bounds");
});

test("reverse", (t) => {
  const list = new LinkedList(
    nodesFromSentence("we will watch your career with great interest")
  );
  list.reverse();

  const actual = list.head;
  const expected = "interest";

  t.is(actual?.value, expected);
  t.is(
    list.traverse().join(" "),
    "interest great with career your watch will we"
  );
});

/*
 * @dev Helper function to generate a linked list of nodes from a sentence.
 */
const nodesFromSentence = (sentence: string): Node<string> => {
  // create nodes from words
  const nodes = sentence.split(/\s+/).map((word) => new Node(word));

  // link them to each other
  for (let i = 0; i < nodes.length; i++) nodes[i].next = nodes[i + 1];

  return nodes[0];
};

/*
 * @dev Out of bounds error for insertion & deletion.
 */
const outOfBoundsError = new RangeError(
  `${new LinkedList().constructor.name}: index out of bounds`
);
