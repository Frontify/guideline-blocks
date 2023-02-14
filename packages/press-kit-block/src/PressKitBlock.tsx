/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';

export const PressKitBlock: FC<BlockProps> = ({ appBridge }) => {
    appBridge.getProjectId(); // project id
    // to get the asset ids refeer to the documentation
    return (
        <div data-test-id="example-block">
            <span className="tw-text-violet-60 tw-underline">A custom block in violet and underlined test 5</span>
        </div>
    );
};
