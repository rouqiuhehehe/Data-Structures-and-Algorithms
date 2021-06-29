import { defaultCompare, DefaultCompare, Compare } from '../util';
import { TreeNode } from '../models/tree-node';

export default class BinarySearchTree<T> {
    protected root?: TreeNode<T>;
    private removeStatues = false;

    public constructor(nodeArr?: T[], protected compareFn: DefaultCompare<T> = defaultCompare) {
        if (nodeArr !== undefined) {
            if (!(nodeArr instanceof Array)) {
                throw new TypeError(nodeArr + ' is not Array');
            }
            for (const item of nodeArr) {
                this.insert(item);
            }
        }
    }

    public insert(node: T) {
        if (!this.root) {
            this.root = new TreeNode(node);
        } else {
            this.insertNode(this.root, node);
        }
    }

    public search(node: T) {
        if (this.root === undefined) {
            return undefined;
        }
        return this.searchNode(this.root, node);
    }

    public inOrderTraverse(callback: (node: T) => void, thisArg = null) {
        this.inOrderTraverseNode(this.root, callback, thisArg);
    }

    public preOrderTraverse(callback: (node: T) => void, thisArg = null) {
        this.preOrderTraverseNode(this.root, callback, thisArg);
    }

    public postOrderTraverse(callback: (node: T) => void, thisArg = null) {
        this.postOrderTraverseNode(this.root, callback, thisArg);
    }

    public lastOrderTraverse(callback: (node: T) => void, thisArg = null) {
        this.lastOrderTraverseNode(this.root, callback, thisArg);
    }

    public remove(node: T) {
        this.root = this.removeNode(this.root, node);
        return this.removeStatues;
    }

    public toString() {
        let str = '';
        this.inOrderTraverseNode(this.root, (_v, r) => {
            str += r.toString() + '\n';
        });

        return str;
    }

    public get min() {
        if (this.root === undefined) {
            return undefined;
        }
        return this.minNode(this.root).node;
    }

    public get max() {
        if (this.root === undefined) {
            return undefined;
        }
        return this.maxNode(this.root).node;
    }

    protected insertNode(root: TreeNode<T>, node: T) {
        if (this.compareFn(root.node, node) === Compare.BIGGER_THAN) {
            if (root.left === undefined) {
                root.left = new TreeNode(node, root.height + 1);
            } else {
                this.insertNode(root.left, node);
            }
        } else {
            if (root.right === undefined) {
                root.right = new TreeNode(node, root.height + 1);
            } else {
                this.insertNode(root.right, node);
            }
        }
    }

    protected searchNode(root: TreeNode<T> | undefined, node: T): boolean {
        if (root === undefined) {
            return false;
        }
        if (this.compareFn(root.node, node) === Compare.BIGGER_THAN) {
            return this.searchNode(root.left, node);
        } else if (this.compareFn(root.node, node) === Compare.LESS_THAN) {
            return this.searchNode(root.right, node);
        } else {
            return true;
        }
    }

    // 从小到大遍历，先遍历最左边的，然后中间，然后最右边，中序遍历
    protected inOrderTraverseNode(
        root: TreeNode<T> | undefined,
        callback: (node: T, root: TreeNode<T>) => void,
        thisArg = null
    ) {
        if (root !== undefined) {
            this.inOrderTraverseNode(root.left, callback, thisArg);
            callback.call(thisArg, root.node, root);
            this.inOrderTraverseNode(root.right, callback, thisArg);
        }
    }

    // 先序遍历，自根节点从左往右开始遍历
    protected preOrderTraverseNode(
        root: TreeNode<T> | undefined,
        callback: (node: T, root: TreeNode<T>) => void,
        thisArg = null
    ) {
        if (root !== undefined) {
            callback.call(thisArg, root.node, root);
            this.preOrderTraverseNode(root.left, callback, thisArg);
            this.preOrderTraverseNode(root.right, callback, thisArg);
        }
    }

    // 后序遍历，会先遍历树的后代节点，再访问节点本身
    protected postOrderTraverseNode(
        root: TreeNode<T> | undefined,
        callback: (node: T, root: TreeNode<T>) => void,
        thisArg = null
    ) {
        if (root !== undefined) {
            this.postOrderTraverseNode(root.left, callback, thisArg);
            this.postOrderTraverseNode(root.right, callback, thisArg);
            callback.call(thisArg, root.node, root);
        }
    }

    // 从大到小遍历
    protected lastOrderTraverseNode(
        root: TreeNode<T> | undefined,
        callback: (node: T, root: TreeNode<T>) => void,
        thisArg = null
    ) {
        if (root !== undefined) {
            this.lastOrderTraverseNode(root.right, callback, thisArg);
            callback.call(thisArg, root.node, root);
            this.lastOrderTraverseNode(root.left, callback, thisArg);
        }
    }

    protected minNode(root: TreeNode<T>) {
        let current = root;

        while (current.left !== undefined) {
            current = current.left!;
        }

        return current;
    }

    protected maxNode(root: TreeNode<T>) {
        let current = root;

        while (current.right !== undefined) {
            current = current.right!;
        }

        return current;
    }

    protected removeNode(root: TreeNode<T> | undefined, node: T) {
        // 出栈条件
        if (root === undefined) {
            return undefined;
        }

        if (this.compareFn(root.node, node) === Compare.BIGGER_THAN) {
            root.left = this.removeNode(root.left, node);
            return root;
        } else if (this.compareFn(root.node, node) === Compare.LESS_THAN) {
            root.right = this.removeNode(root.right, node);
            return root;
        } else {
            // 相等时， 分三种情况
            let _root: TreeNode<T> | undefined = root;
            this.removeStatues = true;
            // 第一种，节点为最终节点，即节点的左右子节点全部为undefined
            if (root.left === undefined && root.right === undefined) {
                // 把当前删除节点设置成undefined，并返回给父节点的左节点或右节点
                return (_root = undefined);
            }

            // 第二种，节点只有一个左侧子节点，或者一个右侧子节点
            if (root.left === undefined) {
                this.inOrderTraverseNode(root.right, (_v, r) => {
                    r.height -= 1;
                });
                return (_root = root.right);
            } else if (root.right === undefined) {
                this.inOrderTraverseNode(root.left, (_v, r) => {
                    r.height -= 1;
                });
                return (_root = root.left);
            }

            // 第三种，节点左右两侧都有子节点
            //             11
            //           /   \
            //          7    15
            //         / \   / \
            //        5   9 13 17
            //                   \
            //                   19
            // 1.找到要移除的节点后，需要找到它右边子树中最小的节点，即他的继承者，比如要移除15，则需要找到17作为15位置的继承者
            // 2.用它的继承者去更新节点的值，相当于把15移除，换成17
            // 3.移除它的继承者，即17
            // 4.返回给父节点更新后的节点引用，即把11的right从15变成17

            const current = this.minNode(root.right);
            // 把最小节点的值赋给移除的节点
            _root.node = current.node;
            // 删除最小节点
            _root!.right = this.removeNode(root.right, current.node);
            return _root;
        }
    }
}
