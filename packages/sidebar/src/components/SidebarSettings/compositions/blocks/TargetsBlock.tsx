/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { UpdateDataFunction } from '../../hocs/withSettings';
import { BlockType, TargetsBlock as TargetBlockType } from '../../hooks/useSettings';
import { ChecklistBlock } from './ChecklistBlock';

type Props = {
    block: TargetBlockType;
    onUpdate: UpdateDataFunction<TargetBlockType['value']>;
};

export const TargetsBlock: FC<Props> = ({ block, onUpdate }) => (
    <div data-test-id="settings-sidebar-targets-block">
        <ChecklistBlock block={{ ...block, type: BlockType.Checklist }} onUpdate={onUpdate} />
    </div>
);
