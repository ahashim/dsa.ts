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

  public sort = (): number[] => {
    const startIndex = 0;
    const endIndex = this.items.length - 1;

    return this.quickSort(this.items, startIndex, endIndex);
  };

  private partition = (items: number[], low: number, high: number): number => {
    // highest index is used as the pivot point
    const pivot = items[high];

    // index of the currently smaller item compared to the pivot value (starts
    // outside of the first pass)
    let i = low - 1;

    // iterate from `low` up to (but not including) `high`
    for (let j = low; j <= high - 1; j++) {
      // if the current item is smaller than the pivot
      if (items[j] < pivot) {
        // increment the index of the smaller item
        i++;

        // swap it with the current item `j`
        this.swap(items, i, j);
      }
    }

    // swap the pivot with what's in front of its current smaller item
    this.swap(items, i + 1, high);

    // return the new pivot index to partition around
    return i + 1;
  };

  private swap = (items: number[], i: number, j: number): void => {
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  };

  private quickSort = (
    items: number[],
    low: number,
    high: number
  ): number[] => {
    // base case: when low = high, there's only 1 item to return (and nothing
    // left to partition)
    if (low < high) {
      const partitionIndex = this.partition(items, low, high);

      // sort elements before and after the partition
      this.quickSort(items, low, partitionIndex - 1);
      this.quickSort(items, partitionIndex, high);
    }

    return items;
  };
}

test("quickSort", (t) => {
  const actual = new QuickSortable([11, 2, 5, 7, 3]).sort();
  const expected = [2, 3, 5, 7, 11];

  t.deepEqual(actual, expected);
});

/*
 * @dev Finds the greatest product of 3 numbers from an array using quicksort.
 * @time O(n*log(n))
 * @space O(n)
 */
const greatestProductOf3 = (arr: number[]): number => {
  const sorted = new QuickSortable(arr).sort();

  return (
    sorted[sorted.length - 1] *
    sorted[sorted.length - 2] *
    sorted[sorted.length - 3]
  );
};

test("greatestProductOf3", (t) => {
  const actual = greatestProductOf3([11, 2, 5, 7, 3]);
  const expected = 385;

  t.is(actual, expected);
});

/*
 * @dev Finds the missing number in a linearly filled array using quicksort.
 * @time O(n*log(n))
 * @space O(n)
 */
const findMissingNumber = (arr: number[]): number | null => {
  const sorted = new QuickSortable(arr).sort();

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] !== i) return i;
  }

  return null;
};

test("findMissingNumber", (t) => {
  const actual = findMissingNumber([5, 2, 4, 1, 0]);
  const expected = 3;

  t.is(actual, expected);
});
