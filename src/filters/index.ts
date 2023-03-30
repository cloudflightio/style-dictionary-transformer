import { Filter, Named, TransformedToken } from 'style-dictionary';
import { allowedTokenTypes } from '../models/allowed-token-types';

export const cloudflightFilter: Named<Filter> = {
    name: 'cloudflight/filter',
    matcher(token) {
        const filters = [filterForAllowedTypes];

        return filters.every((fn) => fn(token));
    },
};

export function filterForAllowedTypes(token: TransformedToken): boolean {
    return allowedTokenTypes.includes(token['type']);
}
