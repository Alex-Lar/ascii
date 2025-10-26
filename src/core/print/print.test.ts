import { describe, test, expect, vi, beforeEach } from 'vitest';
import { print } from './print';
import { printJson } from './printJson';
import { printCsv } from './printCsv';
import { printMarkdown } from './printMarkdown';
import { printTable } from './printTable';
import type { PrintOptions } from '../../shared/types';

vi.mock('./printJson.ts', () => ({
    printJson: vi.fn(),
}));

vi.mock('./printCsv.ts', () => ({
    printCsv: vi.fn(),
}));

vi.mock('./printMarkdown.ts', () => ({
    printMarkdown: vi.fn(),
}));

vi.mock('./printTable.ts', () => ({
    printTable: vi.fn(),
}));

describe('print function', () => {
    const mockRows = [
        ['header1', 'header2'],
        ['value1', 'value2'],
    ];

    const baseOptions: PrintOptions = {
        format: 'table',
        styles: {} as any,
        noBorder: false,
        allowSort: false,
        reverseSort: false,
        output: undefined,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should call printJson when format is "json"', () => {
        const options: PrintOptions = { ...baseOptions, format: 'json' };

        print(mockRows, options);

        expect(printJson).toHaveBeenCalledOnce();
        expect(printJson).toHaveBeenCalledWith(mockRows, options);
        expect(printCsv).not.toHaveBeenCalled();
        expect(printMarkdown).not.toHaveBeenCalled();
        expect(printTable).not.toHaveBeenCalled();
    });

    test('should call printCsv when format is "csv"', () => {
        const options: PrintOptions = { ...baseOptions, format: 'csv' };

        print(mockRows, options);

        expect(printCsv).toHaveBeenCalledOnce();
        expect(printCsv).toHaveBeenCalledWith(mockRows, options);
        expect(printJson).not.toHaveBeenCalled();
        expect(printMarkdown).not.toHaveBeenCalled();
        expect(printTable).not.toHaveBeenCalled();
    });

    test('should call printMarkdown when format is "markdown"', () => {
        const options: PrintOptions = { ...baseOptions, format: 'markdown' };

        print(mockRows, options);

        expect(printMarkdown).toHaveBeenCalledOnce();
        expect(printMarkdown).toHaveBeenCalledWith(mockRows, options);
        expect(printJson).not.toHaveBeenCalled();
        expect(printCsv).not.toHaveBeenCalled();
        expect(printTable).not.toHaveBeenCalled();
    });

    test('should call printTable when format is "table"', () => {
        const options: PrintOptions = { ...baseOptions, format: 'table' };

        print(mockRows, options);

        expect(printTable).toHaveBeenCalledOnce();
        expect(printTable).toHaveBeenCalledWith(mockRows, options);
        expect(printJson).not.toHaveBeenCalled();
        expect(printCsv).not.toHaveBeenCalled();
        expect(printMarkdown).not.toHaveBeenCalled();
    });

    test('should call printTable as default for unknown format', () => {
        const options = { ...baseOptions, format: 'invalid' as any };

        print(mockRows, options);

        expect(printTable).toHaveBeenCalledOnce();
        expect(printTable).toHaveBeenCalledWith(mockRows, options);
        expect(printJson).not.toHaveBeenCalled();
        expect(printCsv).not.toHaveBeenCalled();
        expect(printMarkdown).not.toHaveBeenCalled();
    });
});
