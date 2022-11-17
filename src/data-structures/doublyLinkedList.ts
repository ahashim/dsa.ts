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
      let node: Node<T> | undefined = initialNode;
      this.head = node;
      this.size = 1;

      if (node.next) {
        // follow linked nodes until the end
        while (node.next) {
          node = node.next;
          this.size++;
        }
      }

      this.tail = node;
    }
  }

  public deleteFromHead = (): void => {
    if (this.head) {
      // move 2nd item into head
      this.head = this.head.next;

      // detach head
      if (this.head?.prev) this.head.prev = undefined;

      // remove tail if list is empty
      if (!this.head?.next) this.tail = undefined;

      // update size
      this.size--;
    }
  };

  public deleteFromTail = (): void => {
    if (this.tail) {
      // move 2nd to last item to the tail
      this.tail = this.tail.prev;

      // detach tail
      if (this.tail?.next) this.tail.next = undefined;

      // remove head if list is empty
      if (!this.tail?.prev) this.head = undefined;

      // update size
      this.size--;
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
  t.is(list.head?.prev, undefined);
  t.is(list.size, 3);

  const singleItemList = new DoublyLinkedList(new Node(1337));
  singleItemList.deleteFromTail();

  t.is(singleItemList.head, undefined);
  t.is(singleItemList.tail, undefined);
  t.is(singleItemList.size, 0);
});

test("deleteFromTail", (t) => {
  const list = new DoublyLinkedList(nodesFromSentence("that's no moon"));
  list.deleteFromTail();

  t.is(list.tail?.value, "no");
  t.is(list.tail?.next, undefined);
  t.is(list.size, 2);

  const singleItemList = new DoublyLinkedList(new Node(1337));
  singleItemList.deleteFromHead();

  t.is(singleItemList.head, undefined);
  t.is(singleItemList.tail, undefined);
  t.is(singleItemList.size, 0);
});

test("insertAtHead", (t) => {
  const list = new DoublyLinkedList(
    nodesFromSentence("or do not, there is no try")
  );
  list.insertAtHead("do");

  t.is(list.head?.value, "do");
  t.is(list.head?.next?.value, "or");
  t.is(list.size, 8);

  const singleItemList = new DoublyLinkedList();
  singleItemList.insertAtHead(1337);

  t.is(singleItemList.head?.value, 1337);
  t.is(singleItemList.tail?.value, 1337);
  t.is(singleItemList.size, 1);
});

test("insertAtTail", (t) => {
  const list = new DoublyLinkedList(
    nodesFromSentence("I find your lack of faith...")
  );
  list.insertAtTail("...mildly amusing");

  t.is(list.tail?.value, "...mildly amusing");
  t.is(list.tail?.prev?.value, "faith...");
  t.is(list.size, 7);

  const singleItemList = new DoublyLinkedList();
  singleItemList.insertAtTail(1337);

  t.is(singleItemList.head?.value, 1337);
  t.is(singleItemList.tail?.value, 1337);
  t.is(singleItemList.size, 1);
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
