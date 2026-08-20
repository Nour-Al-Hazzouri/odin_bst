import Tree from "./Tree.js";
const array = [
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 67, 15, 33, 12, 15, 16, 44, 57, 85, 34, 67, 43,
  5, 4, 5, 45, 4, 99,
];
const tree = new Tree(array);
tree.prettyPrint(tree.Root);
// console.log(tree.isBalanced());
// console.log(tree.preOrderForEach((value) => console.log(value)));
// console.log(tree.postOrderForEach((value) => console.log(value)));
// console.log(tree.inOrderForEach((value) => console.log(value)));
// tree.insert(100);
// tree.insert(200);
// tree.insert(130);
// tree.insert(144);
// tree.insert(150);
// console.log(tree.isBalanced());
// tree.reBalance();
// tree.prettyPrint(tree.Root);
// console.log(tree.isBalanced());
// console.log(tree.preOrderForEach((value) => console.log(value)));
// console.log(tree.postOrderForEach((value) => console.log(value)));
// console.log(tree.inOrderForEach((value) => console.log(value)));
