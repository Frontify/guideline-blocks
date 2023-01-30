/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { Settings } from './types';

export const ImageBlock: FC<BlockProps> = ({ appBridge }) => {
    // const isEditing = useEditorState(appBridge);
    // const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    // const { designTokens } = useGuidelineDesignTokens();

    return <div data-test-id="image-block"></div>;
};
