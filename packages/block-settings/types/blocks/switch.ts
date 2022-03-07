/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingBlock } from '..';
import { BaseBlock } from './base';

export type SwitchBlock = {
    type: 'switch';
    switchLabel?: string;
    on?: SettingBlock[];
    off?: SettingBlock[];
} & BaseBlock<boolean>;
