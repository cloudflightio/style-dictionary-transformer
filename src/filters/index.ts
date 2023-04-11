import { Filter, Named, TransformedToken } from 'style-dictionary';
import { tokenTypes } from '../models/token-types';

export const cloudflightFilter: Named<Filter> = {
    name: 'cloudflight/filter',
    matcher(token) {
        const filters = [filterForAllowedTypes];

        return filters.every((fn) => fn(token));
    },
};

function filterForAllowedTypes(token: TransformedToken): boolean {
    return tokenTypes.includes(token['type']);
}
