import 'reflect-metadata';

@Reflect.metadata('name', 'MySet')
class MySet<T> {
    public [Symbol.toStringTag] = 'MySet';

    private items: T[] = [];

    public constructor(iterator: Iterable<T> = []) {
        if (typeof iterator[Symbol.iterator] !== 'function') {
            throw new TypeError(iterator + ' is not a iterator');
        }

        for (const item of iterator) {
            this.add(item);
        }
    }

    public add(element: T) {
        if (!this.has(element)) {
            this.items.push(element);
        }
    }

    public has(element: T): element is T {
        return this.items.indexOf(element) !== -1;
    }

    public delete(element: T) {
        const index = this.items.indexOf(element);
        if (index === -1) return false;

        this.items.splice(index, 1);
        return true;
    }

    public clear() {
        this.items = [];
    }

    public get size() {
        return this.items.length;
    }

    public values() {
        return this.items;
    }

    public keys() {
        return this.values();
    }

    public forEach(fn: (v: T, i: T, self: T[]) => void) {
        if (typeof fn !== 'function') {
            throw new TypeError(fn + ' is not a function');
        }

        for (const item of this.items) {
            fn(item, item, this.items);
        }
    }

    public *[Symbol.iterator]() {
        for (const item of this.items) {
            yield item;
        }
    }

    @Reflect.metadata('name', 'MySet')
    public toString() {
        return this.items.toString();
    }

    // 交集
    public union<U extends T>(other: MySet<U> | Iterable<U>) {
        const _items = this.getItems<U>(other);

        return [...new MySet([...this.items, ..._items])];
    }

    // 并集
    public intersection<U extends T>(other: MySet<U> | Iterable<U>) {
        const _items = this.getItems<U>(other);
        const newArr: T[] = [];
        const bigger = _items.length > this.items.length ? _items : this.items;
        const smaller = _items.length <= this.items.length ? _items : this.items;

        for (const item of smaller) {
            if (bigger.indexOf(item) !== -1) {
                newArr.push(item);
            }
        }

        return newArr;
    }

    // 差集
    public difference<U extends T>(other: MySet<U> | Iterable<U>) {
        const _items = this.getItems<U>(other);
        const newArr: T[] = [];

        _items.forEach((v) => {
            if (this.items.indexOf(v) === -1) {
                newArr.push(v);
            }
        });

        return newArr;
    }

    // 子集
    public isSubsetOf<U extends T>(other: MySet<U> | Iterable<U>) {
        const _items = this.getItems<U>(other);
        if (this.size > _items.length) {
            return false;
        }

        return _items.every((v) => this.items.indexOf(v) !== -1);
    }

    private getItems<U>(other: MySet<U> | Iterable<U>) {
        let _items: U[];
        if (other instanceof MySet) {
            _items = other.values();
        } else {
            _items = new MySet(other).values();
        }

        return _items;
    }
}

export default MySet;
