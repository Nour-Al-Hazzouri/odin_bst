class Node {
  #data;
  #left = null;
  #right = null;
  constructor(data = null) {
    this.#data = data;
  }

  set data(newData) {
    this.#data = newData;
  }
  set left(newLeft) {
    this.#left = newLeft;
  }
  set right(newRight) {
    this.#right = newRight;
  }
  get Data() {
    return this.#data;
  }
  get Left() {
    return this.#left;
  }
  get Right() {
    return this.#right;
  }
}

export default Node;
