/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetInputBlock } from './assetInput';
import { ChecklistBlock } from './checklist';
import { ColorInputBlock } from './colorInput';
import { DropdownBlock } from './dropdown';
import { InputBlock } from './input';
import { MultiInputBlock } from './multiInput';
import { NotificationBlock } from './notification';
import { SectionHeadingBlock } from './sectionHeading';
import { SliderBlock } from './slider';
import { SwitchBlock } from './switch';
import { TemplateInputBlock } from './templateInput';

export * from './assetInput';
export * from './checklist';
export * from './choices';
export * from './colorInput';
export * from './dropdown';
export * from './input';
export * from './multiInput';
export * from './notification';
export * from './sectionHeading';
export * from './slider';
export * from './switch';
export * from './templateInput';

export type SimpleSettingBlock =
    | AssetInputBlock
    | ChecklistBlock
    | ColorInputBlock
    | DropdownBlock
    | SectionHeadingBlock
    | InputBlock
    | MultiInputBlock
    | SliderBlock
    | SwitchBlock
    | TemplateInputBlock
    | NotificationBlock;

export type DynamicSettingBlock = Omit<SimpleSettingBlock, 'value'> & {
    value?: SimpleSettingBlock['value'][];
    dynamic: {
        addButtonLabel: string;
    };
};

export declare type SettingBlock = SimpleSettingBlock | DynamicSettingBlock;
