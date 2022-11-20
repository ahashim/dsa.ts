import test from "ava";

/*
 * @dev Implements a "Least Recently Used" cache.
 */
class LRUCache<K, V> {
  private cache: Map<K, V> = new Map();

  constructor(private capacity: number = 10) {
    this.cache = new Map();
  }

  public get = (key: K): V | undefined => {
    if (!this.cache.has(key)) return;

    const value = this.cache.get(key);

    if (value) {
      // remove & add the entry to move it to the front (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }

    return value;
  };

  public put = (key: K, value: V): void => {
    // remove the new entry if it exists to update its insertion order
    this.cache.delete(key);

    if (this.cache.size === this.capacity) {
      // Map.keys() creates an iterable of keys in order of insertion, and
      // calling Iterable.next() returns the key of the first entry inserted
      // (aka least recently used)
      const lruKey = this.cache.keys().next().value;

      // evict the least recently used entry
      this.cache.delete(lruKey);
    }

    // add new entry to the top of the cache (most recently used)
    this.cache.set(key, value);
  };

  public size = (): number => this.cache.size;
}

test("get", (t) => {
  const nicknames = new LRUCache();
  nicknames.put("artoo", "R2-D2");

  t.is(nicknames.get("artoo"), "R2-D2");
  t.is(nicknames.get("threepio"), undefined);
});

test("put", (t) => {
  const nicknames = new LRUCache();
  nicknames.put("C-3PO", "threepio");

  t.is(nicknames.get("C-3PO"), "threepio");
});

test("size", (t) => {
  const nicknames = new LRUCache();
  nicknames.put("ben", "Obi Wan Kenobi");

  t.is(nicknames.size(), 1);
});

test("eviction", (t) => {
  const capacity = 2;
  const nicknames = new LRUCache(capacity);

  // add 2 nicknames
  nicknames.put("threepio", "C-3PO");
  nicknames.put("artoo", "R2-D2");

  t.is(nicknames.size(), capacity);
  t.is(nicknames.get("annie"), undefined);

  // alter the deal by adding another name (thereby evicting the first one
  // added), and pray it doesn't get altered any further
  nicknames.put("annie", "Darth Vader");

  t.is(nicknames.size(), 2);
  t.is(nicknames.get("annie"), "Darth Vader");
  t.is(nicknames.get("artoo"), "R2-D2");
  t.is(nicknames.get("threepio"), undefined);
});
