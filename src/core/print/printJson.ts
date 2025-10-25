import { writeFileSync } from 'node:fs';
import { PrintOptions, TableRow } from '../../shared/types';
import { getCode, isValidAsciiRow } from '../ascii/utils';

type JsonTableRow = Omit<TableRow, 'id' | 'dec'> & {
    dec: number;
};

type JsonPrintOptions = Omit<PrintOptions, 'format' | 'styles' | 'noBorder'>;

function prepareJson(rows: string[][]) {
    const preparedJson: JsonTableRow[] = [];

    rows.forEach(asciiRow => {
        if (!isValidAsciiRow(asciiRow)) return;

        const char = asciiRow[0];
        const desc = asciiRow[1];
        const code = getCode(char)!;

        if (preparedJson.some(r => r.dec === code)) return;

        preparedJson.push({
            dec: code,
            bin: code.toString(2),
            oct: code.toString(8),
            hex: code.toString(16),
            char: char,
            description: desc,
        });
    });

    return {
        characters: preparedJson,
    };
}

function applyOptions(json: JsonTableRow[], options: JsonPrintOptions) {
    const { allowSort, reverseSort } = options;

    if (allowSort) {
        const sortBy = 'dec';

        const sortCb = !reverseSort
            ? (row1: any, row2: any) => row1[sortBy] - row2[sortBy]
            : (row1: any, row2: any) => row2[sortBy] - row1[sortBy];

        json.sort(sortCb);
    }
}

export function printJson(rows: string[][], options: JsonPrintOptions) {
    const { output } = options;
    const preparedJson = prepareJson(rows);

    applyOptions(preparedJson.characters, options);

    const json = JSON.stringify(preparedJson, undefined, ' ');

    if (output !== undefined && output.trim().length > 0) {
        writeFileSync(output, json, 'utf-8');
    } else {
        console.log(json);
    }
}
