import { BaseBlock } from './base';
import {
    AssetInputBlock,
    ChecklistBlock,
    ColorInputBlock,
    DropdownBlock,
    InputBlock,
    MultiInputBlock,
    SliderBlock,
    TargetsBlock,
} from './index';

export type Block =
    | AssetInputBlock
    | ChecklistBlock
    | ColorInputBlock
    | DropdownBlock
    | InputBlock
    | MultiInputBlock
    | SliderBlock
    | SwitchBlock
    | TargetsBlock;

export type SwitchBlock = {
    type: 'switch';
    switchLabel?: string;
    on?: Block[];
    off?: Block[];
    value?: boolean;
    defaultValue: boolean;
} & BaseBlock;
