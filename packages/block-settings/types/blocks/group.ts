import { BaseBlock } from './base';
import { SettingBlock } from './index';

export type GroupBlock = {
    type: 'group';
    title: string;
    blocks: SettingBlock[];
} & BaseBlock;
