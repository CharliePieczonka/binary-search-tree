import { Tree } from "./bst.js";

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let bst = new Tree(array);

bst.printTree();

console.log("pre order:");
bst.preOrder(bst.printNode);

console.log("pre order:");
bst.inOrder(bst.printNode);

console.log("post order:");
bst.postOrder(bst.printNode);

console.log("is balanced? " + bst.isBalanced());

console.log("find 1");
console.log(bst.find(1));

console.log("find 324");
console.log(bst.find(324));

console.log("find 300");
console.log(bst.find(300));
console.log("insert 300");
console.log(bst.insert(300));
console.log("find 300");
console.log(bst.find(300));

bst.printTree();

console.log("delete leaf node 23");
console.log(bst.deleteItem(23));
bst.printTree();

console.log("delete node with one child, 1");
console.log(bst.deleteItem(1));
bst.printTree();

console.log("delete node with both children, 324");
console.log(bst.deleteItem(324));
bst.printTree();

console.log("insert 301, 302, 303");
console.log(bst.insert(301));
console.log(bst.insert(302));
console.log(bst.insert(303));
bst.printTree();

console.log("is balanced? " + bst.isBalanced());
console.log("rebalance.");
console.log(bst.rebalance());
bst.printTree();
