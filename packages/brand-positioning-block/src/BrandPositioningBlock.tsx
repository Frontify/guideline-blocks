/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings } from '@frontify/app-bridge';

import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import { BlockSettings } from './types';
import type { BlockProps } from '@frontify/guideline-blocks-settings';

export const BrandPositioningBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    console.log(blockSettings, setBlockSettings);

    return <div data-test-id="brand-positioning-block">Brand positioning</div>;
};
