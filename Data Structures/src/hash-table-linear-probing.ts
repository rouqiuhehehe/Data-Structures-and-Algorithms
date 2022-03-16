import HashTableCon, { DataObject } from '../models/hash-table';
import { ValuePair } from '../models/value-pair';
import { DefaultToString, defaultToString } from '../util';

export default class HashTableLinearProbing<K, V> extends HashTableCon<K, V, ValuePair<K, V>> {
    public constructor(dataArray?: DataObject<K, V>[], protected toStrFn: DefaultToString = defaultToString) {
        super(dataArray, toStrFn);
    }

    public put(key: K, value: V) {
        const position = this.hashCode(key);
        const valuePair = new ValuePair(key, value);

        if (this.items[position] === undefined) {
            this.items[position] = valuePair;
        } else {
            let index = +position + 1;

            while (this.items[index.toString()] !== undefined) {
                index++;
            }

            this.items[index.toString()] = valuePair;
        }
    }

    public get(key: K) {
        const position = this.hashCode(key);

        if (this.items[position] !== undefined) {
            if (this.items[position].key === key) {
                return this.items[position].value;
            }

            let index = +position + 1;

            while (this.items[index.toString()] !== undefined || this.items[index.toString()].key !== key) {
                index++;
            }

            if (this.items[index.toString()].key === key) {
                return this.items[index.toString()].value;
            }
        }

        return undefined;
    }

    public remove(key: K) {
        const position = this.hashCode(key);

        if (this.items[position] !== undefined) {
            if (this.items[position].key === key) {
                Reflect.deleteProperty(this.items, position);
                this.verifyRemoveSideEffect(position, +position);
                return true;
            }

            let index = +position + 1;
            while (this.items[index.toString()] !== undefined || this.items[index.toString()].key !== key) {
                index++;
            }

            if (this.items[index].key === key) {
                Reflect.deleteProperty(this.items, index.toString());
                this.verifyRemoveSideEffect(position, index);
                return true;
            }
        }

        return false;
    }

    // 线性处理空位置，从removeCode开始整体移动
    private verifyRemoveSideEffect(hashCode: string, removeCode: number) {
        let index = removeCode + 1;
        let removeCodePosition = removeCode;

        while (this.items[index.toString()] !== undefined) {
            const posCode = this.hashCode(this.items[index.toString()].key);

            if (posCode === hashCode || +posCode <= removeCodePosition) {
                // 如果删除的元素哈希和原哈希相等，或者小于等于删除的下标，就往removeCode位置塞
                this.items[removeCodePosition.toString()] = this.items[index.toString()];
                Reflect.deleteProperty(this.items, index.toString());

                removeCodePosition = index;
            }
            index++;
        }
    }
}
