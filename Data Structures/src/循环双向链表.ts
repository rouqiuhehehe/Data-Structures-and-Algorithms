import { DoubleNode } from '../models/linked-list-models';
import { defaultEquals, DefaultEquals } from '../util';
import DoubleLinkedList from './双向链表';

export default class DoubleCircularLinkedList<T> extends DoubleLinkedList<T> {
    public constructor(protected equalsFn: DefaultEquals<T> = defaultEquals) {
        super(equalsFn);
    }

    public push(element: T) {
        super.push(element);
        this.head!.prev = this.footer;
        this.footer!.next = this.head;
    }

    public insert(element: T, index: number) {
        const node = new DoubleNode(element);

        if (index >= 0 && index <= this.size) {
            if (index === 0) {
                if (this.head === undefined) {
                    this.push(element);
                } else {
                    node.next = this.head;
                    node.prev = this.footer;
                    this.head = node;
                    this.footer!.next = node;

                    this.count++;
                }
            } else {
                super.insert(element, index);
            }

            return true;
        }
        return false;
    }

    public removeAt(index: number) {
        if (index >= 0 && index < this.size) {
            if (index === 0) {
                if (this.size === 1) {
                    return super.removeAt(index);
                } else {
                    const result = super.removeAt(index);
                    this.head!.prev = this.footer;
                    this.footer!.next = this.head;
                    return result;
                }
            } else if (index === this.size - 1) {
                const result = super.removeAt(index);
                this.footer!.next = this.head;
                this.head!.prev = this.footer;
                return result;
            } else {
                return super.removeAt(index);
            }
        }
        return undefined;
    }
}
