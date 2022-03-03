/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DynamicSettingBlock } from '..';
import { BaseBlock } from './base';

export type SwitchBlock = {
    type: 'switch';
    switchLabel?: string;
    on?: DynamicSettingBlock[];
    off?: DynamicSettingBlock[];
} & BaseBlock<boolean>;
