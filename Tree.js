import Node from "./Node.js";

class Tree {
  #root;
  constructor(array) {
    // set root node from sorted array
    this.#root = this.#buildTree(array);
  }

  set root(newRoot) {
    this.#root = newRoot;
  }
  get Root() {
    return this.#root;
  }

  // build tree recursively
  #buildTreeRecursively(array, start, end) {
    // base case
    if (start > end) return null;
    // create root element
    const arrayMid = start + Math.floor((end - start) / 2);
    const node = new Node(array[arrayMid]);
    // set left and right recursively
    node.left = this.#buildTreeRecursively(array, start, arrayMid - 1);
    node.right = this.#buildTreeRecursively(array, arrayMid + 1, end);
    return node;
  }
  // provide sorted array and receive root node
  #buildTree(array) {
    // sort array in asc order and filter it from duplicates
    const sortedArray = array
      .sort((a, b) => a - b)
      .filter((num, index) => array.indexOf(num) === index);
    return this.#buildTreeRecursively(sortedArray, 0, sortedArray.length - 1);
  }
  // provided by TOP, visualizes tree in log
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }
    this.prettyPrint(node.Right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.Data}`);
    this.prettyPrint(node.Left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
  // search nodes recursively for value
  #binarySearch(node, value) {
    // base case
    if (!node) return false;
    // value found
    if (node.Data === value) return true;
    else {
      // check left if value smaller, and right if larger
      if (value < node.Data) return this.#binarySearch(node.Left, value);
      else if (value > node.Data) return this.#binarySearch(node.Right, value);
    }
  }
  // check if a value is inside the tree
  includes(value) {
    return this.#binarySearch(this.Root, value);
  }
  // traverse tree recursively to insert new node
  #binaryInsert(node, value) {
    // do nothing if value exists
    if (node.Data === value) return;
    // check if value smaller than data and add value of left is null
    if (value < node.Data) {
      if (node.Left) return this.#binaryInsert(node.Left, value);
      else {
        node.left = new Node();
        node.Left.data = value;
      }
    }
    // check if value larger than data and add value if right is null
    else if (value > node.Data) {
      if (node.Right) return this.#binaryInsert(node.Right, value);
      else {
        node.right = new Node();
        node.Right.data = value;
      }
    }
  }
  // insert new value in tree
  insert(value) {
    this.#binaryInsert(this.Root, value);
  }
  // find successor to replace node to be deleted
  #getSuccessor(curr) {
    curr = curr.Right;
    while (curr !== null && curr.Left !== null) curr = curr.Left;
    return curr;
  }

  // traverse tree recursively to find & delete item
  #binaryDelete(node, value) {
    // base case
    if (!node) return null;
    // either update link of left/right node or return the same node
    if (value < node.Data) node.left = this.#binaryDelete(node.Left, value);
    else if (value > node.Data)
      node.right = this.#binaryDelete(node.Right, value);
    else {
      // 1 child case: return the non-null child
      if (!node.Left) return node.Right;
      else if (!node.Right) return node.Left;

      // 2 children case
      const succ = this.#getSuccessor(node);
      node.data = succ.Data;
      node.right = this.#binaryDelete(node.Right, succ.Data);
    }
    return node;
  }

  // delete item from tree
  deleteItem(value) {
    this.#binaryDelete(this.Root, value);
  }
}

export default Tree;
