import { writeFileSync } from 'node:fs';
import { createTable } from '../../shared/table';
import { PrintOptions, StyleColors, TableRow } from '../../shared/types';
import { getCode, isValidAsciiRow } from '../ascii/utils';
import { stubStyles } from '../style';

function prepareTableRows(rows: string[][], styles: StyleColors, shouldDisableColors: boolean) {
    const preparedTable: TableRow[] = [];

    if (shouldDisableColors) {
        styles = stubStyles;
    }

    rows.forEach(asciiRow => {
        if (!isValidAsciiRow(asciiRow)) return;

        const char = asciiRow[0];
        const desc = asciiRow[1];
        const code = getCode(char)!;

        if (preparedTable.some(r => r.id === code)) return;

        preparedTable.push({
            id: code,
            bin: styles.binColor(code.toString(2)),
            oct: styles.octalColor(code.toString(8)),
            dec: styles.decimalColor(code.toString(10)),
            hex: styles.hexColor(code.toString(16)),
            char: styles.charColor(char),
            description: styles.descColor(desc),
        });
    });

    return preparedTable;
}

export function printTable(rows: string[][], options: PrintOptions) {
    const { output } = options;

    const shouldWriteToFile = output !== undefined && output.trim().length > 0;
    const tableRows = prepareTableRows(rows, options.styles, shouldWriteToFile);

    const t = createTable({
        allowSort: options.allowSort,
        noBorder: options.noBorder,
        reverseSort: options.reverseSort,
        shouldDisableColors: shouldWriteToFile,
    });

    t.addRows(tableRows);

    if (shouldWriteToFile) {
        writeFileSync(output, t.render(), 'utf8');
    } else {
        t.printTable();
    }
}
