export type DefaultEquals<T> = (a: T, B: T) => boolean;

export type DefaultToString = (item: any) => string;

export type DefaultCompare<T> = (a: T, b: T) => number;

export function defaultEquals<T>(a: T, b: T): boolean {
    return a === b;
}

export enum Compare {
    LESS_THAN = -1,
    BIGGER_THAN = 1,
    EQUALS = 0
}

export const enum ToString {
    NULL = 'NULL',
    UNDEFINED = 'UNDEFINED'
}

export function defaultCompare<T>(a: T, b: T): number {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export function defaultToString(item: any): string {
    if (item === null) {
        return ToString.NULL;
    } else if (item === undefined) {
        return ToString.UNDEFINED;
    } else {
        return item.toString();
    }
}
