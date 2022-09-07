/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '../bundle';

type BlockProperty<T> = T | ((bundle: Bundle) => T);

export type BaseBlock<T = undefined> = {
    id: string;
    label?: BlockProperty<string>;
    info?: BlockProperty<string>;
    value?: T;
    defaultValue?: BlockProperty<T>;
    showForTranslations?: boolean;
    show?: (bundle: Bundle) => boolean;
    onChange?: (bundle: Bundle) => void;
};
