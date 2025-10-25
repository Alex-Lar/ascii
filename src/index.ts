import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { parseCharPrefix, parseCode } from './parser';
import { prepareRootOptions, prepareSharedOptions } from './shared/options';
import { charCommand, codeCommand, descCommand, rangeCommand, rootCommand } from './commands';

yargs(hideBin(process.argv))
    .parserConfiguration({
        'unknown-options-as-args': true,
        'boolean-negation': false,
    })
    .scriptName('ascii')
    .usage('$0 [commands] [options]')
    .command(
        '$0',
        'Display ASCII table',
        yargs => {
            return yargs
                .option('escape', {
                    alias: 'E',
                    type: 'boolean',
                    describe: 'Show escape characters',
                })
                .option('control', {
                    alias: 'C',
                    type: 'boolean',
                    describe: 'Show control characters',
                })
                .option('printable', {
                    alias: 'P',
                    type: 'boolean',
                    describe: 'Show printable characters',
                })
                .option('digits', {
                    alias: 'D',
                    type: 'boolean',
                    describe: 'Show digits',
                })
                .option('uppercase', {
                    alias: 'U',
                    type: 'boolean',
                    describe: 'Show uppercase letters',
                })
                .option('lowercase', {
                    alias: 'L',
                    type: 'boolean',
                    describe: 'Show lowercase letters',
                });
        },
        argv => {
            const options = prepareRootOptions(argv);
            rootCommand(options);
        }
    )
    .command(
        'range [from] [to]',
        'Display ASCII characters within specified range',
        yargs => {
            return yargs
                .positional('from', {
                    type: 'string',
                    describe: 'Start character/code (use c: prefix for digit characters)',
                    coerce: parseCharPrefix,
                })
                .positional('to', {
                    type: 'string',
                    describe: 'End character/code (use c: prefix for digit characters)',
                    coerce: parseCharPrefix,
                });
        },
        argv => {
            const options = prepareSharedOptions(argv);
            rangeCommand(argv.from, argv.to, options);
        }
    )
    .command(
        'code <codes...>',
        'Display ASCII characters by their codes',
        yargs => {
            return yargs.positional('codes', {
                type: 'string',
                describe: 'Character codes in binary (0b), octal (0o), decimal, or hex (0x) format',
                demandOption: true,
                array: true,
            });
        },
        argv => {
            const options = prepareSharedOptions(argv);
            const codes = argv.codes.map(code => parseCode(code));
            codeCommand(codes, options);
        }
    )
    .command(
        'char <chars...>',
        'Display ASCII characters by their symbols',
        yargs => {
            return yargs.positional('chars', {
                type: 'string',
                describe: 'Character symbols (special names like "nul" accepted)',
                demandOption: true,
                array: true,
            });
        },
        argv => {
            const options = prepareSharedOptions(argv);
            charCommand(argv.chars, options);
        }
    )
    .command(
        'desc <substring>',
        'Search ASCII characters by description',
        yargs => {
            return yargs.positional('substring', {
                type: 'string',
                describe: 'Substring to search in character descriptions',
                demandOption: true,
            });
        },
        argv => {
            const options = prepareSharedOptions(argv);
            descCommand(argv.substring, options);
        }
    )
    .option('output', {
        alias: 'O',
        type: 'string',
        describe: 'Write output to specified file',
    })
    .option('json', {
        alias: 'J',
        type: 'boolean',
        describe: 'Output in JSON format',
    })
    .option('csv', {
        alias: 'S',
        type: 'boolean',
        describe: 'Output in CSV format',
    })
    .option('markdown', {
        alias: 'M',
        type: 'boolean',
        describe: 'Output in Markdown table format',
    })
    .option('no-sort', {
        alias: 'N',
        type: 'boolean',
        describe: 'Disable sorting of output',
    })
    .option('reverse', {
        alias: 'R',
        type: 'boolean',
        describe: 'Reverse sort order',
    })
    .option('colorful', {
        alias: 'F',
        type: 'boolean',
        describe: 'Enable colorful table output',
    })
    .option('no-color', {
        alias: 'X',
        type: 'boolean',
        describe: 'Disable colored output',
    })
    .option('no-border', {
        alias: 'B',
        type: 'boolean',
        describe: 'Disable table borders',
    })
    .example('ascii --escape --json', 'Show escape characters in JSON format')
    .example('ascii range 0 5', 'Display rows 0 to 5')
    .example('ascii code 0x41 65 0b1000001', 'Display character by codes in different bases')
    .example('ascii char A nul', 'Display specific characters')
    .example('ascii desc upper', 'Search characters by description')
    .demandCommand(1, 'Please specify a command')
    .strict()
    .help().argv;
