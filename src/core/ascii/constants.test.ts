import { describe, test, expect } from 'vitest';
import {
    controlCharsRange,
    printableCharsRange,
    digitsCharsRange,
    uppercaseCharsRange,
    lowercaseCharsRange,
    escapeCharsCodes,
    tableMin,
    tableMax,
} from './constants';

describe('Constants validation', () => {
    describe('Range validations', () => {
        test('all ranges should have low <= high', () => {
            const ranges = [
                controlCharsRange,
                printableCharsRange,
                digitsCharsRange,
                uppercaseCharsRange,
                lowercaseCharsRange,
            ];

            ranges.forEach(range => {
                expect(range.low).toBeLessThanOrEqual(range.high);
            });
        });

        test('control chars range should match ASCII standard', () => {
            expect(controlCharsRange.low).toBe(0);
            expect(controlCharsRange.high).toBe(31);
        });

        test('printable chars range should match ASCII standard', () => {
            expect(printableCharsRange.low).toBe(32);
            expect(printableCharsRange.high).toBe(127);
        });

        test('digits range should match ASCII standard', () => {
            expect(digitsCharsRange.low).toBe(48);
            expect(digitsCharsRange.high).toBe(57);
        });

        test('uppercase letters range should match ASCII standard', () => {
            expect(uppercaseCharsRange.low).toBe(65);
            expect(uppercaseCharsRange.high).toBe(90);
        });

        test('lowercase letters range should match ASCII standard', () => {
            expect(lowercaseCharsRange.low).toBe(97);
            expect(lowercaseCharsRange.high).toBe(122);
        });
    });

    describe('Escape characters validation', () => {
        test('escapeCharsCodes should contain valid control characters', () => {
            expect(escapeCharsCodes).toBeInstanceOf(Array);
            expect(escapeCharsCodes.length).toBeGreaterThan(0);
            expect(escapeCharsCodes).toEqual([0, 7, 8, 9, 10, 11, 12, 13, 27, 92]);
        });

        test('escapeCharsCodes should not contain duplicates', () => {
            const uniqueCodes = new Set(escapeCharsCodes);
            expect(uniqueCodes.size).toBe(escapeCharsCodes.length);
        });
    });

    describe('Table boundaries validation', () => {
        test('tableMin and tableMax should define valid range', () => {
            expect(tableMin).toBe(0);
            expect(tableMax).toBe(127);
        });

        test('all character ranges should be within table boundaries', () => {
            const ranges = [
                controlCharsRange,
                printableCharsRange,
                digitsCharsRange,
                uppercaseCharsRange,
                lowercaseCharsRange,
            ];

            ranges.forEach(range => {
                expect(range.low).toBeGreaterThanOrEqual(tableMin);
                expect(range.high).toBeLessThanOrEqual(tableMax);
            });

            escapeCharsCodes.forEach(code => {
                expect(code).toBeGreaterThanOrEqual(tableMin);
                expect(code).toBeLessThanOrEqual(tableMax);
            });
        });
    });

    describe('Range relationships', () => {
        test('digits should be within printable range', () => {
            expect(digitsCharsRange.low).toBeGreaterThanOrEqual(printableCharsRange.low);
            expect(digitsCharsRange.high).toBeLessThanOrEqual(printableCharsRange.high);
        });

        test('letters should be within printable range', () => {
            expect(uppercaseCharsRange.low).toBeGreaterThanOrEqual(printableCharsRange.low);
            expect(uppercaseCharsRange.high).toBeLessThanOrEqual(printableCharsRange.high);
            expect(lowercaseCharsRange.low).toBeGreaterThanOrEqual(printableCharsRange.low);
            expect(lowercaseCharsRange.high).toBeLessThanOrEqual(printableCharsRange.high);
        });

        test('control chars and printable chars should not overlap', () => {
            expect(controlCharsRange.high).toBeLessThan(printableCharsRange.low);
        });
    });
});
