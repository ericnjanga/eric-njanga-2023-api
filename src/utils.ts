
import { statusType } from '../src/models/Status';
import { industryRefType } from '../src/models/Industry';



export function isInteger (input: string) {
    return input?.match(/^\d+$/) ?? false;
}


export function isStatusType (value: string): value is statusType {
    return ['draft', 'published', 'unpublished', 'archived'].includes(value);
}

export function isIndustryRefType (value: string): value is industryRefType {
    return ['ux-design', 'ui-development'].includes(value);
}