import test from "ava";

/*
 * @dev Implements a string trie for autocomplete.
 */
class Trie {
  public children: {
    [key: string]: Trie;
  } = {};

  private isWord = false;

  public autoComplete = (prefix: string): string[] => {
    // get the trie node returned by the prefix
    const currentNode = this.search(prefix);

    if (currentNode) {
      // get words stemming from the prefix node
      return this.gatherWordsAt(currentNode).map((suffix) => prefix + suffix);
    } else {
      // prefix is not in the trie
      return [];
    }
  };

  public autoCorrect = (word: string): string | undefined => {
    // track how much of the word has been found so far
    let currentWord = "",
      currentNode: Trie = this;

    for (let i = 0; i < word.length; i++) {
      if (currentNode.children[word[i]]) {
        // update the current word
        currentWord += word[i];

        // follow the child node
        currentNode = currentNode.children[word[i]];
      } else {
        // the current character in the word is not found, so fallback to the
        // current word so far & gather possible words from that node &  return
        // the first suggestion
        return this.gatherWordsAt(currentNode).map(
          (suffix) => currentWord + suffix
        )[0];
      }
    }
  };

  public contains = (word: string): boolean => !!this.search(word);

  public insert = (word: string): void => {
    let currentNode: Trie = this;

    // iterate over characters in the word
    for (let i = 0; i < word.length; i++) {
      // child with the current character
      const childNode = currentNode.children[word[i]];

      if (childNode) {
        // follow it
        currentNode = childNode;
      } else {
        const newNode = new Trie();

        // add the current character as a new child & follow it
        currentNode.children[word[i]] = newNode;
        currentNode = newNode;
      }
    }

    // after inserting the full word, mark it as such
    currentNode.isWord = true;
  };

  public traverse = (
    currentNode: Trie = this,
    characters: string[] = []
  ): string[] => {
    for (const [character, childNode] of Object.entries(currentNode.children)) {
      // capture current character
      characters.push(character);

      if (!childNode.isWord) this.traverse(childNode, characters);
    }

    return characters;
  };

  private gatherWordsAt = (
    currentNode: Trie = this,
    currentWord = "",
    words: string[] = []
  ): string[] => {
    // iterate over the children of the current node starting at the root
    for (const [character, childNode] of Object.entries(currentNode.children)) {
      if (childNode.isWord) {
        // base case: word is complete at the current character & can be added
        // to the full words list
        words.push(currentWord + character);
      } else {
        // recurse over children until word is completed while passing in the
        // currentWord + words list
        this.gatherWordsAt(childNode, currentWord + character, words);
      }
    }

    return words;
  };

  private search = (word: string): Trie | undefined => {
    let currentNode: Trie = this;

    // iterate over characters in the word
    for (let i = 0; i < word.length; i++) {
      // child with the current character
      const childNode = currentNode.children[word[i]];

      if (childNode) {
        // follow it
        currentNode = childNode;
      } else {
        // word is not in the trie, exit early
        return undefined;
      }
    }

    return currentNode;
  };
}

test("autoComplete", (t) => {
  const trie = new Trie();

  trie.insert("balance");
  trie.insert("bald");
  trie.insert("ball");

  t.deepEqual(trie.autoComplete("bal"), ["balance", "bald", "ball"]);
});

test("autoCorrect", (t) => {
  const trie = new Trie();

  trie.insert("cat");
  trie.insert("catnap");
  trie.insert("catnip");

  t.is(trie.autoCorrect("catnar"), "catnap");
});

test("insert", (t) => {
  const trie = new Trie();

  trie.insert("carnival");
  trie.insert("catcher");

  t.is(trie.contains("car"), true);
  t.is(trie.contains("carnival"), true);
  t.is(trie.contains("cat"), true);
  t.is(trie.contains("catcher"), true);
  t.is(trie.contains("can"), false);
});

test("traverse", (t) => {
  const trie = new Trie();

  trie.insert("luke");
  trie.insert("leia");
  trie.insert("leon");

  t.deepEqual(trie.traverse(), ["l", "u", "k", "e", "e", "i", "a", "o", "n"]);
});
