import test from "ava";

/*
 * @dev Intersection of two numeric arrays.
 */
const getIntersection = (arr1: number[], arr2: number[]): number[] => {
  // types
  type HashTable = {
    [key: number]: boolean;
  };

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

test("getIntersection", (t) => {
  const actual = getIntersection([1, 2, 3, 4, 5], [0, 2, 4, 6]);
  const expected = [2, 4];

  t.deepEqual(actual, expected);
});

/*
 * @dev Find the first duplicate character.
 */
const findDuplicate = (arr: string[]): string => {
  // types
  type HashTable = {
    [key: string]: boolean;
  };

  // vars
  const hashTable: HashTable = {};

  for (let i = 0; i < arr.length; i++) {
    if (hashTable[arr[i]]) return arr[i];

    hashTable[arr[i]] = true;
  }

  return "";
};

test("findDuplicate", (t) => {
  const actual = findDuplicate(["a", "b", "c", "d", "c", "e"]);
  const expected = "c";

  t.is(actual, expected);
});

/*
 * @dev Find missing alphabetic letters from a string.
 */
const findMissingLetters = (str: string): string => {
  // types
  type HashTable = {
    a?: boolean;
    b?: boolean;
    c?: boolean;
    d?: boolean;
    e?: boolean;
    f?: boolean;
    g?: boolean;
    h?: boolean;
    i?: boolean;
    j?: boolean;
    k?: boolean;
    l?: boolean;
    m?: boolean;
    n?: boolean;
    o?: boolean;
    p?: boolean;
    q?: boolean;
    r?: boolean;
    s?: boolean;
    t?: boolean;
    u?: boolean;
    v?: boolean;
    w?: boolean;
    x?: boolean;
    y?: boolean;
    z?: boolean;
  };

  // vars
  const result: string[] = [];
  const seenLetters: HashTable = {};

  // mark seen characters
  for (let i = 0; i < str.length; i++) {
    if (!str[i].match(/\s/)) {
      // skip whitespace
      seenLetters[str[i].toLowerCase() as keyof HashTable] = true;
    }
  }

  // determine unseen characters
  let char: keyof HashTable;
  for (char in seenLetters) {
    if (Object.hasOwn(seenLetters, char) && !seenLetters[char]) {
      result.push(char);
    }
  }

  return result.join("");
};

test("findMissingLetters", (t) => {
  const actual = findMissingLetters(
    "the quick brown box jumps over the lazy hog"
  );
  const expected = "df";

  t.is(actual, expected);
});

/*
 * @dev Find the first non-duplicate character.
 */
const firstNonDuplicate = (str: string): string => {
  // types
  type HashTable = {
    [key: string]: number;
  };

  // vars
  const counts: HashTable = {};

  // count letters in string
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    counts[char] = counts[char] ? counts[char] + 1 : 1;
  }

  // check for the first non-duplicate
  for (let i = 0; i < str.length; i++) {
    if (counts[str[i]] === 1) return str[i];
  }

  return "";
};

test("firstNonDuplicate", (t) => {
  const actual = firstNonDuplicate("minimum");
  const expected = "n";

  t.is(actual, expected);
});
