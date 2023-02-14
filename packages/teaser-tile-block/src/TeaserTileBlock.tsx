/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Settings } from './types';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { ImageFlyout } from './components/ImageFlyout';

export const TeaserTileBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    return (
        <div data-test-id="teasertile-block" className="tw-relative">
            <ImageFlyout />
        </div>
    );
};
