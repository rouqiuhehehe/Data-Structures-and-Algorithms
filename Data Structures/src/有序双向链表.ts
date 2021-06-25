import DoubleLinkedList from '../src/双向链表';
import { Compare, defaultCompare, DefaultCompare, defaultEquals, DefaultEquals } from '../util';

export default class DoubleSortedLinkedList<T> extends DoubleLinkedList<T> {
    public constructor(
        protected equalsFn: DefaultEquals<T> = defaultEquals,
        protected compareFn: DefaultCompare<T> = defaultCompare
    ) {
        super(equalsFn);
    }

    public insert(element: T) {
        if (this.isEmpty()) {
            super.push(element);
            return true;
        }
        const position = this.getIndexNextSortedElement(element);

        return super.insert(element, position);
    }

    public push(element: T) {
        this.insert(element);
    }

    private getIndexNextSortedElement(element: T) {
        let current = this.head;
        let i = 0;

        while (i < this.size) {
            // 找到需要插入的下标，通过两边element对比
            const comp = this.compareFn(element, current!.element);
            if (comp === Compare.LESS_THAN) {
                return i;
            }
            current = current?.next;
            i++;
        }

        return i;
    }
}
