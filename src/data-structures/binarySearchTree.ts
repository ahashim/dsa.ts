import test from "ava";

type Order = "inOrder" | "preOrder" | "postOrder";

/*
 * @dev Implements a tree node with left & right children.
 */
class Node<T> {
  public left?: Node<T>;
  public right?: Node<T>;

  constructor(public value: T) {}
}

test("nodes", (t) => {
  const node = new Node(420);
  node.left = new Node(69);
  node.right = new Node(1337);

  t.is(node.value, 420);
  t.is(node.left.value, 69);
  t.is(node.right.value, 1337);
});

/*
 * @dev Implements a binary search tree.
 */
class BinarySearchTree<T> {
  private root?: Node<T>;

  constructor(initialValue?: T) {
    if (initialValue) {
      this.root = new Node(initialValue);
    }
  }

  public contains = (value: T): boolean => {
    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.value) {
        // base case: found the value
        return true;
      } else if (value > currentNode.value) {
        // search less than
        currentNode = currentNode.right;
      } else {
        // search greater than
        currentNode = currentNode.left;
      }
    }

    // value does not exist
    return false;
  };

  public delete = (value: T): void => {
    if (this.root) {
      this.root = this._delete(value, this.root);
    }
  };

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
        } else {
          // value already exists
          return;
        }
      }
    }
  };

  public traverse = (order: Order = "inOrder"): T[] | Error => {
    if (this.root) {
      switch (order) {
        case "preOrder":
          return this._preOrderTraversal(this.root);
        case "inOrder":
          return this._inOrderTraversal(this.root);
        case "postOrder":
          return this._postOrderTraversal(this.root);
        default:
          throw new Error("BinarySearchTree: invalid traversal method");
      }
    }

    return [];
  };

  private _delete = (value: T, node?: Node<T>): Node<T> | undefined => {
    if (node === undefined) {
      // base case: reached the bottom of the tree
      return undefined;
    } else if (value < node.value) {
      // recursvely update the left sub-tree
      node.left = this._delete(value, node.left);

      return node;
    } else if (value > node.value) {
      // recursvely update the right sub-tree
      node.right = this._delete(value, node.right);

      return node;
    } else if (value === node.value) {
      // handle all cases of removing the node
      if (node.left === undefined) {
        // if there's no left child, move the right child up to take the nodes
        // place (it could be undefined, and thus hit the base case)

        return node.right;
      } else if (node.right === undefined) {
        // same as the above case for no right child

        return node.left;
      } else {
        // if the node has 2 children, replace the current node's value with
        // its successor
        node.right = this._findSuccessor(node.right, node);

        return node;
      }
    }
  };

  private _findSuccessor = (
    currentNode: Node<T>,
    nodeToDelete: Node<T>
  ): Node<T> | undefined => {
    if (currentNode.left) {
      // if there is a left child, recursively traverse down while passing the
      // value to delete with it
      currentNode.left = this._findSuccessor(currentNode.left, nodeToDelete);

      return currentNode;
    } else {
      // no left child means the current node is the successor and it overwrites
      // the node to delete's value
      nodeToDelete.value = currentNode.value;

      // return the successors right child to use as its parents left child to
      // connect all the remaining values in the tree
      return currentNode.right;
    }
  };

  private _preOrderTraversal = (node: Node<T>, values: T[] = []): T[] => {
    // first add the value of the current node
    values.push(node.value);

    // recurse on the left child
    if (node.left) this._preOrderTraversal(node.left, values);

    // recurse on the right child
    if (node.right) this._preOrderTraversal(node.right, values);

    return values;
  };

  private _inOrderTraversal = (node: Node<T>, values: T[] = []): T[] => {
    // recurse on the left child
    if (node.left) this._inOrderTraversal(node.left, values);

    // then add the value of the current node
    values.push(node.value);

    // recurse on the right child
    if (node.right) this._inOrderTraversal(node.right, values);

    return values;
  };

  private _postOrderTraversal = (node: Node<T>, values: T[] = []): T[] => {
    // recurse on the left child
    if (node.left) this._postOrderTraversal(node.left, values);

    // recurse on the right child
    if (node.right) this._postOrderTraversal(node.right, values);

    // finally add the value of the current node
    values.push(node.value);

    return values;
  };
}

test("insert", (t) => {
  const bst = new BinarySearchTree();

  bst.insert(1337);

  t.is(bst.contains(1337), true);
  t.is(bst.contains(420), false);
});

test("delete", (t) => {
  const bst = new BinarySearchTree(420);

  bst.insert(1337);
  bst.delete(420); // deleting the root

  t.is(bst.contains(420), false);
  t.is(bst.contains(1337), true);
});

test("traverese preOrder", (t) => {
  const bst = generateNumericBinarySearchTree();

  const actual = bst.traverse("preOrder");
  const expected = [1, 5, 2, 4, 3, 9, 7, 6, 8, 10];

  t.deepEqual(actual, expected);
});

test("traverese inOrder", (t) => {
  const bst = generateNumericBinarySearchTree();

  const actual = bst.traverse("inOrder");
  const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  t.deepEqual(actual, expected);
});

test("traverese postOrder", (t) => {
  const bst = generateNumericBinarySearchTree();

  const actual = bst.traverse("postOrder");
  const expected = [3, 4, 2, 6, 8, 7, 10, 9, 5, 1];

  t.deepEqual(actual, expected);
});

/*
 * @dev Helper function to generate a binary search tree with "random" values
 *      from 1 - 10.
 */
const generateNumericBinarySearchTree = (): BinarySearchTree<number> => {
  const bst: BinarySearchTree<number> = new BinarySearchTree();

  // not so "random"
  [1, 5, 9, 2, 7, 4, 10, 6, 3, 8].forEach(bst.insert);

  return bst;
};
