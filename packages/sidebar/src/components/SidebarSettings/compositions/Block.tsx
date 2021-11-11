/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useContext } from 'react';
import { SettingsContext, UpdateDataFunction } from '../hocs/withSettings';
import { useOnChange } from '../hooks/useOnChange';
import { Block as GivenBlock, BlockType } from '../hooks/useSettings';
import {
    AssetInputBlock,
    ChecklistBlock,
    ColorInputBlock,
    DropdownBlock,
    InputBlock,
    MultiInputBlock,
    SliderBlock,
    SwitchBlock,
    TargetsBlock,
} from './blocks';

const getBlock = (block: GivenBlock, onUpdate: UpdateDataFunction<GivenBlock['value']>) => {
    switch (block.type) {
        case BlockType.AssetInput:
            return <AssetInputBlock block={block} onUpdate={onUpdate} />;
        case BlockType.Checklist:
            return <ChecklistBlock block={block} onUpdate={onUpdate} />;
        case BlockType.ColorInput:
            return <ColorInputBlock block={block} onUpdate={onUpdate} />;
        case BlockType.Dropdown:
            return <DropdownBlock block={block} onUpdate={onUpdate} />;
        case BlockType.Input:
            return <InputBlock block={block} onUpdate={onUpdate} />;
        case BlockType.MultiInput:
            return <MultiInputBlock block={block} onUpdate={onUpdate} />;
        case BlockType.Slider:
            return <SliderBlock block={block} onUpdate={onUpdate} />;
        case BlockType.Switch:
            return <SwitchBlock block={block} onUpdate={onUpdate} />;
        case BlockType.Targets:
            return <TargetsBlock block={block} onUpdate={onUpdate} />;
        default:
            return null;
    }
};

type Props = {
    block: GivenBlock;
};

export const Block: FC<Props> = ({ block }) => {
    const { settings, pathMap, updateData } = useContext(SettingsContext);
    const onChange = useOnChange(settings, pathMap, updateData);

    const onUpdate: UpdateDataFunction<GivenBlock['value']> = (key, value) => {
        updateData(key, value);
        block.onChange && onChange(block.onChange);
    };
    return <>{getBlock(block, onUpdate)}</>;
};
