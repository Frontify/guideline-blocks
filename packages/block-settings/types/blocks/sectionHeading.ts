/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BaseBlock } from './base';
import { SettingBlock } from './index';

export type SectionHeadingBlock = {
    type: 'sectionHeading';
    blocks: SettingBlock[];
    label: string;
} & BaseBlock;
