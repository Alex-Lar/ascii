import { asciiTable } from './core/ascii/ascii-table';
import { getCode, isValidAsciiChar, isValidAsciiCode } from './core/ascii/utils';
import { isNonEmptyStringArray, isNonEmptyStringOrNumberArray } from './shared/guards';

export function parseAndValidateCharArgs(input: unknown): string[] {
    if (!isNonEmptyStringArray(input)) {
        throw new Error(
            `Invalid char arguments: expected non-empty array of strings, got ${JSON.stringify(
                input
            )}`
        );
    }

    input.forEach(char => {
        if (!isValidAsciiChar(char)) {
            throw new Error(
                `Invalid character: "${char}". Expected ASCII character or control character name.`
            );
        }
    });

    return input;
}

export function parseAndValidateRangeArg(input: unknown): string | number {
    const digitsMap: { [char: string]: number } = {
        '0': 48,
        '1': 49,
        '2': 50,
        '3': 51,
        '4': 52,
        '5': 53,
        '6': 54,
        '7': 55,
        '8': 56,
        '9': 57,
    };

    if (typeof input === 'number') return input;
    if (typeof input !== 'string') {
        throw new Error(
            `Invalid code argument: expected ASCII character or code, got ${typeof input}`
        );
    }

    if (
        input.toLowerCase().startsWith('c:') ||
        input.toLowerCase().startsWith('ch:') ||
        input.toLowerCase().startsWith('char:')
    ) {
        const [_, value] = input.split(':');

        if (value === undefined || value.trim().length === 0)
            throw new Error(
                'Character prefix requires a value. Usage: c:<character> or char:<character>'
            );

        const num = Number(value);
        if (!Number.isNaN(num) && Number.isInteger(num) && num >= 0 && num <= 9)
            return digitsMap[num]!;
        else return value;
    }

    const num = Number(input);
    if (!Number.isNaN(num) && input.trim().length != 0) return num;
    else return input;
}

export function validateRangeArgs(
    from: string | number | undefined,
    to: string | number = asciiTable.length - 1
) {
    if (from === undefined) return;

    const fromCode = typeof from === 'string' ? getCode(from) : from;
    const toCode = typeof to === 'string' ? getCode(to) : to;

    if (fromCode === undefined || !isValidAsciiCode(fromCode)) {
        throw new Error(`Invalid range value: "${from}". Expected ASCII character or code 0-127`);
    }
    if (toCode === undefined || !isValidAsciiCode(toCode)) {
        throw new Error(`Invalid range value: "${to}". Expected ASCII character or code 0-127`);
    }

    if (fromCode > toCode) {
        const fromDisplay = typeof from === 'string' ? `${fromCode}/${from}` : fromCode;
        const toDisplay = typeof to === 'string' ? `${toCode}/${to}` : toCode;
        throw new Error(
            `Invalid range: from (${fromDisplay}) must be less than or equal to to (${toDisplay})`
        );
    }
}

export function parseCode(input: unknown): number {
    if (typeof input === 'number') {
        if (!isValidAsciiCode(input))
            throw new Error(`Code out of range: "${input}". Expected number between 0 and 127`);

        return input;
    }
    if (typeof input !== 'string') {
        throw new Error(
            `Invalid code argument: expected number or numeric string, got ${typeof input}`
        );
    }

    const parsedCode = input.trim().length > 0 ? Number(input) : NaN;

    if (!Number.isNaN(parsedCode)) {
        if (!isValidAsciiCode(parsedCode))
            throw new Error(
                `Code out of range: "${parsedCode}". Expected number between 0 and 127`
            );

        return parsedCode;
    }

    throw new Error(
        `Invalid number: "${input}". Expected decimal number or prefix (0b, 0o, 0x) for other bases`
    );
}

export function parseAndValidateCodeArgs(input: unknown[]): number[] {
    if (!isNonEmptyStringOrNumberArray(input)) {
        throw new Error(
            `Invalid code arguments: expected non-empty array of numbers or strings, got ${JSON.stringify(
                input
            )}`
        );
    }

    try {
        return input.map(code => parseCode(code));
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to parse code arguments: ${error.message}`);
        }
        throw error;
    }
}
