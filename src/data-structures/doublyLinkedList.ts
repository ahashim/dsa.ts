import test from "ava";

/*
 * @dev Implements a node within a doubly linked list.
 */
class Node<T> {
  constructor(public value: T, public next?: Node<T>, public prev?: Node<T>) {}
}

test("nodes", (t) => {
  const head = nodesFromSentence("hello world!");

  t.is(head.value, "hello");
  t.is(head.next?.value, "world!");
  t.is(head.prev?.value, undefined);
  t.is(head.next?.next?.value, undefined); // tail next
});

/*
 * @dev Implements a doubly linked list.
 */
class DoublyLinkedList<T> {
  public head?: Node<T>;
  public tail?: Node<T>;
  public size: number;

  constructor(initialNode?: Node<T>) {
    this.size = 0;

    if (initialNode) {
      this.head = initialNode;
      this.size = 1;

      // if there are connected nodes
      if (initialNode.next) {
        let node: Node<T> | undefined = initialNode;
        // follow the links until the end
        while (node.next) {
          node = node.next;
          this.size++;
        }

        this.tail = node;
      } else {
        // head and tail are the same
        this.tail = initialNode;
      }
    }
  }

  public deleteFromHead = (): void => {
    if (this.head) {
      this.head = this.head.next;
      if (this.head?.prev) this.head.prev = undefined;
    }
  };

  public insertAtHead = (value: T): void => {
    const node = new Node(value);

    if (!this.head || this.size == 0) {
      this.head = node;
      this.tail = node;
    } else {
      // prepend to & update head
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }

    this.size++;
  };

  public insertAtTail = (value: T): void => {
    const node = new Node(value);

    if (!this.tail || this.size == 0) {
      this.head = node;
      this.tail = node;
    } else {
      // append to & update tail
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.size++;
  };
}

test("head", (t) => {
  const list = new DoublyLinkedList(nodesFromSentence("hello there!"));

  t.is(list.head?.value, "hello");
});

test("deleteFromHead", (t) => {
  const list = new DoublyLinkedList(nodesFromSentence("this is the wei"));
  list.deleteFromHead();

  t.is(list.head?.value, "is");
  t.is(list.head?.prev?.value, undefined);
});

test("insertAtHead", (t) => {
  const list = new DoublyLinkedList(
    nodesFromSentence("or do not, there is no try")
  );
  list.insertAtHead("do");

  t.is(list.head?.value, "do");
  t.is(list.head?.next?.value, "or");
});

test("insertAtTail", (t) => {
  const list = new DoublyLinkedList(
    nodesFromSentence("I find your lack of faith...")
  );
  list.insertAtTail("...mildly amusing");

  t.is(list.tail?.value, "...mildly amusing");
  t.is(list.tail?.prev?.value, "faith...");
});

test("size", (t) => {
  const list = new DoublyLinkedList(
    nodesFromSentence("aren't you a little short for a stormtrooper?")
  );

  t.is(list.size, 8);
});

test("tail", (t) => {
  const list = new DoublyLinkedList(nodesFromSentence("another happy landing"));

  t.is(list.tail?.value, "landing");
});

/*
 * @dev Helper function to generate a linked list of nodes from a sentence.
 */
const nodesFromSentence = (sentence: string): Node<string> => {
  // create nodes from words
  const nodes = sentence.split(/\s+/).map((word) => new Node(word));

  // link them to each other
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].next = nodes[i + 1];
    nodes[i].prev = nodes[i - 1];
  }

  return nodes[0];
};

/*
 * @dev Out of bounds error for insertion & deletion.
 */
// const outOfBoundsError = new Error("DoublyLinkedList: index out of bounds");
