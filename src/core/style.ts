import { blue, cyan, dim, green, white, yellow } from '../shared/colors';
import { StyleColors, StyleOptions } from '../shared/types';

type StyleFn = (text: string) => string;

const styleFactory = {
    getBinColor: (color?: StyleFn) => color ?? white,
    getCharColor: (color?: StyleFn) => color ?? green,
    getDecimalColor: (color?: StyleFn) => color ?? cyan,
    getDescColor: (color?: StyleFn) => color ?? white,
    getHexColor: (color?: StyleFn) => color ?? white,
    getOctalColor: (color?: StyleFn) => color ?? white,
};

export const stubStyles = {
    binColor: (text: string) => text,
    octalColor: (text: string) => text,
    decimalColor: (text: string) => text,
    hexColor: (text: string) => text,
    charColor: (text: string) => text,
    descColor: (text: string) => text,
};

export function getStyleColors(options: StyleOptions): StyleColors {
    let color = undefined;

    if (options.noColors) {
        color = white;
    } else if (options.colorful) {
        return {
            binColor: styleFactory.getBinColor(dim),
            charColor: styleFactory.getCharColor(green),
            decimalColor: styleFactory.getDecimalColor(cyan),
            descColor: styleFactory.getDescColor(white),
            hexColor: styleFactory.getHexColor(yellow),
            octalColor: styleFactory.getOctalColor(blue),
        };
    }

    return {
        binColor: styleFactory.getBinColor(color),
        charColor: styleFactory.getCharColor(color),
        decimalColor: styleFactory.getDecimalColor(color),
        descColor: styleFactory.getDescColor(color),
        hexColor: styleFactory.getHexColor(color),
        octalColor: styleFactory.getOctalColor(color),
    };
}
