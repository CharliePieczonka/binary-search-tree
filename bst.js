class Tree {
  root = null;
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // sort array numerically
    array.sort(function (a, b) {
      return a - b;
    });

    array = [...new Set(array)]; // remove duplicate values

    return this.buildTreeRecursive(array, 0, array.length - 1);
  }

  // recursive helper function to create the balanced BST
  buildTreeRecursive(arr, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);

    root.leftChild = this.buildTreeRecursive(arr, start, mid - 1);
    root.rightChild = this.buildTreeRecursive(arr, mid + 1, end);

    return root;
  }

  insert(value) {
    return this.insertRecursive(value, this.root);
  }

  insertRecursive(value, node) {
    // reached leaf
    if (node === null) {
      return new Node(value);
    }

    // duplicate
    if (value === node.value) {
      return node;
    }

    if (value > node.value) {
      node.rightChild = this.insertRecursive(value, node.rightChild);
    } else if (value < node.value) {
      node.leftChild = this.insertRecursive(value, node.leftChild);
    }

    return node;
  }

  deleteItem(value) {
    return this.deleteItemRecursive(value, this.root);
  }

  deleteItemRecursive(value, node) {
    if (node === null) {
      return node;
    }

    // traverse tree until values match
    if (value > node.value) {
      node.rightChild = this.deleteItemRecursive(value, node.rightChild);
    } else if (value > node.value) {
      node.leftChild = this.deleteItemRecursive(value, node.leftChild);
    } else {
      // node value matches value

      // node has 0 or 1 child only
      if (node.leftChild === null) {
        return node.rightChild;
      }

      if (node.rightChild === null) {
        return node.leftChild;
      }

      // both children present
      let succ = getSuccessor(node);
      node.value = succ.value;
      node.rightChild = deleteItemRecursive(node.rightChild, succ.value);
    }

    return node;
  }

  // helper function to get a node's successor from its children when it is deleted
  getSuccessor(curr) {
    curr = curr.rightChild;
    while (curr !== null && curr.leftChild !== null) {
      curr = curr.leftChild;
    }
    return curr;
  }

  find(value) {
    return this.findRecursive(value, this.root);
  }

  findRecursive(value, node) {
    // root is null, leaf reached i.e. value not found, or value was found
    if (node === null || value === node.value) {
      return node;
    }

    // recursively traverse tree in the desired direction
    if (value > node.value) {
      return this.findRecursive(value, node.rightChild);
    } else if (value < node.value) {
      return this.findRecursive(value, node.leftChild);
    }
  }

  // provided console bst print function
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }
}

class Node {
  value = null;
  leftChild = null;
  rightChild = null;

  constructor(value) {
    this.value = value;
  }
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let bst = new Tree(array);
bst.prettyPrint(bst.root);
