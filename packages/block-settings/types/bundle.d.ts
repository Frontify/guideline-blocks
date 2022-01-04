/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingBlock } from './blocks';

export type BlockSettingValue = {
    value?: SettingBlock['value'];
};

export type Bundle = {
    getBlock: (id: string) => BlockSettingValue | null;
    setBlockValue: (key: string, value: SettingBlock['value']) => void;
};
