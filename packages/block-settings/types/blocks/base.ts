/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '../bundle';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ValueOrPromisedValue<FieldType, ParamType = {}> =
    | FieldType
    | ((...args: (ParamType & { bundle: Bundle })[]) => Promise<FieldType>);

export type BaseBlock<T = undefined> = {
    id: string;
    label?: ValueOrPromisedValue<string>;
    info?: ValueOrPromisedValue<string>;
    value?: T;
    defaultValue?: ValueOrPromisedValue<T>;
    showForTranslations?: boolean;
    show?: (bundle: Bundle) => boolean;
    onChange?: (bundle: Bundle) => void;
};
