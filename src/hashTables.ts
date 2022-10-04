import test from 'ava';

/*
 * @dev Intersection of two numeric arrays.
 * @time O(n)
 * @space O(n)
 */
const arrayIntersection = (arr1: number[], arr2: number[]): number[] => {
  // types
  type HashTable = {
    [key: number]: boolean;
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
});

/*
 * @dev Find the first duplicate character.
 * @time O(n)
 * @space O(n)
 */
const findDuplicate = (arr: string[]): string => {
  // types
  type HashTable = {
    [key: string]: boolean;
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
});

/*
 * @dev Find the first duplicate character.
 * @time O(n)
 * @space O(n)
 */
const findMissingAlphabeticCharacter = (str: string): string => {
  // types
  type HashTable = {
    'a': boolean;
    'b': boolean;
    'c': boolean;
    'd': boolean;
    'e': boolean;
    'f': boolean;
    'g': boolean;
    'h': boolean;
    'i': boolean;
    'j': boolean;
    'k': boolean;
    'l': boolean;
    'm': boolean;
    'n': boolean;
    'o': boolean;
    'p': boolean;
    'q': boolean;
    'r': boolean;
    's': boolean;
    't': boolean;
    'u': boolean;
    'v': boolean;
    'w': boolean;
    'x': boolean;
    'y': boolean;
    'z': boolean;
  }

  // vars
  const result: string[] = [];
  const seenLetters: HashTable = {
    'a': false,
    'b': false,
    'c': false,
    'd': false,
    'e': false,
    'f': false,
    'g': false,
    'h': false,
    'i': false,
    'j': false,
    'k': false,
    'l': false,
    'm': false,
    'n': false,
    'o': false,
    'p': false,
    'q': false,
    'r': false,
    's': false,
    't': false,
    'u': false,
    'v': false,
    'w': false,
    'x': false,
    'y': false,
    'z': false,
  }

  // remove whitespace
  const stripped = str.replace(/\s/g, '');

  // mark seen characters
  for (let i = 0; i < stripped.length; i++) {
    seenLetters[stripped[i].toLowerCase() as keyof HashTable] = true;
  }

  // determine unseen characters
  let char: keyof HashTable;
  for (char in seenLetters) {
    if (!seenLetters[char]) result.push(char);
  }

  return result.join('');
}

test('findMissingAlphabeticCharacter', t => {
  const actual = findMissingAlphabeticCharacter('the quick brown box jumps over the lazy hog');
  const expected = 'df';

  t.is(actual, expected);
});
