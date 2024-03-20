/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockProps } from '@frontify/guideline-blocks-settings';
import { ReactElement } from 'react';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import 'tailwindcss/tailwind.css';

export const ExampleBlock = ({}: BlockProps): ReactElement => {
    return (
        <div data-test-id="example-block" className="example-block">
            <span className="tw-text-violet-60 tw-underline">A custom block in violet and underlined</span>
        </div>
    );
};
