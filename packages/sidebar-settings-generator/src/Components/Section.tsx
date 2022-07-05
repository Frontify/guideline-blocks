/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingBlock } from '@frontify/guideline-blocks-settings';
import { FC } from 'react';
import { Setting } from './Setting';

type Props = {
    blocks: SettingBlock[];
};

export const Section: FC<Props> = ({ blocks }) => (
    <div className="tw-space-y-5" data-test-id="settings-sidebar-section">
        {blocks.map((block) => (
            <Setting key={block.id} block={block} />
        ))}
    </div>
);
