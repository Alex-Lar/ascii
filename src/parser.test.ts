import { describe, test, expect, vi } from 'vitest';
import { parseAndValidateRangeArg, parseCode, parseAndValidateCodeArgs } from './parser';
import { isNonEmptyStringOrNumberArray } from './shared/guards';

vi.mock('./shared/guards', () => ({
    isNonEmptyStringOrNumberArray: vi.fn(),
}));

describe('parseRangeInput', () => {
    test('should return number when input is number', () => {
        expect(parseAndValidateRangeArg(42)).toBe(42);
        expect(parseAndValidateRangeArg(0)).toBe(0);
        expect(parseAndValidateRangeArg(-10)).toBe(-10);
    });

    test('should return undefined for non-string non-number input', () => {
        expect(() => parseAndValidateRangeArg(null)).toThrow(
            'Invalid code argument: expected ASCII character or code, got object'
        );
        expect(() => parseAndValidateRangeArg(undefined)).toThrow(
            'Invalid code argument: expected ASCII character or code, got undefined'
        );
        expect(() => parseAndValidateRangeArg({})).toThrow(
            'Invalid code argument: expected ASCII character or code, got object'
        );
        expect(() => parseAndValidateRangeArg([])).toThrow(
            'Invalid code argument: expected ASCII character or code, got object'
        );
        expect(() => parseAndValidateRangeArg(true)).toThrow(
            'Invalid code argument: expected ASCII character or code, got boolean'
        );
    });

    test('should parse character prefix with digit value', () => {
        expect(parseAndValidateRangeArg('c:5')).toBe(53);
        expect(parseAndValidateRangeArg('ch:3')).toBe(51);
        expect(parseAndValidateRangeArg('char:9')).toBe(57);
        expect(parseAndValidateRangeArg('C:0')).toBe(48);
        expect(parseAndValidateRangeArg('CHAR:7')).toBe(55);
    });

    test('should throw error for empty character prefix value', () => {
        expect(() => parseAndValidateRangeArg('c:')).toThrow(
            'Character prefix requires a value. Usage: c:<character> or char:<character>'
        );
        expect(() => parseAndValidateRangeArg('ch: ')).toThrow(
            'Character prefix requires a value. Usage: c:<character> or char:<character>'
        );
        expect(() => parseAndValidateRangeArg('char:')).toThrow(
            'Character prefix requires a value. Usage: c:<character> or char:<character>'
        );
    });

    test('should return string for character prefix with non-digit value', () => {
        expect(parseAndValidateRangeArg('c:A')).toBe('A');
        expect(parseAndValidateRangeArg('ch:hello')).toBe('hello');
    });

    test('should parse numeric string to number', () => {
        expect(parseAndValidateRangeArg('123')).toBe(123);
        expect(parseAndValidateRangeArg('0')).toBe(0);
        expect(parseAndValidateRangeArg('-45')).toBe(-45);
        expect(parseAndValidateRangeArg('3.14')).toBe(3.14);
    });

    test('should return string for non-numeric input', () => {
        expect(parseAndValidateRangeArg('hello')).toBe('hello');
        expect(parseAndValidateRangeArg('A')).toBe('A');
        expect(parseAndValidateRangeArg('')).toBe('');
    });

    test('should handle character prefix with numeric-like strings', () => {
        expect(parseAndValidateRangeArg('c:10')).toBe('10');
        expect(parseAndValidateRangeArg('ch:123')).toBe('123');
        expect(parseAndValidateRangeArg('char:1.5')).toBe('1.5');
    });
});

describe('parseCode', () => {
    test('should return number when input is valid ascii code', () => {
        expect(parseCode(65)).toBe(65);
        expect(parseCode(0)).toBe(0);
        expect(parseCode(5)).toBe(5);
        expect(parseCode(127)).toBe(127);
    });

    test('should throw when input is not valid ascii code', () => {
        expect(() => parseCode(-65)).toThrow(
            `Code out of range: "-65". Expected number between 0 and 127`
        );
        expect(() => parseCode(128)).toThrow(
            `Code out of range: "128". Expected number between 0 and 127`
        );
    });

    test('should throw error for non-string non-number input', () => {
        expect(() => parseCode(null)).toThrow(
            'Invalid code argument: expected number or numeric string, got object'
        );
        expect(() => parseCode(undefined)).toThrow(
            'Invalid code argument: expected number or numeric string, got undefined'
        );
        expect(() => parseCode({})).toThrow(
            'Invalid code argument: expected number or numeric string, got object'
        );
        expect(() => parseCode([])).toThrow(
            'Invalid code argument: expected number or numeric string, got object'
        );
        expect(() => parseCode(true)).toThrow(
            'Invalid code argument: expected number or numeric string, got boolean'
        );
    });

    test('should parse numeric string which is a valid ascii code to number', () => {
        expect(parseCode('65')).toBe(65);
        expect(parseCode('0')).toBe(0);
        expect(parseCode('10')).toBe(10);
        expect(parseCode('127')).toBe(127);
    });

    test('should throw when input is numeric string which is not a valid ascii code', () => {
        expect(() => parseCode('-65')).toThrow(
            'Code out of range: "-65". Expected number between 0 and 127'
        );
        expect(() => parseCode('128')).toThrow(
            'Code out of range: "128". Expected number between 0 and 127'
        );
    });

    test('should throw error for non-numeric string', () => {
        expect(() => parseCode('hello')).toThrow(
            'Invalid number: "hello". Expected decimal number or prefix (0b, 0o, 0x) for other bases'
        );
        expect(() => parseCode('A')).toThrow(
            'Invalid number: "A". Expected decimal number or prefix (0b, 0o, 0x) for other bases'
        );
        expect(() => parseCode('')).toThrow(
            'Invalid number: "". Expected decimal number or prefix (0b, 0o, 0x) for other bases'
        );
    });

    test('should parse string representations of numbers', () => {
        // Bin
        expect(parseCode('0b1000001')).toBe(65);
        // Oct
        expect(parseCode('0o101')).toBe(65);
        // Dec
        expect(parseCode('65')).toBe(65);
        expect(parseCode('065')).toBe(65);
        // Hex
        expect(parseCode('0x41')).toBe(65);
    });
});

describe('parseCodeInput', () => {
    test('should parse array of numbers and numeric strings', () => {
        vi.mocked(isNonEmptyStringOrNumberArray).mockReturnValue(true);

        expect(parseAndValidateCodeArgs([65, '66', 67])).toEqual([65, 66, 67]);
        expect(parseAndValidateCodeArgs(['0', '100', '5'])).toEqual([0, 100, 5]);
        expect(parseAndValidateCodeArgs(['0b1010', '0100', '0o10'])).toEqual([10, 100, 8]);
    });

    test('should throw error for invalid input array', () => {
        vi.mocked(isNonEmptyStringOrNumberArray).mockReturnValue(false);

        expect(() => parseAndValidateCodeArgs([])).toThrow(
            'Invalid code arguments: expected non-empty array of numbers or strings, got []'
        );
        expect(() => parseAndValidateCodeArgs([null, undefined])).toThrow(
            'Invalid code arguments: expected non-empty array of numbers or strings, got [null,null]'
        );
        expect(() => parseAndValidateCodeArgs(['hello', 'world'])).toThrow(
            'Invalid code arguments: expected non-empty array of numbers or strings, got ["hello","world"]'
        );
    });

    test('should throw error when individual elements cannot be parsed', () => {
        vi.mocked(isNonEmptyStringOrNumberArray).mockReturnValue(true);

        expect(() => parseAndValidateCodeArgs([65, 'abc', 67])).toThrow(
            'Failed to parse code arguments: Invalid number: "abc". Expected decimal number or prefix (0b, 0o, 0x) for other bases'
        );
    });

    test('should handle mixed valid and invalid inputs with proper error', () => {
        vi.mocked(isNonEmptyStringOrNumberArray).mockReturnValue(true);

        expect(() => parseAndValidateCodeArgs([65, 'invalid', 67, 'also-invalid'])).toThrow(
            'Failed to parse code arguments: Invalid number: "invalid". Expected decimal number or prefix (0b, 0o, 0x) for other bases'
        );
    });

    test('should handle empty array with proper error message', () => {
        vi.mocked(isNonEmptyStringOrNumberArray).mockReturnValue(false);

        expect(() => parseAndValidateCodeArgs([])).toThrow(
            'Invalid code arguments: expected non-empty array of numbers or strings, got []'
        );
    });

    test('should handle complex invalid arrays', () => {
        vi.mocked(isNonEmptyStringOrNumberArray).mockReturnValue(false);

        const complexArray = [65, null, { key: 'value' }, [1, 2, 3]];
        expect(() => parseAndValidateCodeArgs(complexArray)).toThrow(
            'Invalid code arguments: expected non-empty array of numbers or strings, got [65,null,{"key":"value"},[1,2,3]]'
        );
    });
});
