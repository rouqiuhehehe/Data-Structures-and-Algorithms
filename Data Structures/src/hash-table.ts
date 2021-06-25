import HashTableCon, { DataObject } from '../models/hash-table';
import { ValuePair } from '../models/value-pair';
import { DefaultToString, defaultToString } from '../util';

// 处理不了同key问题
export default class HashTable<K, V> extends HashTableCon<K, V, ValuePair<K, V>> {
    public constructor(dataArray?: DataObject<K, V>[], protected toStrFn: DefaultToString = defaultToString) {
        super(dataArray, toStrFn);
        if (dataArray) {
            for (const item of dataArray) {
                const { key, value } = item;
                this.put(key, value);
            }
        }
    }

    public put(key: K, value: V) {
        const position = this.hashCode(key);
        this.items[position] = new ValuePair(key, value);
    }

    public remove(key: K) {
        const position = this.hashCode(key);
        const valuePair = this.items[position];

        if (valuePair) {
            Reflect.deleteProperty(this.items, position);
            return true;
        }
        return false;
    }

    public get(key: K) {
        const item = this.items[this.hashCode(key)];
        return item ? item.value : undefined;
    }

    public toString() {
        if (this.size === 0) {
            return '';
        }

        let objString = '';
        const keys = Object.keys(this.items);

        for (const key of keys) {
            objString += `,${key} => ${this.items[key].toString()}`;
        }

        return objString.slice(1);
    }
}
