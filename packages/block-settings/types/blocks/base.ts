/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '../bundle';

export type ValueOrPromisedValue<FieldType> =
    | FieldType
    | ((bundle: Bundle) => FieldType)
    | ((bundle: Bundle) => Promise<FieldType>);

export type BaseBlock<T = undefined> = {
    id: string;
    label?: ValueOrPromisedValue<string>;
    info?: ValueOrPromisedValue<string>;
    value?: T;
    defaultValue?: T;
    showForTranslations?: boolean;
    show?: (bundle: Bundle) => boolean;
    onChange?: (bundle: Bundle) => void;
};
