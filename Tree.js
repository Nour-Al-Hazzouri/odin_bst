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
}

export default Tree;
