import { PrintOptions } from '../../shared/types';
import { printCsv } from './printCsv';
import { printJson } from './printJson';
import { printMarkdown } from './printMarkdown';
import { printTable } from './printTable';

export function print(rows: string[][], options: PrintOptions) {
    switch (options.format) {
        case 'json':
            printJson(rows, options);
            break;
        case 'csv':
            printCsv(rows, options);
            break;
        case 'markdown':
            printMarkdown(rows, options);
            break;
        default:
            printTable(rows, options);
    }
}
