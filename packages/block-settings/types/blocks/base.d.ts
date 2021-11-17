/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '../bundle';

export type BaseBlock = {
    id: string;
    label?: string;
    info?: string;
    show?: (bundle: ApiBundle) => boolean;
    onChange?: (bundle: ApiBundle) => void;
};
