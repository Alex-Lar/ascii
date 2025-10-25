import { RootOptions, SharedOptions } from './types';

export function prepareSharedOptions(argv: any): SharedOptions {
    // output
    const output = argv?.output ?? undefined;

    // output data format
    const csv = argv?.csv ?? false;
    const json = argv?.json ?? false;
    const markdown = argv?.markdown ?? false;

    // sort
    const noSort = argv?.noSort ?? false;
    const reverse = argv?.reverse ?? false;

    // style
    const colorful = argv?.colorful ?? false;
    const noColors = argv?.noColor ?? false;
    const noBorder = argv?.noBorder ?? false;

    return { colorful, noSort, noColors, noBorder, csv, json, markdown, output, reverse };
}

export function prepareRootOptions(argv: any): RootOptions {
    const escape = argv?.escape ?? false;
    const control = argv?.control ?? false;
    const printable = argv?.printable ?? false;
    const digits = argv?.digits ?? false;
    const uppercase = argv?.uppercase ?? false;
    const lowercase = argv?.lowercase ?? false;

    const sharedOptions = prepareSharedOptions(argv);

    return {
        ...sharedOptions,
        escape,
        control,
        printable,
        digits,
        uppercase,
        lowercase,
    };
}
