import fs from 'node:fs';

export function readFileMinified(path: string): string {
    return fs.readFileSync(path, 'utf8').replaceAll(' ', '').replaceAll('\r', '').replaceAll('\n', '');
}
