import LinkedList from './链表';
import { DoubleNode } from '../models/linked-list-models';
import { defaultEquals } from '../util';
export default class DoubleLinkedLike<T> extends LinkedList<T> {
    protected equalsFn: typeof defaultEquals;
    protected head?: DoubleNode<T>;
    protected footer?: DoubleNode<T>;
    constructor(equalsFn?: typeof defaultEquals);
    push(element: T): void;
    insert(element: T, index: number): boolean;
    removeAt(index: number): T | undefined;
    getFooter(): DoubleNode<T> | undefined;
    clear(): void;
    inverseToString(): string;
}
