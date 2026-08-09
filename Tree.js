class Tree {
  #array;
  #root;
  constructor(array) {
    this.#array = array;
  }

  set root(newRoot) {
    this.#root = newRoot;
  }

  #buildTree(array) {}
}

export default Tree;
