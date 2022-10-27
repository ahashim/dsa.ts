import test from "ava";

/*
 * @dev Implements a binary max heap using an array.
 * @time O(log(n))
 * @space O(n)
 */
class Heap<T> {
  private data: Array<T> = [];

  constructor(initialValue?: T) {
    if (initialValue) this.data.push(initialValue);
  }

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

  const actual = heap.rootNode();
  const expected = 1337;

  t.is(actual, expected);
});
