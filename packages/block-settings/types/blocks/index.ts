/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetInputBlock } from './assetInput';
import { ChecklistBlock } from './checklist';
import { ColorInputBlock } from './colorInput';
import { DropdownBlock } from './dropdown';
import { InputBlock } from './input';
import { MultiInputBlock } from './multiInput';
import { SliderBlock } from './slider';
import { SwitchBlock } from './switch';
import { TemplateInputBlock } from './templateInput';

export * from './assetInput';
export * from './checklist';
export * from './colorInput';
export * from './dropdown';
export * from './input';
export * from './multiInput';
export * from './slider';
export * from './switch';
export * from './templateInput';
export * from './choices';

export type SettingBlock =
    | AssetInputBlock
    | ChecklistBlock
    | ColorInputBlock
    | DropdownBlock
    | InputBlock
    | MultiInputBlock
    | SliderBlock
    | SwitchBlock
    | TemplateInputBlock;
