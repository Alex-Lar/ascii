export function parseCharPrefix(input: unknown): string | number | undefined {
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
    if (typeof input !== 'string') return undefined;

    if (
        input.toLowerCase().startsWith('c:') ||
        input.toLowerCase().startsWith('ch:') ||
        input.toLowerCase().startsWith('char:')
    ) {
        const [_, value] = input.split(':');

        if (value === undefined || value.trim().length === 0)
            throw new Error('Invalid prefix value');

        const num = Number(value);
        if (!Number.isNaN(num) && num >= 0 && num <= 9) return digitsMap[num]!;
        else return value;
    }

    const num = Number(input);
    if (!Number.isNaN(num)) return num;
    else return input;
}

export function parseCode(input: unknown) {
    if (typeof input === 'number') return input;
    if (typeof input !== 'string') throw new Error('Invalid code');

    const parsedCode = Number(input);

    if (!Number.isNaN(parsedCode)) return parsedCode;

    throw new Error(`Not a number: ${input}`);
}
