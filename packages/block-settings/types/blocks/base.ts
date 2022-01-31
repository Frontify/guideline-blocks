/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '../bundle';

export type BaseBlock<T = string | undefined> = {
    id: string;
    label?: string;
    info?: string;
    value?: T;
    defaultValue?: T;
    show?: (bundle: Bundle) => boolean;
    onChange?: (bundle: Bundle) => void;
};
