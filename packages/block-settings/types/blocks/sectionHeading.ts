/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingBlock } from '..';
import { BaseBlock } from './base';

export type SectionHeadingBlock = {
    type: 'sectionHeading';
    blocks: SettingBlock[];
    label: string;
} & BaseBlock;
