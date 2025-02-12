/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockProps } from '@frontify/guideline-blocks-settings';
import { StyleProvider } from '@frontify/guideline-blocks-shared';
import { ReactElement } from 'react';

export const ExampleBlock = ({}: BlockProps): ReactElement => {
    return (
        <div data-test-id="example-block" className="example-block">
            <StyleProvider>
                <span className="tw-text-violet-60 tw-underline">A custom block in violet and underlined</span>
            </StyleProvider>
        </div>
    );
};
