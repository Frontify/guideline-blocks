import { AssetInputBlock } from './assetInput';
import { ChecklistBlock } from './checklist';
import { DropdownBlock } from './dropdown';
import { InputBlock } from './input';
import { MultiInputBlock } from './multiInput';
import { SliderBlock } from './slider';
import { SwitchBlock } from './switch';

export type ApiBlock =
    | AssetInputBlock
    | SwitchBlock
    | DropdownBlock
    | SliderBlock
    | InputBlock
    | MultiInputBlock
    | ChecklistBlock;
