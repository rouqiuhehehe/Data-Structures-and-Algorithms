import MySet from './src/set';
import DoubleLinkedList from './src/双向链表';
import DoubleCircularLinkedList from './src/循环双向链表';
import DoubleSortedLinkedList from './src/有序双向链表';
import LinkedList from './src/链表';

/* tslint:disable:no-magic-numbers */
const linkedlist = new LinkedList();
linkedlist.push(11);
linkedlist.push(20);
linkedlist.push(30);

linkedlist.insert(99, 3);

linkedlist.push({
    a: 1,
    b: () => 12
});

// console.log(linkedlist.getElementAt(4));

// console.log(linkedlist.toString());
// console.log(linkedlist.size);

const doubleLinkedLike = new DoubleLinkedList();
doubleLinkedLike.push(1);
doubleLinkedLike.push(20);
doubleLinkedLike.push(5);
doubleLinkedLike.insert(35, 1);

// console.log(doubleLinkedLike.inverseToString());

const doubleCircularLinkedList = new DoubleCircularLinkedList();
doubleCircularLinkedList.push(10);
doubleCircularLinkedList.push(20);
doubleCircularLinkedList.insert(3, 0);
doubleCircularLinkedList.insert(5, 2);
doubleCircularLinkedList.removeAt(0);

// console.log(doubleCircularLinkedList);

const doubleSortedLinkedList = new DoubleSortedLinkedList();
doubleSortedLinkedList.push(10);
doubleSortedLinkedList.push(1);
doubleSortedLinkedList.insert(5);
doubleSortedLinkedList.removeAt(1);

console.log(doubleSortedLinkedList);

const set = new MySet([1, 3, 2, 5]);
console.log(set.isSubsetOf([3, 1, 5, 4]));

console.log(set instanceof MySet);
console.log(Reflect.getMetadata('name', set, 'toString'));

/* tslint:enable */
