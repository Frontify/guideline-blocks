/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useCallback } from 'react';
import { UpdateDataFunction } from '@components/SidebarSettings';
import {
    BlockType,
    MultiInputBlock as MultiInputBlockType,
    ColorInputBlock as ColorInputBlockType,
    DropdownBlock as DropdownBlockType,
    InputBlock as InputBlockType,
} from '../../hooks/useSettings';
import { FormControl, FormControlStyle, MultiInput } from '@frontify/arcade';
import { ColorInputBlock, DropdownBlock, InputBlock } from '.';

export type MultiInputBlockProps = {
    block: MultiInputBlockType;
    onUpdate: UpdateDataFunction<MultiInputBlockType['value']>;
};

type UnwrapArray<T> = T extends Array<infer R> ? R : never;
type MultiInputBlockValues = UnwrapArray<MultiInputBlockType['value']>;

export const MultiInputBlock: FC<MultiInputBlockProps> = ({ block, onUpdate }) => {
    const errorMessage = false;

    const onInputUpdate = (index: number, value?: MultiInputBlockValues) => {
        const newValues = [...(block.value ? block.value : [])];
        newValues[index] = value || '';

        onUpdate(block.id, newValues);
    };

    const renderBlock = useCallback(
        (blockToRender: UnwrapArray<MultiInputBlockType['blocks']>, index: number) => {
            const onUpdate = (_key: string, value: MultiInputBlockValues) => onInputUpdate(index, value);
            const key = `${blockToRender.id}-child-${blockToRender.id}`;

            switch (blockToRender.type) {
                case BlockType.ColorInput:
                    return (
                        <ColorInputBlock
                            block={{
                                ...blockToRender,
                                value: block.value?.[index] as ColorInputBlockType['value'],
                            }}
                            onUpdate={onUpdate}
                            key={key}
                        />
                    );
                case BlockType.Dropdown:
                    return (
                        <DropdownBlock
                            block={{
                                ...blockToRender,
                                value: block.value?.[index] as DropdownBlockType['value'],
                            }}
                            onUpdate={onUpdate}
                            key={key}
                        />
                    );
                case BlockType.Input:
                    return (
                        <InputBlock
                            block={{
                                ...blockToRender,
                                value: block.value?.[index] as InputBlockType['value'],
                            }}
                            onUpdate={onUpdate}
                            key={key}
                        />
                    );
                default:
                    return null;
            }
        },
        [block.value]
    );

    return (
        <FormControl
            label={{
                children: block.label ?? '',
                htmlFor: block.blocks[0].id,
                tooltip: block.info ? { content: block.info } : undefined,
            }}
            helper={errorMessage ? { text: errorMessage } : undefined}
            style={errorMessage ? FormControlStyle.Danger : undefined}
        >
            <MultiInput layout={block.layout} spanLastItem={block.lastItemFullWidth}>
                {block.blocks.map(renderBlock)}
            </MultiInput>
        </FormControl>
    );
};
