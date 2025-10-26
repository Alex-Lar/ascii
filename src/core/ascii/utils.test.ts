import { describe, expect, it } from 'vitest';
import {
    getChar,
    getCode,
    getRowByCode,
    getRowByChar,
    getRowRange,
    getRowsByDesc,
    getAllRows,
    isValidAsciiCode,
    isValidAsciiChar,
    shouldNormalizeCase,
} from './utils';

describe('ASCII Utility Functions', () => {
    const testCases = [
        { char: 'A', code: 65, description: 'Uppercase A' },
        { char: 'a', code: 97, description: 'Lowercase a' },
        { char: '0', code: 48, description: 'Number Zero' },
        { char: 'SPACE', code: 32, description: 'Space' },
        { char: 'LF', code: 10, description: 'Line Feed, New Line' },
        { char: 'DEL', code: 127, description: 'Delete' },
    ];

    describe('getCode()', () => {
        it('should return correct code for valid characters', () => {
            testCases.forEach(({ char, code }) => {
                expect(getCode(char)).toBe(code);
            });
        });

        it('should return undefined for invalid characters', () => {
            expect(getCode('invalid')).toBeUndefined();
        });
    });

    describe('getChar()', () => {
        it('should return correct character for valid codes', () => {
            testCases.forEach(({ char, code }) => {
                expect(getChar(code)).toBe(char);
            });
        });

        it('should return undefined for invalid codes', () => {
            expect(getChar(-1)).toBeUndefined();
            expect(getChar(128)).toBeUndefined();
        });
    });

    describe('getRowByCode()', () => {
        it('should return correct row for valid code', () => {
            const row = getRowByCode(65);
            expect(row).toEqual(['A', 'Uppercase A']);
        });

        it('should return undefined for invalid code', () => {
            expect(getRowByCode(-1)).toBeUndefined();
        });
    });

    describe('getRowByChar()', () => {
        it('should return correct row for valid char', () => {
            const row = getRowByChar('A');
            expect(row).toEqual(['A', 'Uppercase A']);
        });

        it('should return undefined for invalid char', () => {
            expect(getRowByChar('invalid')).toBeUndefined();
        });
    });

    describe('getAllRows()', () => {
        it('should return all rows', () => {
            const rows = getAllRows();
            expect(rows).toHaveLength(128);
            expect(rows[0]).toEqual(['NUL', '\\0, Null Character']);
            expect(rows[127]).toEqual(['DEL', 'Delete']);
        });
    });

    describe('getRowRange()', () => {
        it('should return correct range for number inputs', () => {
            const result = getRowRange(65, 67);

            expect(result).not.toBeUndefined();
            expect(result).toHaveLength(3);
            expect(result![0]![0]).toBe('A');
            expect(result![1]![0]).toBe('B');
            expect(result![2]![0]).toBe('C');
        });

        it('should return correct range for string inputs', () => {
            const result = getRowRange('A', 'C');

            expect(result).not.toBeUndefined();
            expect(result).toHaveLength(3);
            expect(result![0]![0]).toBe('A');
            expect(result![1]![0]).toBe('B');
            expect(result![2]![0]).toBe('C');
        });
    });

    describe('getRowsByDesc()', () => {
        it('should find rows by description', () => {
            const result = getRowsByDesc('uppercase');
            expect(result?.length).toBeGreaterThan(0);
            expect(result?.every(row => row[1]?.toLowerCase().includes('uppercase'))).toBe(true);
        });

        it('should return empty array for non-matching description', () => {
            const result = getRowsByDesc('nonexistent');
            expect(result).toEqual([]);
        });
    });

    describe('isValidAsciiCode()', () => {
        it('should validate ASCII codes', () => {
            expect(isValidAsciiCode(0)).toBe(true);
            expect(isValidAsciiCode(127)).toBe(true);
            expect(isValidAsciiCode(-1)).toBe(false);
            expect(isValidAsciiCode(128)).toBe(false);
        });
    });

    describe('isValidAsciiChar()', () => {
        it('should validate ASCII characters', () => {
            expect(isValidAsciiChar('A')).toBe(true);
            expect(isValidAsciiChar(' ')).toBe(false);
            expect(isValidAsciiChar('invalid')).toBe(false);
        });
    });

    describe('shouldNormalizeCase()', () => {
        it('should identify control characters', () => {
            expect(shouldNormalizeCase(0)).toBe(true); // NUL
            expect(shouldNormalizeCase(10)).toBe(true); // LF
            expect(shouldNormalizeCase(32)).toBe(true); // Space
            expect(shouldNormalizeCase(127)).toBe(true); // DEL
            expect(shouldNormalizeCase(65)).toBe(false); // 'A'
        });
    });
});
