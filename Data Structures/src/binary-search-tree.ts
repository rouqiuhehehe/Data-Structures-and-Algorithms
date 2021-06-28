import { defaultCompare, DefaultCompare } from '../util';

export default class BinarySearchTree<T> {
    public constructor(protected node?: T[], protected compareFn: DefaultCompare<T> = defaultCompare) {
        if (node !== undefined) {
            if (!(node instanceof Array)) {
                throw new TypeError(node + ' is not Array');
            }
        }
    }
}
