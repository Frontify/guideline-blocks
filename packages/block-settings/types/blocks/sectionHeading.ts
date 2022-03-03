/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DynamicSettingBlock } from '..';
import { BaseBlock } from './base';

export type SectionHeadingBlock = {
    type: 'sectionHeading';
    blocks: DynamicSettingBlock[];
    label: string;
} & BaseBlock;
