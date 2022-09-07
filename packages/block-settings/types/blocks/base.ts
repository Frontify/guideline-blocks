/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '../bundle';

export type ValueOrPromisedValue<FieldType, ParamType> = FieldType | ((...args: ParamType[]) => Promise<FieldType>);

export type BaseBlock<T = undefined> = {
    id: string;
    label?: ValueOrPromisedValue<string, Bundle>;
    info?: ValueOrPromisedValue<string, Bundle>;
    value?: T;
    defaultValue?: ValueOrPromisedValue<T, Bundle>;
    showForTranslations?: boolean;
    show?: (bundle: Bundle) => boolean;
    onChange?: (bundle: Bundle) => void;
};
