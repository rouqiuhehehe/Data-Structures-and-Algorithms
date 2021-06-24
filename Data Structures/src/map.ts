interface ItemsObj<T, U> {
    key: T;
    value: U;
}

export default class MyMap<T, U> {
    private items: ItemsObj<T, U>[] = [];

    public [Symbol.toStringTag] = 'MyMap';

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
                        this.set(key, value);
                    }
                }
            }
        }
    }

    public get size() {
        return this.items.length;
    }

    public set(key: T, value: U) {
        const item = this.get(key);
        if (item) {
            item.value = value;
        } else {
            this.items.push({
                key,
                value
            });
        }
    }

    public get(key: T) {
        for (const item of this.items) {
            if (this.isEquals(item.key, key)) {
                return item;
            }
        }
        return undefined;
    }

    public delete(key: T) {
        let i = 0;
        for (; i < this.size; i++) {
            if (this.isEquals(this.items[i].key, key)) {
                break;
            }
        }

        if (i === this.size) {
            return false;
        } else {
            this.items.splice(i, 1);
            return true;
        }
    }

    public has(key: T) {
        for (const item of this.items) {
            if (this.isEquals(item.key, key)) {
                return true;
            }
        }
        return false;
    }

    public entries() {
        return this.items;
    }

    public clear() {
        this.items = [];
    }

    public keys() {
        const keysArr: T[] = [];

        for (const item of this.items) {
            keysArr.push(item.key);
        }

        return keysArr;
    }

    public values() {
        const valuesArr: U[] = [];

        for (const item of this.items) {
            valuesArr.push(item.value);
        }

        return valuesArr;
    }

    public forEach(fn: (v?: U, i?: T, self?: MyMap<T, U>) => void, thisArg: unknown = null) {
        if (typeof fn !== 'function') {
            throw new TypeError(fn + ' is not a function');
        }
        for (const item of this.items) {
            fn.call(thisArg, item.value, item.key, this);
        }
    }

    public *[Symbol.iterator]() {
        for (const item of this.items) {
            yield [item.key, item.value];
        }
    }

    private isEquals(key1: T, key2: T) {
        if (typeof key1 === 'number' && key1 === 0 && typeof key2 === 'number' && key2 === 0) {
            return true;
        }
        return Object.is(key1, key2);
    }
}
