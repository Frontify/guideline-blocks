/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import 'tailwindcss/tailwind.css';
import { Settings } from './types';

export const ImageBlock = ({ appBridge }: BlockProps) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { designTokens } = useGuidelineDesignTokens();

    console.log({ isEditing, blockSettings, designTokens });

    return <div data-test-id="image-block"></div>;
};
