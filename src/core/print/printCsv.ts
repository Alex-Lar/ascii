import { writeFileSync } from 'node:fs';
import { PrintOptions } from '../../shared/types';
import { getCode, isValidAsciiRow } from '../ascii/utils';

type TableRowArray = [string, string, number, string, string, string];
type CsvPrintOptions = Omit<PrintOptions, 'format' | 'styles' | 'noBorder'>;

function prepareCsv(rows: string[][]) {
    const preparedCsv: TableRowArray[] = [];

    rows.forEach(asciiRow => {
        if (!isValidAsciiRow(asciiRow)) return;

        const char = asciiRow[0];
        const desc = asciiRow[1];
        const code = getCode(char)!;

        if (preparedCsv.some(r => r[2] === code)) return;

        preparedCsv.push([
            code.toString(2),
            code.toString(8),
            code,
            code.toString(16),
            char === '"' ? `\"\\${char}\"` : char === ',' ? `\"${char}\"` : char,
            desc.includes(',') ? `\"${desc}\"` : desc,
        ]);
    });

    return preparedCsv;
}

function applyOptions(table: TableRowArray[], options: CsvPrintOptions) {
    const { allowSort, reverseSort } = options;
    const sortBy = 2;

    if (allowSort) {
        const sortCb = !reverseSort
            ? (row1: any, row2: any) => row1[sortBy] - row2[sortBy]
            : (row1: any, row2: any) => row2[sortBy] - row1[sortBy];

        table.sort(sortCb);
    }
}

export function printCsv(rows: string[][], options: CsvPrintOptions) {
    const { output } = options;
    const preparedCsvRows = prepareCsv(rows);

    applyOptions(preparedCsvRows, options);

    const heading = 'bin,oct,dec,hex,char,description\n';
    const csv = heading + preparedCsvRows.join('\n');

    if (output !== undefined && output.trim().length > 0) {
        writeFileSync(output, csv, 'utf-8');
    } else {
        console.log(csv);
    }
}
