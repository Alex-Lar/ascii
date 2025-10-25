import { writeFileSync } from 'node:fs';
import { createTable } from '../../shared/table';
import { PrintOptions, TableRow } from '../../shared/types';
import { getCode, isValidAsciiRow } from '../ascii/utils';

type MarkdownPrintOptions = Omit<PrintOptions, 'format' | 'styles' | 'noBorder'>;

function prepareTableRows(rows: string[][]) {
    const preparedTable: TableRow[] = [];

    rows.forEach(asciiRow => {
        if (!isValidAsciiRow(asciiRow)) return;

        const char = asciiRow[0];
        const desc = asciiRow[1];
        const code = getCode(char)!;

        if (preparedTable.some(r => r.id === code)) return;

        preparedTable.push({
            id: code,
            bin: code.toString(2),
            oct: code.toString(8),
            dec: code.toString(10),
            hex: code.toString(16),
            char: char === '|' ? '\\' + char : char,
            description: desc,
        });
    });

    return preparedTable;
}

export function printMarkdown(rows: string[][], options: MarkdownPrintOptions) {
    const { output } = options;
    const tableRows = prepareTableRows(rows);

    const shouldWriteToFile = output !== undefined && output.trim().length > 0;

    const t = createTable({
        allowSort: options.allowSort,
        reverseSort: options.reverseSort,
        borderType: 'markdown',
        shouldDisableColors: shouldWriteToFile,
    });

    t.addRows(tableRows);

    if (shouldWriteToFile) {
        writeFileSync(output, t.render(), 'utf8');
    } else {
        t.printTable();
    }
}
