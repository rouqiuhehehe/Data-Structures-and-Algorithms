export class TreeNode<T> {
    public constructor(public node: T, public left?: TreeNode<T>, public right?: TreeNode<T>) {}

    public toString() {
        return `             ${this.node}
            /   \\
           ${this.left}   ${this.right}
        `;
    }
}
