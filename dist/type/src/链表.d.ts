import { defaultEquals } from '../util';
import { Node } from '../models/linked-list-models';
export default class LinkedList<T> {
    protected equalsFn: typeof defaultEquals;
    protected count: number;
    protected head?: Node<T>;
    constructor(equalsFn?: typeof defaultEquals);
    push(element: T): void;
    getElementAt(index: number): Node<T> | undefined;
    removeAt(index: number): T | undefined;
    insert(element: T, index: number): boolean;
    indexOf(element: T): number;
    remove(element: T): T | undefined;
    get size(): number;
    isEmpty(): boolean;
    getHead(): Node<T> | undefined;
    toString(): string;
    clear(): void;
}
