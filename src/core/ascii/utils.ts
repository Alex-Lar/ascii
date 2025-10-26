import { isNumber, isString } from '../../shared/guards';
import { asciiTable, codeMap } from './ascii-table';

export function shouldNormalizeCase(code: number): boolean {
    const controlCharsRange = { low: 0, high: 31 };
    const spaceCharIndex = 32;
    const delCharIndex = 127;

    return (
        (code >= controlCharsRange.low && code <= controlCharsRange.high) ||
        code === spaceCharIndex ||
        code === delCharIndex
    );
}

export function isValidAsciiRow(row: unknown): row is [string, string] {
    return Array.isArray(row) && isValidAsciiChar(row[0]) && isString(row[1]);
}

export function isValidAsciiChar(char: unknown): char is string {
    return (
        typeof codeMap[char as string] === 'number' ||
        typeof codeMap[(char as string)?.toUpperCase()] === 'number'
    );
}

export function isValidAsciiCode(code: number): boolean {
    return typeof code === 'number' && code <= asciiTable.length - 1 && code >= 0;
}

export function getAllRows(): string[][] {
    return asciiTable;
}

export function getRowRange(from: string | number, to: string | number) {
    let startIndex = undefined;
    let endIndex = undefined;

    if (isString(from) && isString(to)) {
        if (!isValidAsciiChar(from) && !isValidAsciiChar(to)) return undefined;
        startIndex = getCode(from);
        endIndex = getCode(to);
    }

    if (isNumber(from) && isNumber(to)) {
        if (!isValidAsciiCode(from) && !isValidAsciiCode(to)) return undefined;
        startIndex = from;
        endIndex = to;
    }

    if (isString(from) && isNumber(to)) {
        if (!isValidAsciiChar(from) && !isValidAsciiCode(to)) return undefined;
        startIndex = getCode(from);
        endIndex = to;
    }

    if (isNumber(from) && isString(to)) {
        if (!isValidAsciiCode(from) && !isValidAsciiChar(to)) return undefined;
        startIndex = from;
        endIndex = getCode(to);
    }

    if (startIndex === undefined) startIndex = 0;
    if (endIndex === undefined) endIndex = asciiTable.length - 1;

    const rowRange: string[][] = [];
    for (let i = startIndex; i <= endIndex; i++) {
        const row = asciiTable[i];
        if (row === undefined || row.length === 0) continue;

        rowRange.push(row);
    }

    return rowRange;
}

export function getRowsByDesc(substring: string): string[][] {
    return getAllRows().filter(rows => rows[1]!.toLowerCase().includes(substring.toLowerCase()));
}

export function getRowByCode(code: number): string[] | undefined {
    const row = asciiTable[code];
    if (!row) return undefined;

    return row;
}

export function getRowByChar(char: string): string[] | undefined {
    const code = getCode(char);
    if (code === undefined || !isValidAsciiCode(code as number)) return undefined;

    const row = getRowByCode(code);
    if (!row) return undefined;

    return row;
}

export function getChar(code: number): string | undefined {
    const row = asciiTable[code];
    if (!row) return undefined;

    return row[0];
}

export function getCode(char: string): number | undefined {
    const code = codeMap[char] || codeMap[char.toUpperCase()];
    if (typeof code !== 'number') return undefined;

    return code;
}
