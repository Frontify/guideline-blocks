/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import 'tailwindcss/tailwind.css';
import { Settings } from './types';
import { UploadPlaceholder } from './UploadPlaceholder';
import { ImageCaption } from './ImageCaption';
import { IMAGE_SETTING_ID } from './settings';

export const ImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const imageUrl = blockAssets?.[IMAGE_SETTING_ID]?.[0]?.genericUrl;
    const isEditing = useEditorState(appBridge);

    return (
        <div data-test-id="image-block">
            {!imageUrl ? isEditing && <UploadPlaceholder appBridge={appBridge} /> : <div>image</div>}
            <ImageCaption
                name={blockSettings.name}
                description={blockSettings.description}
                onNameChange={(value) => setBlockSettings({ ...blockSettings, name: value })}
                onDescriptionChange={(value) => setBlockSettings({ ...blockSettings, description: value })}
                isEditing={isEditing}
            />
        </div>
    );
};
