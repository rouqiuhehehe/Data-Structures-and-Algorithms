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

    public has(element: T) {
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

    public forEach(fn: (v?: T, i?: T, self?: T[]) => void) {
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

    public toString() {
        return this.items.toString();
    }
}

export default MySet;
