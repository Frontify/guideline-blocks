/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { FormControl, Switch, SwitchSize } from '@frontify/arcade';
import { UpdateDataFunction } from '../../hocs/withSettings';
import { Block as GivenBlock, SwitchBlock as SwitchBlockType } from '../../hooks/useSettings';
import { Block } from '../Block';

export type SwitchBlockProps = {
    block: SwitchBlockType;
    onUpdate: UpdateDataFunction<SwitchBlockType['value']>;
};

const onOffBlock = (block: GivenBlock) => <Block key={block.id} block={block} />;

export const SwitchBlock: FC<SwitchBlockProps> = ({ block, onUpdate }) => {
    const on = typeof block.value === 'boolean' ? block.value : block.defaultValue;

    const blockOnLength = block?.on?.length || 0;

    return (
        <>
            <FormControl
                label={{
                    children: block.label ?? '',
                    htmlFor: block.id,
                    tooltip: block.info ? { content: block.info } : undefined,
                }}
                extra={
                    <Switch
                        size={block.switchLabel ? SwitchSize.Small : SwitchSize.Medium}
                        label={block.switchLabel}
                        hug={true}
                        on={on}
                        id={block.id}
                        onChange={() => onUpdate(block.id, !on)}
                    />
                }
            >
                {blockOnLength === 1 ? (on ? block.on?.map(onOffBlock) : block.off?.map(onOffBlock)) : null}
            </FormControl>
            {blockOnLength > 1 && (
                <FormControl>{on ? block.on?.map(onOffBlock) : block.off?.map(onOffBlock)}</FormControl>
            )}
        </>
    );
};
