/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';

export const AudioBlock: FC<BlockProps> = () => {
    return <div data-test-id="audio-block" className="tw-flex"></div>;
};
