import test from "ava";

/*
 * @dev QuickSortable class implements quickSort on an array of numbers.
 * @time O(n*log(n))
 * @space O(n)
 */
class QuickSortable {
  private items: number[];

  constructor(values: number[]) {
    this.items = values;
  }

  public sort = () => {
    return this.quickSort(this.items, 0, this.items.length - 1);
  };

  private partition = (
    items: number[],
    left: number,
    right: number
  ): number => {
    // middle item
    const pivot = items[Math.floor((right + left) / 2)];

    while (left <= right) {
      // keep moving the left pointer up if its value is below pivot
      while (items[left] < pivot) left++;

      // keep moving the right pointer down if its value is below pivot
      while (items[right] > pivot) right--;

      // swap when the pointers meet
      if (left <= right) {
        this.swap(this.items, left, right);

        // move pointers in by one
        left++;
      }
    }

    return left;
  };

  // swap two elements in an array
  private swap = (items: number[], a: number, b: number): number[] =>
    ([items[a], items[b]] = [items[b], items[a]]);

  private quickSort = (
    items: number[],
    left: number,
    right: number
  ): number[] => {
    // base case is when `items` is a single value
    if (items.length > 1) {
      // continue partitioning
      const index = this.partition(items, left, right);

      if (left < index - 1) {
        // left side index needs partitioning
        this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        // right side of the index needs partitioning
        this.quickSort(items, index, right);
      }
    }

    return items;
  };
}

test("quickSort", (t) => {
  const primes = new QuickSortable([11, 2, 5, 7, 3]);
  const actual = primes.sort();
  const expected = [2, 3, 5, 7, 11];

  t.deepEqual(actual, expected);
});
