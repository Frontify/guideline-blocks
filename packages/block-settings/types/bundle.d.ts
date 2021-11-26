/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBlock } from './blocks';

export type ApiField = {
    value?: ApiBlock['value'];
};

export type ApiBundle = {
    getBlock: (id: string) => ApiField | null;
    setBlockValue: (key: string, value: ApiBlock['value']) => void;
};
