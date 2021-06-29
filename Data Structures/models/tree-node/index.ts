export class TreeNode<T> {
    public left?: TreeNode<T>;
    public right?: TreeNode<T>;

    public constructor(public node: T, public height = 0) {}

    public toString() {
        return `${this.height} => ${this.node}`;
    }
}
