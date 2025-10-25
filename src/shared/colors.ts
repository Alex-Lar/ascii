import { styleText } from 'util';

export function dim(text: string): string {
    return styleText('dim', text);
}

export function white(text: string): string {
    return styleText('white', text);
}

export function cyan(text: string): string {
    return styleText('cyanBright', text);
}

export function blue(text: string): string {
    return styleText('blue', text);
}

export function green(text: string): string {
    return styleText('green', text);
}

export function yellow(text: string): string {
    return styleText('yellow', text);
}
