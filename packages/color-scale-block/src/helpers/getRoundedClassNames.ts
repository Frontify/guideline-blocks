/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorProps } from '../types';

export const getRoundedClassNames = (index: number, displayableItems: ColorProps[]) => {
    const leftRounded = 'tw-rounded-tl tw-rounded-bl';
    const rightRounded = 'tw-rounded-tr tw-rounded-br';
    if (index === 0) {
        return displayableItems.length === 1 ? `${leftRounded} ${rightRounded}` : leftRounded;
    }
    return index === displayableItems.length - 1 ? rightRounded : '';
};
