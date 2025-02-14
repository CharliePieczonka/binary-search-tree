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
    return this.insertRecursive(this.root, value);
  }

  insertRecursive(node, value) {
    // reached leaf
    if (node === null) {
      return new Node(value);
    }

    // duplicate value
    if (value === node.value) {
      return node;
    }

    // traverse tree
    if (value > node.value) {
      node.rightChild = this.insertRecursive(node.rightChild, value);
    } else if (value < node.value) {
      node.leftChild = this.insertRecursive(node.leftChild, value);
    }

    return node;
  }

  deleteItem(value) {
    return this.deleteItemRecursive(this.root, value);
  }

  deleteItemRecursive(node, value) {
    if (node === null) {
      return node;
    }

    // traverse tree until values match
    if (value > node.value) {
      node.rightChild = this.deleteItemRecursive(node.rightChild, value);
    } else if (value < node.value) {
      node.leftChild = this.deleteItemRecursive(node.leftChild, value);
    } else {
      // node value matches delete value
      // node has 0 or 1 child only
      if (node.leftChild === null) {
        return node.rightChild;
      }

      if (node.rightChild === null) {
        return node.leftChild;
      }

      // both children present
      let succ = this.getSuccessor(node);
      node.value = succ.value;
      node.rightChild = this.deleteItemRecursive(node.rightChild, succ.value);
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
    return this.findRecursive(this.root, value);
  }

  findRecursive(node, value) {
    // root is null, leaf reached i.e. value not found, or value was found
    if (node === null || value === node.value) {
      return node;
    }

    // traverse tree
    if (value > node.value) {
      return this.findRecursive(node.rightChild, value);
    } else if (value < node.value) {
      return this.findRecursive(node.leftChild, value);
    }
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is the required argument");
    }

    let currentNode = this.root;
    let queue = [];
    if (currentNode === null) {
      return;
    }

    // utilize queue fifo functionality to order the nodes correctly
    queue.push(currentNode);
    while (queue.length !== 0) {
      currentNode = queue[0];
      callback(currentNode);
      if (currentNode.leftChild !== null) {
        queue.push(currentNode.leftChild);
      }
      if (currentNode.rightChild !== null) {
        queue.push(currentNode.rightChild);
      }

      queue = queue.slice(1);
    }
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is the required argument");
    }

    this.preOrderRecursive(this.root, callback);
  }

  preOrderRecursive(node, callback) {
    if (node === null) {
      return;
    }
    callback(node);
    this.preOrderRecursive(node.leftChild, callback);
    this.preOrderRecursive(node.rightChild, callback);
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is the required argument");
    }

    this.inOrderRecursive(this.root, callback);
  }

  inOrderRecursive(node, callback) {
    if (node === null) {
      return;
    }

    this.inOrderRecursive(node.leftChild, callback);
    callback(node);
    this.inOrderRecursive(node.rightChild, callback);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is the required argument");
    }

    this.postOrderRecursive(this.root, callback);
  }

  postOrderRecursive(node, callback) {
    if (node === null) {
      return;
    }

    this.postOrderRecursive(node.leftChild, callback);
    this.postOrderRecursive(node.rightChild, callback);
    callback(node);
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    let leftHeight = this.height(node.leftChild);
    let rightHeight = this.height(node.rightChild);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    let currentNode = this.root;
    let depth = 0;

    // if null is passed in as node, or a node object that isn't in the tree
    if (node === null || this.find(node.value) === null) {
      return -1;
    }

    while (currentNode !== node && currentNode !== null) {
      if (node.value > currentNode.value) {
        currentNode = currentNode.rightChild;
      } else {
        currentNode = currentNode.leftChild;
      }

      depth++;
    }

    return depth;
  }

  isBalanced() {
    let rightSide = this.root.rightChild;
    let leftSide = this.root.leftChild;

    if (Math.abs(this.height(rightSide) - this.height(leftSide)) > 1) {
      return false;
    }

    return true;
  }

  rebalance() {
    if (this.isBalanced()) {
      return "This tree is already balanced.";
    }

    let array = [];
    this.inOrder((node) => array.push(node.value));
    this.root = this.buildTree(array);
  }

  printNode(node) {
    console.log(node.value);
  }

  printTree() {
    this.prettyPrint(this.root);
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

export { Tree };
