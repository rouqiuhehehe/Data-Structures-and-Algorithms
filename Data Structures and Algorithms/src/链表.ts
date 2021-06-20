import { 
    defaultEquals
} from '../util';
import {
    Node
} from '../models/linked-list-models';

// 链表： 每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（指针）组成，增删改查时不需要移动其他元素，但是想要访问其中一个元素，则需要从起点（表头）开始找
export default class LinkedList<T> {
    protected count = 0;   // 链表长度
    protected head?: Node<T>;  // 链表首项

    constructor(protected equalsFn: typeof defaultEquals = defaultEquals) {}

    // 向链表末添加元素
    push(element: T): void {
        const node = new Node(element);
        let current;

        if (this.head === undefined) {
            // 链表为空
            this.head = node;
        } else {
            current = this.head;

            while(current.next !== undefined) {
                current = current.next;
            }
            current.next = node;
        }

        this.count ++;
    }

    // 下标找元素
    getElementAt(index: number) {
        if (index >= 0 && index < this.count) {
            let node = this.head;

            for (let i = 0; i < index; i++) {
                node = node?.next;
            }

            return node;
        }

        return undefined;
    }

    // 下标删元素
    removeAt(index: number) {
        if (index >= 0 && index < this.count) {
            index = Math.floor(index);
            let current = this.head;

            if (index === 0) {
                this.head = this.head?.next;
            } else {
                const previous = this.getElementAt(index - 1);
                (previous as Node<T>).next = current?.next;
                this.count --;
                return current?.element;
            }

            return undefined;
        }
    }

    // 下标插入
    insert(element: T, index: number) {
        const node = new Node(element);

        if (index >= 0 && index <= this.count) {
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1);
                const current = previous?.next;
                node.next = current;
                previous!.next = node;
                this.count ++;

                return true;
            }
        }
        return false;
    }

    // 元素找下标
    indexOf(element: T) {
        let current = this.head;

        for (let i = 0; i < this.count; i ++) {
            if (this.equalsFn(element, this.getElementAt(i)!.element)) {
                return i;
            }
            current = current!.next;
        }

        return -1;
    }

    // 通过元素删除
    remove(element: T) {
        let index = this.indexOf(element);
        return this.removeAt(index);
    }

    get size() {
        return this.count;
    }

    isEmpty() {
        return this.size === 0;
    }

    getHead() {
        return this.head;
    }

    toString() {
        if (this.head === undefined) {
            return '';
        }
        let objString = '' + this.head.element,
            current = this.head.next;

        while(current !== undefined) {
            objString += ',' + current!.element;
            current = current!.next
        }

        return objString;
    }

    clear() {
        this.head = undefined;
        this.count = 0;
    }
}