/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingBlock } from './blocks';

export type Field = {
    value?: SettingBlock['value'];
};

export type Bundle = {
    getBlock: (id: string) => Field | null;
    setBlockValue: (key: string, value: SettingBlock['value']) => void;
};
