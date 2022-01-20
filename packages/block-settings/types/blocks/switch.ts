/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BaseBlock } from './base';
import { SettingBlock } from './index';

export type SwitchBlock = {
    type: 'switch';
    switchLabel?: string;
    on?: SettingBlock[];
    off?: SettingBlock[];
    value?: boolean;
    defaultValue: boolean;
} & BaseBlock;
