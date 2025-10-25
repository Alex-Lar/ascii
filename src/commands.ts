import {
    controlCharsRange,
    digitsCharsRange,
    escapeCharsCodes,
    lowercaseCharsRange,
    printableCharsRange,
    tableMax,
    tableMin,
    uppercaseCharsRange,
} from './core/ascii/constants';
import {
    getAllRows,
    getRowByChar,
    getRowByCode,
    getRowRange,
    getRowsByDesc,
} from './core/ascii/utils';
import { print } from './core/print/print';
import { getStyleColors } from './core/style';
import {
    CharOptions,
    DecOptions,
    DescOptions,
    PrintFormat,
    RangeOptions,
    RootOptions,
    SharedOptions,
} from './shared/types';

function defineOutputFormat(
    options: Pick<SharedOptions, 'json' | 'csv' | 'markdown'>
): PrintFormat {
    const { csv, json, markdown } = options;

    if (json) return 'json';
    if (csv) return 'csv';
    if (markdown) return 'markdown';
    return 'table';
}

export function rootCommand(options: RootOptions) {
    const { escape, control, printable, digits, uppercase, lowercase } = options;

    let rows: string[][] = [];

    if (escape) {
        const escCharsRows = escapeCharsCodes
            .map(code => getRowByCode(code))
            .filter(row => row !== undefined);

        rows.push(...escCharsRows);
    }
    if (control) {
        const range = getRowRange(controlCharsRange.low, controlCharsRange.high);
        if (range !== undefined) rows.push(...range);
    }
    if (printable) {
        const range = getRowRange(printableCharsRange.low, printableCharsRange.high);
        if (range !== undefined) rows.push(...range);
    }
    if (digits) {
        const range = getRowRange(digitsCharsRange.low, digitsCharsRange.high);
        if (range !== undefined) rows.push(...range);
    }
    if (uppercase) {
        const range = getRowRange(uppercaseCharsRange.low, uppercaseCharsRange.high);
        if (range !== undefined) rows.push(...range);
    }
    if (lowercase) {
        const range = getRowRange(lowercaseCharsRange.low, lowercaseCharsRange.high);
        if (range !== undefined) rows.push(...range);
    }

    if (rows.length === 0) rows = getAllRows();

    const styles = getStyleColors(options);
    const format = defineOutputFormat(options);

    print(rows, {
        styles,
        noBorder: options.noBorder,
        allowSort: !options.noSort,
        reverseSort: options.reverse,
        output: options.output,
        format,
    });
}

export function rangeCommand(
    from: string | number | undefined,
    to: string | number | undefined,
    options: RangeOptions
) {
    const rows = getRowRange(from ?? tableMin, to ?? tableMax);

    if (rows === undefined || rows?.length === 0) return undefined;

    const styles = getStyleColors(options);
    const format = defineOutputFormat(options);

    print(rows, {
        styles,
        noBorder: options.noBorder,
        allowSort: !options.noSort,
        reverseSort: options.reverse,
        output: options.output,
        format,
    });
}

export function codeCommand(codes: number[], options: DecOptions) {
    const rows = codes.map(code => getRowByCode(code)).filter(row => row !== undefined);

    if (rows === undefined || rows.length === 0) return undefined;

    const styles = getStyleColors(options);
    const format = defineOutputFormat(options);

    print(rows, {
        styles,
        noBorder: options.noBorder,
        allowSort: !options.noSort,
        reverseSort: options.reverse,
        output: options.output,
        format,
    });
}

export function charCommand(chars: string[], options: CharOptions) {
    const rows = chars.map(char => getRowByChar(char)).filter(row => row !== undefined);

    if (rows.length === 0) return undefined;

    const styles = getStyleColors(options);
    const format = defineOutputFormat(options);

    print(rows, {
        styles,
        noBorder: options.noBorder,
        allowSort: !options.noSort,
        reverseSort: options.reverse,
        output: options.output,
        format,
    });
}

export function descCommand(substring: string, options: DescOptions) {
    const rows = getRowsByDesc(substring);

    if (rows === undefined || rows?.length === 0) return undefined;

    const styles = getStyleColors(options);
    const format = defineOutputFormat(options);

    print(rows, {
        styles,
        format,
        noBorder: options.noBorder,
        allowSort: !options.noSort,
        reverseSort: options.reverse,
        output: options.output,
    });
}
