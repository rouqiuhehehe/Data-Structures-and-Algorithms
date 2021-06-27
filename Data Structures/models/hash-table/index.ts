import { DefaultToString, defaultToString } from '../../util';
import { ValuePair } from '../value-pair';
export interface DataObject<K, V> {
    key: K;
    value: V;
}

export const enum HashNum {
    LOSELOSEDEFAULTHASHBASENUM = 37,
    DJB2DEFAULTHASHBASENUM = 5381,
    DJB2DEFAULTHASHMULTIPLYBASENUM = 33,
    DJB2DEFAULTHASHREMAINDERBASENUM = 1013
}

export default abstract class HashTableCon<K, V, T extends Object> {
    protected items: Record<string, T> = {};

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

    public hashCode(key: K) {
        return this.loseloseHashCode(key);
        // return this.djb2HashCode(key);
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

        return (hash % HashNum.LOSELOSEDEFAULTHASHBASENUM).toString();
    }

    private djb2HashCode(key: K) {
        const tableKey = this.toStrFn(key);
        let hash = HashNum.DJB2DEFAULTHASHBASENUM;

        for (let i = 0; i < tableKey.length; i++) {
            hash *= HashNum.DJB2DEFAULTHASHMULTIPLYBASENUM + tableKey.charCodeAt(i);
        }

        return (hash % HashNum.DJB2DEFAULTHASHREMAINDERBASENUM).toString();
    }
}
