/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingBlock } from './blocks';

export type SettingValue = {
    value?: SettingBlock['value'];
};

export type Bundle = {
    getBlock: (id: string) => SettingValue | null;
    setBlockValue: (key: string, value: SettingBlock['value']) => void;
};
