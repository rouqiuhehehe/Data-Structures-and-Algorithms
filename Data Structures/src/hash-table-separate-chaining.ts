import HashTableCon, { DataObject } from '../models/hash-table';
import { ValuePair } from '../models/value-pair';
import { defaultToString } from '../util';
import LinkedList from './链表';

export default class HashTableSeparateChaining<K, V> extends HashTableCon<K, V, LinkedList<ValuePair<K, V>>> {
    protected items: Record<string, LinkedList<ValuePair<K, V>>> = {};

    public constructor(dataArray?: DataObject<K, V>[], protected toStrFn: typeof defaultToString = defaultToString) {
        super(dataArray, toStrFn);
    }

    public put(key: K, value: V) {
        const position = this.hashCode(key);
        if (!this.items[position]) {
            this.items[position] = new LinkedList(this.linkedListEquals);
        }
        this.items[position].push(new ValuePair(key, value));
    }

    public remove(key: K) {
        const item = this.items[this.hashCode(key)];
        if (item && item.remove({ key } as any)) {
            return true;
        }
        return false;
    }

    public get(key: K) {
        const item = this.items[this.hashCode(key)];
        if (item) {
            const index = item.indexOf({ key } as any);
            return index === -1 ? undefined : item.getElementAt(index)?.element.value;
        }
        return undefined;
    }

    public toString() {
        if (this.size === 0) {
            return '';
        }
        const keys = Object.keys(this.items);
        let objStr = `${keys[0]} => ${this.items[keys[0]].toString()}`;

        for (let i = 1; i < keys.length; i++) {
            objStr += `,\n${keys[i]} => ${this.items[keys[i]].toString()}`;
        }

        return objStr;
    }

    private linkedListEquals(a: DataObject<K, V>, b: DataObject<K, V>) {
        if (typeof a.key === 'number' && a.key === 0 && typeof b.key === 'number' && b.key === 0) {
            return true;
        }
        return Object.is(a.key, b.key);
    }
}
