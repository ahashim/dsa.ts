import test from 'ava';

/*
 * @dev Intersection of two numeric arrays.
 * @time O(n)
 * @space O(n)
 */
const arrayIntersection = (arr1: number[], arr2: number[]): number[] => {
  // types
  type HashTable = {
    [key: number]: boolean
  }

  // vars
  const result: number[] = [];
  const hashTable: HashTable = {};
  let smaller: number[];
  let larger: number[];

  // determine size
  if (arr1.length > arr2.length) {
    smaller = arr2;
    larger = arr1;
  } else {
    smaller = arr1;
    larger = arr2;
  }

  // store all values from the smaller array into the hashtable
  for (let i = 0; i < smaller.length; i++) {
    hashTable[smaller[i]] = true;
  }

  // compare hashtable values with the values of the larger array
  for (let i = 0; i < larger.length; i++) {
    if (hashTable[larger[i]]) result.push(larger[i]);
  }

  return result;
};

test('arrayIntersection', t => {
  const actual = arrayIntersection([1,2,3,4,5], [0,2,4,6]);
  const expected = [2,4];

  t.deepEqual(actual, expected);
})

/*
 * @dev Find the first duplicate character.
 * @time O(n)
 * @space O(n)
 */
const findDuplicate = (arr: string[]): string => {
  // types
  type HashTable = {
    [key: string]: boolean
  }

  // vars
  const hashTable: HashTable = {};

  for (let i = 0; i < arr.length; i++) {
    if (hashTable[arr[i]]) return arr[i];

    hashTable[arr[i]] = true;
  }

  return '';
}

test('findDuplicate', t => {
  const actual = findDuplicate(['a', 'b', 'c', 'd', 'c', 'e']);
  const expected = 'c';

  t.is(actual, expected);
})
