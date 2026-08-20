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
    // base case for when a null is reached the new value is returned
    if (node === null) {
      const newNode = new Node();
      newNode.data = value;
      return newNode;
    }
    // tree traversed until the value is inserted in correct position
    if (value < node.Data) node.left = this.#binaryInsert(node.Left, value);
    else if (value > node.Data)
      node.right = this.#binaryInsert(node.Right, value);
    return node;
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
  // traverse tree in breadth-first level order traversal
  levelOrderForEach(callback) {
    if (!callback) throw new Error("No callback passed");
    const queue = [this.Root];
    // dequeue parent node after enqueueing children nodes
    while (queue.length !== 0) {
      // callback called over each node's value
      callback(queue[0].Data);
      if (queue[0].Left) queue.push(queue[0].Left);
      if (queue[0].Right) queue.push(queue[0].Right);
      queue.shift();
    }
  }
  // traverse tree in pre-order traversal: root -> left -> right
  #preOrderTraversal(node, callback) {
    if (!callback) throw new Error("No callback passed");
    if (!node) return;
    // callback function on each value by root, left, and right
    callback(node.Data);
    this.#preOrderTraversal(node.Left, callback);
    this.#preOrderTraversal(node.Right, callback);
  }
  preOrderForEach(callback) {
    this.#preOrderTraversal(this.Root, callback);
  }
  // traverse tree in in-order traversal: left -> root -> right
  #inOrderTraversal(node, callback) {
    if (!callback) throw new Error("No callback passed");
    if (!node) return;
    // callback function on each value left, root, and right
    this.#inOrderTraversal(node.Left, callback);
    callback(node.Data);
    this.#inOrderTraversal(node.Right, callback);
  }
  inOrderForEach(callback) {
    this.#inOrderTraversal(this.Root, callback);
  }
  // traverse tree in post-order traversal: left -> right -> root
  #postOrderTraversal(node, callback) {
    if (!callback) throw new Error("No callback passed");
    if (!node) return;
    // callback function on each value left, right, and root
    this.#postOrderTraversal(node.Left, callback);
    this.#postOrderTraversal(node.Right, callback);
    callback(node.Data);
  }
  postOrderForEach(callback) {
    this.#postOrderTraversal(this.Root, callback);
  }
  // calculate height of both left and right to check which is bigger
  #calculateHeight(node) {
    let left = 0;
    let right = 0;
    if (!node) return -1;
    if (node.Left) left += this.#calculateHeight(node.Left) + 1;
    if (node.Right) right += this.#calculateHeight(node.Right) + 1;
    return Math.max(left, right);
  }
  // search height (number of edges in the longest path from that node to a leaf node)
  #getHeight(node, value) {
    let leftSide;
    let rightSide;
    if (!node) return;
    if (value < node.Data) return this.#getHeight(node.Left, value);
    else if (value > node.Data) return this.#getHeight(node.Right, value);
    else if (value === node.Data) {
      leftSide = this.#calculateHeight(node.Left);
      rightSide = this.#calculateHeight(node.Right);
      return Math.max(leftSide, rightSide) + 1;
    }
  }
  height(value) {
    const result = this.#getHeight(this.Root, value);
    if (isNaN(result)) return;
    return result;
  }
  // calculate depth (number of edges in the path from that node to the root node)
  #getDepth(node, value) {
    let counter = 0;
    // base case
    if (!node) return;
    // count each time a recursive step is made
    if (value < node.Data) {
      return this.#getDepth(node.Left, value) + 1;
    } else if (value > node.Data) {
      return this.#getDepth(node.Right, value) + 1;
      // return counter if value found
    } else if (value === node.Data) return counter;
  }
  // longest road from root node to node with value
  depth(value) {
    const result = this.#getDepth(this.Root, value);
    if (isNaN(result)) return;
    else return result;
  }
  // check if difference between right and left subtrees is 1 or more
  #checkBalance(node) {
    if (!node) return true;
    // calculate difference between right and left's heights to check for balance status
    const leftHeight = this.#calculateHeight(node.Left);
    const rightHeight = this.#calculateHeight(node.Right);
    const balanceStatus = Math.abs(leftHeight - rightHeight) <= 1;
    if (
      balanceStatus &&
      this.#checkBalance(node.Left) &&
      this.#checkBalance(node.Right)
    )
      return true;
    else return false;
  }
  isBalanced() {
    return this.#checkBalance(this.Root);
  }
  reBalance() {
    const array = [];
    this.inOrderForEach((value) => array.push(value));
    this.root = this.#buildTree(array);
  }
}

export default Tree;
