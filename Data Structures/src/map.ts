interface ItemsObj<T, U> {
    key: T;
    value: U;
}

export default class MyMap<T, U> {
    private items: ItemsObj<T, U>[] = [];

    public constructor(iterator?: [T, U][]) {
        if (iterator) {
            if (typeof iterator[Symbol.iterator] !== 'function') {
                throw new TypeError(`${typeof iterator} ${iterator} is not iterator`);
            } else if (!(iterator instanceof Array)) {
                throw new TypeError('Iterator value d is not an entry object');
            } else {
                for (const item of iterator) {
                    if (typeof item[Symbol.iterator] !== 'function') {
                        throw new TypeError(`${typeof iterator} ${iterator} is not iterator`);
                    } else if (!(item instanceof Array)) {
                        throw new TypeError('Iterator value d is not an entry object');
                    } else {
                        const itemIteratorFn = item[Symbol.iterator]();
                        const key = itemIteratorFn.next().value;
                        const value = itemIteratorFn.next().value;
                    }
                }
            }
        }
    }
}
