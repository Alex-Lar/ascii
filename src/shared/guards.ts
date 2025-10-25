export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

export function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && (value as unknown[])?.every(el => isString(el));
}

export function isNonEmptyStringArray(value: unknown): value is string[] {
    return isStringArray(value) && (value as unknown[])?.length > 0;
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

export function isNumberArray(value: unknown): value is number[] {
    return Array.isArray(value) && (value as unknown[])?.every(el => isNumber(el));
}

export function isNonEmptyNumberArray(value: unknown): value is number[] {
    return isNumberArray(value) && (value as unknown[])?.length > 0;
}

export function isNonEmptyStringOrNumberArray(value: unknown): value is (number | string)[] {
    return Array.isArray(value) && (value as unknown[])?.every(el => isNumber(el) || isString(el));
}
