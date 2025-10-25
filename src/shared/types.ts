export type StyleColors = {
    binColor: (text: string) => string;
    octalColor: (text: string) => string;
    decimalColor: (text: string) => string;
    hexColor: (text: string) => string;
    charColor: (text: string) => string;
    descColor: (text: string) => string;
};

export type StyleOptions = Pick<SharedOptions, 'colorful' | 'noColors'>;

export type SharedOptions = {
    // output
    output: string | undefined;
    // output data format
    json: boolean;
    csv: boolean;
    markdown: boolean;
    // sort
    noSort: boolean;
    reverse: boolean;
    // styles
    colorful: boolean;
    noColors: boolean;
    noBorder: boolean;
};

export type RootOptions = SharedOptions & {
    escape: boolean;
    control: boolean;
    printable: boolean;
    digits: boolean;
    uppercase: boolean;
    lowercase: boolean;
};

export type DecOptions = SharedOptions & {};
export type CharOptions = SharedOptions & {};
export type RangeOptions = SharedOptions & {};
export type DescOptions = SharedOptions & {};

export type PrintFormat = 'table' | 'json' | 'csv' | 'markdown';

export type PrintOptions = {
    format: PrintFormat;
    styles: StyleColors;
    noBorder: boolean;
    allowSort: boolean;
    reverseSort: boolean;
    output: string | undefined;
};

export type TableRow = {
    id: number;
    bin: string;
    oct: string;
    dec: string;
    hex: string;
    char: string;
    description: string;
};
