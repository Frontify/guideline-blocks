/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import 'tailwindcss/tailwind.css';
import { Settings } from './types';
import { BlankState } from './BlankState';

export const ImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    if (!blockSettings.image && isEditing) {
        return <BlankState appBridge={appBridge} />;
    }
    return <div data-test-id="image-block"></div>;
};
