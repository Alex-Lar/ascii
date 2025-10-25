import { Table } from 'console-table-printer';
import type { ComplexOptions } from 'console-table-printer/dist/src/models/external-table';

type CreateTableConfig = {
    title?: string;
    enabledColumns?: string[];
    allowSort?: boolean;
    reverseSort?: boolean;
    sortBy?: string;
    noBorder?: boolean;
    borderType?: 'default' | 'markdown';
    shouldDisableColors: boolean;
};

const defaultConfig = {
    title: 'ASCII Table',
    enabledColumns: ['bin', 'oct', 'dec', 'hex', 'char', 'description'],
    allowSort: true,
    reverseSort: false,
    sortBy: 'id',
    noBorder: false,
    shouldDisableColors: false,
};

export function createTable(config?: CreateTableConfig): Table {
    const sortBy = config?.sortBy ?? defaultConfig.sortBy;
    const allowSort = config?.allowSort ?? defaultConfig.allowSort;
    const reverseSort = config?.reverseSort ?? defaultConfig.reverseSort;
    const enabledColumns = config?.enabledColumns ?? defaultConfig.enabledColumns;
    const noBorder = config?.noBorder ?? defaultConfig.noBorder;
    const borderType = config?.borderType ?? 'default';
    const shouldDisableColors = config?.shouldDisableColors ?? defaultConfig.shouldDisableColors;

    const options: ComplexOptions = {
        enabledColumns: enabledColumns,
    };

    if (allowSort) {
        options.sort = !reverseSort
            ? (row1: any, row2: any) => row1[sortBy] - row2[sortBy]
            : (row1: any, row2: any) => row2[sortBy] - row1[sortBy];
    }

    if (noBorder) {
        options.style = {
            headerTop: {
                left: '',
                mid: '',
                right: '',
                other: '',
            },
            headerBottom: {
                left: '',
                mid: '',
                right: '',
                other: '',
            },
            tableBottom: {
                left: '',
                mid: '',
                right: '',
                other: '',
            },
            vertical: '',
        };
    } else if (borderType === 'markdown') {
        options.style = {
            headerTop: {
                left: '',
                mid: '',
                right: '',
                other: '',
            },
            headerBottom: {
                left: '|',
                mid: '|',
                right: '|',
                other: '-',
            },
            tableBottom: {
                left: '',
                mid: '',
                right: '',
                other: '',
            },
            vertical: '|',
        };
    }

    return new Table({
        ...options,
        columns: [
            { name: 'bin', alignment: 'right' },
            { name: 'oct', alignment: 'right' },
            { name: 'dec', alignment: 'right' },
            { name: 'hex', alignment: 'right' },
            { name: 'char', alignment: 'right' },
            { name: 'description', alignment: 'left' },
        ],
        shouldDisableColors,
    });
}
