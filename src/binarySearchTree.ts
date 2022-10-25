import test from "ava";

/*
 * @dev Implements a node with left & right children.
 * @time O(1)
 * @space O(n)
 */
class Node<T> {
  public left: Node<T> | undefined;
  public right: Node<T> | undefined;

  constructor(public value: T) {}
}

test("Node", (t) => {
  const node = new Node(420);
  node.left = new Node(69);
  node.right = new Node(1337);

  t.is(node.value, 420);
  t.is(node.left.value, 69);
  t.is(node.right.value, 1337);
});

/*
 * @dev Implements a binary search tree.
 * @time O(log(n))
 * @space O(n)
 */
class BinarySearchTree<T> {
  private root?: Node<T>;

  public insert = (value: T): void => {
    const node = new Node(value);

    if (!this.root) {
      // empty tree
      this.root = node;
    } else {
      let currentNode = this.root;

      // search the tree from the root for an opening to place the value
      while (currentNode) {
        if (value > currentNode.value) {
          if (!currentNode.right) {
            // place the greater value on the right child
            currentNode.right = node;
            return;
          } else {
            // go one level deeper
            currentNode = currentNode.right;
          }
        } else if (value < currentNode.value) {
          if (!currentNode.left) {
            // place the lesser value on the right child
            currentNode.left = node;
            return;
          } else {
            // go one level deeper
            currentNode = currentNode.left;
          }
        }
      }
    }
  };

  public search = (value: T): T | null => {
    let currentNode: Node<T> | undefined = this.root;

    while (currentNode) {
      if (value === currentNode.value) {
        // base case: found the value
        return currentNode.value;
      } else if (value > currentNode.value) {
        // search less than
        currentNode = currentNode.right;
      } else {
        // search greater than
        currentNode = currentNode.left;
      }
    }

    return null;
  };
}

test("insert & search", (t) => {
  const bst = new BinarySearchTree();
  bst.insert(420);
  bst.insert(1337);

  t.is(bst.search(420), 420);
  t.is(bst.search(1337), 1337);
  t.is(bst.search(69), null);
});
