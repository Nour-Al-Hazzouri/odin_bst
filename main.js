import Tree from "./Tree.js";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 67, 6345, 324];
const tree = new Tree(array);

tree.prettyPrint(tree.Root);
console.log(tree.height(8));
