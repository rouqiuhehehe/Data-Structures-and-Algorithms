export class TreeNode<T> {
    public constructor(public node: T, public left?: T, public right?: T) {}

    public toString() {
        return `             ${this.node}
            /   \\
           ${this.left}   ${this.right}
        `;
    }
}

// tslint:disable-next-line:no-magic-numbers
const treeNode = new TreeNode<number>(10000, 50000, 210);

console.log(treeNode.toString());
