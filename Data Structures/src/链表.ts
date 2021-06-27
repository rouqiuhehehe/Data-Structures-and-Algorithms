import { Node } from '../models/linked-list-models';
import { defaultEquals, DefaultEquals } from '../util';

// 链表： 每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（指针）组成，增删改查时不需要移动其他元素，但是想要访问其中一个元素，则需要从起点（表头）开始找
export default class LinkedList<T> {
    public static hibbo = 'dsc';

    protected count = 0; // 链表长度
    protected head?: Node<T>; // 链表首项

    public constructor(protected equalsFn: DefaultEquals<T> = defaultEquals) {}

    // 向链表末添加元素
    public push(element: T): void {
        const node = new Node(element);
        let current;

        if (this.head === undefined) {
            // 链表为空
            this.head = node;
        } else {
            current = this.head;

            while (current.next !== undefined) {
                current = current.next;
            }
            current.next = node;
        }

        this.count++;
    }

    // 下标找元素
    public getElementAt(index: number) {
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
    public removeAt(index: number) {
        if (index >= 0 && index < this.count) {
            const _index = Math.floor(index);
            const current = this.head;

            if (index === 0) {
                this.head = this.head?.next;
            } else {
                const previous = this.getElementAt(_index - 1);
                (previous as Node<T>).next = current?.next;
                this.count--;
                return current?.element;
            }
            this.count--;
            return current?.element;
        }

        return undefined;
    }

    // 下标插入
    public insert(element: T, index: number) {
        const node = new Node(element);

        if (index >= 0 && index <= this.count) {
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1) as Node<T>;
                const current = previous.next;
                node.next = current;
                previous.next = node;
                this.count++;

                return true;
            }
        }
        return false;
    }

    // 元素找下标
    public indexOf(element: T) {
        let current = this.head;

        for (let i = 0; i < this.count; i++) {
            if (this.equalsFn(element, this.getElementAt(i)!.element)) {
                return i;
            }
            current = current?.next;
        }

        return -1;
    }

    // 通过元素删除
    public remove(element: T) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    public get size() {
        return this.count;
    }

    public isEmpty() {
        return this.size === 0;
    }

    public getHead() {
        return this.head;
    }

    public toString() {
        if (this.head === undefined) {
            return '';
        }
        let objString = '' + this.head.element;
        let current = this.head.next;

        while (current !== undefined) {
            objString += ',' + current.element;
            current = current.next;
        }

        return `[${objString}]`;
    }

    public clear() {
        this.head = undefined;
        this.count = 0;
    }
}
