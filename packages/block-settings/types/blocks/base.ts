/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '../bundle';

export type BaseBlock<T = undefined> = {
    id: string;
    label?: string;
    info?: string;
    value?: T;
    defaultValue?: T;
    showForTranslations?: boolean;
    show?: (bundle: Bundle) => boolean;
    onChange?: (bundle: Bundle) => void;
};
