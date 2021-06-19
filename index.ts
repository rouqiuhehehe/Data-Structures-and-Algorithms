import LinkedList from './src/链表';
import DoubleLinkedLike from './src/双向链表';

const linkedlist = new LinkedList();
linkedlist.push(11);
linkedlist.push(20);
linkedlist.push(30);

linkedlist.insert(99, 3);

linkedlist.push({
    a:1,
    b: () => 12
});

console.log(linkedlist.getElementAt(4));

console.log(linkedlist.toString());
console.log(linkedlist.size);

const doubleLinkedLike = new DoubleLinkedLike();
doubleLinkedLike.push(1);
doubleLinkedLike.push(20);
doubleLinkedLike.push(5);
doubleLinkedLike.insert(35, 1);

console.log(doubleLinkedLike.inverseToString());
