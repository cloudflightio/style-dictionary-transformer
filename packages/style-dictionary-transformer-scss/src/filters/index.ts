import { Filter, Named } from 'style-dictionary';
import { filterForAllowedTypes } from './allowed-types';

export const cloudflightFilter: Named<Filter> = {
    name: 'cloudflight/filter',
    matcher(token) {
        const filters = [filterForAllowedTypes];

        return filters.every((fn) => fn(token));
    },
};
