import { BaseBlock } from './base';
import { AssetInputBlock } from './assetInput';
import { ChecklistBlock } from './checklist';
import { ColorInputBlock } from './colorInput';
import { DropdownBlock } from './dropdown';
import { InputBlock } from './input';
import { MultiInputBlock } from './multiInput';
import { SliderBlock } from './slider';

export type Block =
    | AssetInputBlock
    | ChecklistBlock
    | ColorInputBlock
    | DropdownBlock
    | InputBlock
    | MultiInputBlock
    | SliderBlock
    | SwitchBlock;

export type SwitchBlock = {
    type: 'switch';
    switchLabel?: string;
    on?: Block[];
    off?: Block[];
    value?: boolean;
    defaultValue: boolean;
} & BaseBlock;
