import { DefaultToString, defaultToString } from '../../util';
export interface DataObject<K, V> {
    key: K;
    value: V;
}

export default abstract class HashTableCon<K, V, T> {
    protected items: Record<string, T> = {};

    private readonly DEFAULTHASHBASENUM = 37;

    protected constructor(dataArray?: DataObject<K, V>[], protected toStrFn: DefaultToString = defaultToString) {
        if (dataArray) {
            for (const item of dataArray) {
                const { key, value } = item;
                this.put(key, value);
            }
        }
    }

    public abstract put(key: K, value: V): void;

    public abstract remove(key: K): boolean;

    public abstract get(key: K): V | undefined;

    public abstract toString(): string;

    public hashCode(key: K) {
        return this.loseloseHashCode(key);
    }

    public getTable() {
        return this.items;
    }

    public get size() {
        return Object.keys(this.items).length;
    }

    public clear() {
        this.items = {};
    }

    private loseloseHashCode(key: K) {
        if (typeof key === 'number') {
            return key.toString();
        }
        let hash = 0;
        const tableKey = this.toStrFn(key);

        for (const item of tableKey) {
            hash += item.charCodeAt(0);
        }

        return (hash % this.DEFAULTHASHBASENUM).toString();
    }
}
