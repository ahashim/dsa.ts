import test from "ava";

/*
 * @dev Implements a binary max heap using an array.
 */
class Heap<T> {
  private data: Array<T> = [];

  constructor(initialValue?: T) {
    if (initialValue) this.data.push(initialValue);
  }

  public delete = (): void => {
    // remove last node from the heap that will trickle down from the root
    const trickleNode = this.data.pop();

    if (trickleNode) {
      // track its index (starts at zero in order to delete the root node)
      let trickleNodeIndex = 0;

      // place trickleNode at the root to perform the deletion
      this.data[trickleNodeIndex] = trickleNode;

      // "trickle down" algorithm: loop as long as the trickle node has a child
      // greater than it
      while (this.hasGreaterChild(trickleNodeIndex)) {
        // save the index of its larger child
        const largerChildIndex = this.indexOfLargerChild(trickleNodeIndex);

        // swap the trickle node with its larger child
        this.swap(this.data, trickleNodeIndex, largerChildIndex);

        // update the trickle nodes new index
        trickleNodeIndex = largerChildIndex;
      }
    }
  };

  public insert = (value: T): void => {
    // add it to the end of the data array
    this.data.push(value);

    // track the index of the new node
    let newNodeIndex = this.data.length - 1;

    // "trickle up" algorithm: if new node is not in the root position, and it's
    // greater than its parent node
    while (
      newNodeIndex > 0 &&
      this.data[newNodeIndex] > this.data[this.parentIndex(newNodeIndex)]
    ) {
      // swap the new node & parent node
      this.swap(this.data, newNodeIndex, this.parentIndex(newNodeIndex));

      // update the index of the new node
      newNodeIndex = this.parentIndex(newNodeIndex);
    }
  };

  public lastNode = (): T => this.data[this.data.length - 1];

  public rootNode = (): T => this.data[0];

  private indexOfLargerChild = (index: number): number => {
    // if there is no right child
    if (!this.data[this.rightChildIndex(index)]) {
      // return the left child index
      return this.leftChildIndex(index);
    }

    // if the right child value is larger than the left child
    if (
      this.data[this.rightChildIndex(index)] >
      this.data[this.leftChildIndex(index)]
    ) {
      // return the right child index
      return this.rightChildIndex(index);
    } else {
      // return the left child index
      return this.leftChildIndex(index);
    }
  };

  private hasGreaterChild = (index: number): boolean => {
    const hasGreaterLeftChild =
      this.data[this.leftChildIndex(index)] &&
      this.data[this.leftChildIndex(index)] > this.data[index];
    const hasGreaterRightChild =
      this.data[this.rightChildIndex(index)] &&
      this.data[this.rightChildIndex(index)] > this.data[index];

    return hasGreaterLeftChild || hasGreaterRightChild;
  };

  private leftChildIndex = (index: number): number => index * 2 + 1;

  private parentIndex = (index: number): number => Math.floor((index - 1) / 2);

  private rightChildIndex = (index: number): number => index * 2 + 2;

  private swap = (arr: Array<T>, indexA: number, indexB: number): void => {
    // swap via array destructuring
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
  };
}

test("insert", (t) => {
  const heap = new Heap();

  heap.insert(0);
  heap.insert(420);
  heap.insert(1337);

  t.is(heap.rootNode(), 1337);
  t.is(heap.lastNode(), 420);
});

test("delete", (t) => {
  const heap = new Heap();

  heap.insert(0);
  heap.insert(420);
  heap.insert(1337);
  heap.delete();

  t.is(heap.rootNode(), 420);
  t.is(heap.lastNode(), 0);
});
