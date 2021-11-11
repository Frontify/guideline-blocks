/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { Block as BlockType } from '../hooks/useSettings';
import { Block } from './Block';

type Props = {
    blocks: BlockType[];
};

export const Section: FC<Props> = ({ blocks }) => (
    <div className="tw-space-y-5" data-test-id="section">
        {blocks.map((block) => (
            <Block key={block.id} block={block} />
        ))}
    </div>
);
