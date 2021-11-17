/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBlock } from './blocks';

type ApiField = {
    value?: ApiBlock['value'];
};

export type ApiBundle = {
    getBlock: (id: string) => ApiField | null;
    setBlockValue: (key: string, value: ApiBlock['value']) => void;
};
