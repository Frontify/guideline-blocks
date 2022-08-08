/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SwitchSize } from '@frontify/fondue';
import { BaseBlock } from './base';
import { SettingBlock } from './index';

export type SwitchBlock = {
    type: 'switch';
    switchLabel?: string;
    on?: SettingBlock[];
    off?: SettingBlock[];
    size?: SwitchSize;
} & BaseBlock<boolean>;
