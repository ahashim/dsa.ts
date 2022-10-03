import test from 'ava';

/*
 * @dev Intersection of two arrays.
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

  // store all values from one array into the hashtable
  for (let i = 0; i < arr1.length; i++) {
    hashTable[arr1[i]] = true;
  }

  // compare hashtable values with the other array values
  for (let i = 0; i < arr2.length; i++) {
    if (hashTable[arr2[i]]) result.push(arr2[i]);
  }

  return result;
};

test('arrayIntersection', t => {
  const actual = arrayIntersection([1,2,3,4,5], [0,2,4,6]);
  const expected = [2,4];

  t.deepEqual(actual, expected);
})
