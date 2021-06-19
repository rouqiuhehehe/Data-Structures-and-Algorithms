export declare class Node<T> {
    element: T;
    next?: Node<T> | undefined;
    constructor(element: T, next?: Node<T> | undefined);
}
export declare class DoubleNode<T> extends Node<T> {
    element: T;
    next?: DoubleNode<T> | undefined;
    prev?: DoubleNode<T> | undefined;
    constructor(element: T, next?: DoubleNode<T> | undefined, prev?: DoubleNode<T> | undefined);
}
