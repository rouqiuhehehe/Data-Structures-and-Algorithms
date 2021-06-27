export class ValuePair<K, V> {
    public constructor(public key: K, public value: V) {}

    public toString() {
        return `{${this.key}:${this.value}}`;
    }
}

export class ValuePairLazy<K, V> extends ValuePair<K, V> {
    public constructor(public key: K, public value: V, public isDelete = false) {
        super(key, value);
    }
}
