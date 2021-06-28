export class TreeNode<T> {
    public constructor(public node: T, public left?: T, public right?: T) {}

    public toString() {
        return `             ${this.node}
            /   \\
           ${this.left}   ${this.right}
        `;
    }
}
