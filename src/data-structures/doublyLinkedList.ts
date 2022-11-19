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

      // follow linked nodes until the end
      while (node.next) {
        node = node.next;
        this.size++;
      }

      this.tail = node;
    }
  }

  public delete = (index: number): void => this._delete(index);

  public deleteHead = (): void => this._delete(0);

  public deleteTail = (): void => this._delete(this.size - 1);

  public indexOf = (value: T): number | undefined => {
    if (this.head) {
      let currentIndex = 0;
      let currentNode: Node<T> | undefined = this.head;

      while (currentNode) {
        if (currentNode.value === value) return currentIndex;

        currentNode = currentNode.next;
        currentIndex++;
      }
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

  public read = (index: number): T | undefined | RangeError => {
    if (index > this.size) throw outOfBoundsError;

    if (this.head) {
      let currentIndex = 0;
      let currentNode: Node<T> | undefined = this.head;

      while (currentIndex < index) {
        currentNode = currentNode.next;
        currentIndex++;

        if (!currentNode) return;
      }

      return currentNode.value;
    }
  };

  public reverse = (): void => {
    if (this.head) {
      let currentNode: Node<T> | undefined = this.head,
        temp: Node<T> | undefined;

      while (currentNode) {
        // assign first node to tail
        if (!currentNode.prev) this.tail = currentNode;

        // swap pointers with a temporary variable
        temp = currentNode.prev;
        currentNode.prev = currentNode.next;
        currentNode.next = temp;

        // move forward
        currentNode = currentNode.prev;
      }

      // last node is now head
      if (temp) this.head = temp.prev;
    }
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

  private _delete = (index: number): void => {
    if (this.size > 0 && this.head && this.tail) {
      if (index > this.size - 1) throw outOfBoundsError;

      if (index === 0) {
        // delete head
        this.head = this.head.next;
        if (this.head?.prev) this.head.prev = undefined;

        // remove tail if list is empty
        if (!this.head?.next) this.tail = undefined;
      } else if (index === this.size - 1) {
        // delete tail
        this.tail = this.tail?.prev;
        if (this.tail?.next) this.tail.next = undefined;

        // remove head if list is empty
        if (!this.tail?.prev) this.head = undefined;
      } else {
        let currentIndex = 0;
        let currentNode: Node<T> | undefined = this.head;
        const desiredIndex = index - 1;

        // traverse to one node right before the node to delete
        while (currentIndex !== desiredIndex && currentNode) {
          currentNode = currentNode.next;
          currentIndex++;
        }

        // ensure we are at the right node
        if (currentNode && currentIndex === desiredIndex) {
          // connect the nodes around the index to delete
          currentNode.next = currentNode.next?.next;
          currentNode = currentNode.next;
          if (currentNode) currentNode.prev = currentNode?.prev?.prev;
        }
      }

      // update size
      this.size--;
    }
  };
}

test("head", (t) => {
  const list = new DoublyLinkedList(nodesFromSentence("hello there!"));

  t.is(list.head?.value, "hello");
});

test("delete", (t) => {
  const list = new DoublyLinkedList(nodesFromSentence("let the wookie win"));
  list.delete(2);

  t.is(list.read(2), "win");
  t.is(list.size, 3);

  const error = t.throws(() => list.delete(Infinity), {
    instanceOf: RangeError,
  });

  t.is(error?.message, "DoublyLinkedList: index out of bounds");
});

test("deleteFromHead", (t) => {
  const list = new DoublyLinkedList(nodesFromSentence("this is the wei"));
  list.deleteHead();

  t.is(list.head?.value, "is");
  t.is(list.head?.prev, undefined);
  t.is(list.size, 3);

  const singleItemList = new DoublyLinkedList(new Node(1337));
  singleItemList.deleteTail();

  t.is(singleItemList.head, undefined);
  t.is(singleItemList.tail, undefined);
  t.is(singleItemList.size, 0);
});

test("deleteFromTail", (t) => {
  const list = new DoublyLinkedList(nodesFromSentence("that's no moon"));
  list.deleteTail();

  t.is(list.tail?.value, "no");
  t.is(list.tail?.next, undefined);
  t.is(list.size, 2);

  const singleItemList = new DoublyLinkedList(new Node(1337));
  singleItemList.deleteHead();

  t.is(singleItemList.head, undefined);
  t.is(singleItemList.tail, undefined);
  t.is(singleItemList.size, 0);
});

test("indexOf", (t) => {
  const list = new DoublyLinkedList(nodesFromSentence("no, i am your father"));

  t.is(list.indexOf("father"), 4);
  t.is(list.indexOf("mother"), undefined);
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

test("read", (t) => {
  const list = new DoublyLinkedList(nodesFromSentence("i will make it legal"));

  t.is(list.read(4), "legal");
  t.is(list.size, 5);

  list.deleteTail();
  list.insertAtTail("funny");

  t.is(list.read(4), "funny");
  t.is(list.size, 5);

  const error = t.throws(() => list.read(Infinity), { instanceOf: RangeError });

  t.is(error?.message, "DoublyLinkedList: index out of bounds");
});

test("reverse", (t) => {
  const list = new DoublyLinkedList(
    nodesFromSentence("fear is the path to the dark side")
  );
  list.reverse();

  t.is(list.traverse().join(" "), "side dark the to path the is fear");
  t.is(list.head?.value, "side");
  t.is(list.tail?.value, "fear");
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
 * @dev Out of bounds error for read, insertion, and deletion.
 */
const outOfBoundsError = new RangeError(
  `${new DoublyLinkedList().constructor.name}: index out of bounds`
);
