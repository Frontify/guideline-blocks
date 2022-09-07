/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '../bundle';

type Setting<T> = T | ((bundle: Bundle) => T);

export type BaseBlock<T = undefined> = {
    id: string;
    label?: Setting<string>;
    info?: Setting<string>;
    value?: T;
    defaultValue?: Setting<T>;
    showForTranslations?: boolean;
    show?: (bundle: Bundle) => boolean;
    onChange?: (bundle: Bundle) => void;
};
