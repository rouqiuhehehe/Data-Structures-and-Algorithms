import { DoubleNode } from '../models/linked-list-models';
import { defaultEquals, DefaultEquals } from '../util';
import LinkedList from './链表';

export default class DoubleLinkedLike<T> extends LinkedList<T> {
    protected head?: DoubleNode<T>;
    protected footer?: DoubleNode<T>;

    public constructor(protected equalsFn: DefaultEquals<T> = defaultEquals) {
        super(equalsFn);
    }

    public push(element: T) {
        const node = new DoubleNode(element);
        if (this.size === 0) {
            this.head = node;
            this.footer = node;
        } else {
            this.footer!.next = node;
            node.prev = this.footer;
            this.footer = node;
        }
        this.count++;
    }

    public insert(element: T, index: number) {
        if (index >= 0 && index <= this.size) {
            const node = new DoubleNode(element);
            if (index === 0) {
                // 链表为空
                if (this.size === 0) {
                    this.push(element);
                } else {
                    node.next = this.head;
                    this.head!.prev = node;
                    this.head = node;
                    this.count++;
                }
            } else if (index === this.size) {
                this.push(element);
            } else {
                // 获取上一个元素
                const previous = this.getElementAt(index - 1) as DoubleNode<T>;

                node.next = previous!.next;
                node.prev = previous;
                previous!.next!.prev = node;
                previous.next = node;

                this.count++;
            }
            return true;
        }
        return false;
    }

    public removeAt(index: number) {
        let current = this.head;
        if (index >= 0 && index < this.size) {
            if (index === 0) {
                if (this.size === 1) {
                    this.head = undefined;
                    this.footer = undefined;
                } else {
                    this.head = this.head!.next;
                    this.head!.prev = undefined;
                }
            } else if (index === this.size - 1) {
                current = this.footer;
                this.footer = this.footer!.prev;
                this.footer!.next = undefined;
            } else {
                // 要删除的元素
                current = this.getElementAt(index) as DoubleNode<T>;

                current.prev!.next = current.next;
                current.next!.prev = current.prev;
            }

            this.count--;
            return current!.element;
        }
        return undefined;
    }

    public getFooter() {
        return this.footer;
    }

    public clear() {
        super.clear();
        this.footer = undefined;
    }

    public inverseToString() {
        if (this.footer === undefined) {
            return '';
        }

        let objString = '' + this.footer.element;
        let previous = this.footer.prev;

        while (previous !== undefined) {
            objString += ',' + previous.element;
            previous = previous.prev;
        }

        return objString;
    }
}
