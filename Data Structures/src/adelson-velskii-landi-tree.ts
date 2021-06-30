import { TreeNode } from '../models/tree-node';
import { Compare, defaultCompare, DefaultCompare } from '../util';
import BinarySearchTree from './binary-search-tree';

const enum BalanceFactor {
    // 左侧节点高度大于右侧节点2，需要平衡操作
    Unbalanced_Right = -2,
    // 右侧节点大于左侧节点高度1，暂平衡状态
    Slightly_Unbalanced_Right = -1,
    // 左右两侧高度相等，平衡
    balanced = 0,
    // 左侧节点大于右侧节点高度1，暂平衡状态
    Slightly_Unbalanced_Left = 1,
    // 左侧节点高度大于右侧节点2，需要平衡操作
    Unbalanced_Left = 2
}

export default class AVITree<T> extends BinarySearchTree<T> {
    public constructor(nodeArr?: T[], protected compareFn: DefaultCompare<T> = defaultCompare) {
        super(nodeArr, compareFn);
    }

    public insert(node: T) {
        this.root = this.insertNode(this.root, node);
    }

    protected insertNode(root: TreeNode<T> | undefined, node: T) {
        if (root === undefined) {
            return new TreeNode(node);
        } else if (this.compareFn(root.node, node) === Compare.BIGGER_THAN) {
            root.left = this.insertNode(root.left, node);
        } else if (this.compareFn(root.node, node) === Compare.LESS_THAN) {
            root.right = this.insertNode(root.right, node);
        } else {
            // 重复的node
            return root;
        }

        // 如果需要，进行平衡操作
        const balanceFactor = this.getBalanceFactor(root);

        if (balanceFactor === BalanceFactor.Unbalanced_Left) {
            // 向左侧子树插入节点后不平衡，需要比较插入的键小于左侧的子节点的键，如果是，则进行LL操作，如果大于，则进行LR操作
            if (this.compareFn(root.left!.node, node) === Compare.BIGGER_THAN) {
                return this.rotationLL(root);
            } else {
                return this.rotationLR(root);
            }
        } else if (balanceFactor === BalanceFactor.Unbalanced_Right) {
            // 向右侧子树插入节点后不平衡，需要比较插入的键大于右侧的子节点的键，如果是，则进行RR操作，如果小于，则进行RL操作
            if (this.compareFn(root.right!.node, node) === Compare.LESS_THAN) {
                return this.rotationRR(root);
            } else {
                return this.rotationRL(root);
            }
        }

        return root;
    }

    protected removeNode(root: TreeNode<T>, node: T) {
        const _node = super.removeNode(root, node);

        if (_node !== undefined) {
            const balanceFactor = this.getBalanceFactor(root);

            if (balanceFactor === BalanceFactor.Unbalanced_Left) {
                const balanceFactorLeft = this.getBalanceFactor(root.left!);

                // 右侧移除节点后树不平衡了，要计算左侧子树的平衡因子，如果左侧子树向左不平衡，则进行LL操作，反之进行LR操作
                if (
                    balanceFactorLeft === BalanceFactor.balanced ||
                    balanceFactorLeft === BalanceFactor.Slightly_Unbalanced_Left
                ) {
                    return this.rotationLL(root);
                } else {
                    return this.rotationLR(root);
                }
            } else if (balanceFactor === BalanceFactor.Unbalanced_Right) {
                const balanceFactorRight = this.getBalanceFactor(root.right!);

                // 左侧移除节点后树不平衡了，要计算右侧子树的平衡因子，如果右侧子树向右不平衡，则进行RR操作，反之进行RL操作
                if (
                    balanceFactorRight === BalanceFactor.balanced ||
                    balanceFactorRight === BalanceFactor.Slightly_Unbalanced_Right
                ) {
                    return this.rotationRR(root);
                } else {
                    return this.rotationRL(root);
                }
            }
        }

        return _node;
    }

    // 计算节点高度
    //             11 - 3
    //           /   \
    //      1 - 7    15 - 2
    //         / \   / \
    //    0 - 5   9 13 17 - 1
    //                   \
    //                   19 - 0
    private getNodeHeight(root: TreeNode<T> | undefined): number {
        if (root === undefined) {
            return -1;
        }

        return Math.max(this.getNodeHeight(root.left), this.getNodeHeight(root.right)) + 1;
    }

    // 获取平衡状态函数，判断使用哪种平衡方法
    private getBalanceFactor(root: TreeNode<T>) {
        return this.getNodeHeight(root.left) - this.getNodeHeight(root.right);
    }

    // 平衡函数
    // 左-左（LL）：向右的单旋转
    // 出现于左侧子节点的高度大于右侧子节点，并且左侧子节点也是平衡或左侧较重的
    //             50 - +2                  30
    //           /   \                     /  \
    //      2 - 30   70 - 0   ------>     10   50
    //         / \                        /    /  \
    //        10  40                     5    40   70
    //        /
    //       5

    // 1.把左侧的第一个子节点30,置于50所在的位置
    // 2.节点30的左侧子树不变
    // 3.把50的左节点设置为30的右节点，即40
    // 4.把30的右节点设置成50，完成旋转

    private rotationLL(root: TreeNode<T>) {
        const temp = root.left;
        root.left = temp?.right;
        temp!.right = root;
        return temp;
    }

    // 右-右（RR）：向左的单旋转
    // 出现于右侧子节点的高度大于左侧子节点，并且右侧子节点也是平衡或右侧较重的
    //             50 - -2                  70
    //           /   \                     /  \
    //      0 - 30   70 - 2   ------>     50   80
    //               / \                 /  \   \
    //              60  80              30  60   90
    //                   \
    //                    90

    // 1.把右侧的第一个子节点70,置于50所在的位置
    // 2.节点70的右侧子树不变
    // 3.把50的右节点设置为70的左节点，即60
    // 4.把70的左节点设置成50，完成旋转

    private rotationRR(root: TreeNode<T>) {
        const temp = root.right;
        root.right = temp?.left;
        temp!.left = root;
        return temp;
    }

    // 左-右（LR）：向右的双旋转
    // 出现于左侧子节点的高度大于右侧子节点，并且左侧子节点的右侧较重的，我们可以先对节点的左侧子节点进行左旋(RR)修复，形成左-左的情况，然后再右(LL)旋转修复
    //             50 - +2                  50 - +2                      40
    //           /   \                     /  \                        /   \
    //      2 - 30   70 - 0  ------>  2 - 40   70      ------->       30    50
    //         / \                       /                           /  \    \
    //        10  40                    30                          10  35    70
    //            /                    /  \
    //           35                   10  35

    private rotationLR(root: TreeNode<T>) {
        root.left = this.rotationRR(root.left!);
        return this.rotationLL(root);
    }

    // 右-左（RL）：向左的双旋转
    // 出现于右侧子节点的高度大于左侧子节点，并且右侧子节点的左侧较重的，我们可以先对节点的右侧子节点进行右旋(LL)修复，形成右-右的情况，然后再左(RR)旋转修复
    //             70 - -2                  70 - -2                       72
    //           /   \                     /  \                         /   \
    //      0 - 50   80 - 2  ------>  0 - 50   72      ------->       70     80
    //               / \                        \                     /     /  \
    //              72  90                      80                   50    75  90
    //               \                         /  \
    //                75                      75  90

    private rotationRL(root: TreeNode<T>) {
        root.right = this.rotationLL(root.right!);
        return this.rotationRR(root);
    }
}
