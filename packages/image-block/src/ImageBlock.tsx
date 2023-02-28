/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import 'tailwindcss/tailwind.css';
import { Settings, mapCaptionPositionClasses } from './types';
import { UploadPlaceholder } from './components/UploadPlaceholder';
import { ImageCaption } from './components/ImageCaption';
import { IMAGE_SETTING_ID } from './settings';
import { hasRichTextValue, joinClassNames } from '@frontify/guideline-blocks-shared';
import { Image } from './components/Image';

export const ImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const image = blockAssets?.[IMAGE_SETTING_ID]?.[0];
    const isEditing = useEditorState(appBridge);
    console.log('blockSettings', blockSettings.name, hasRichTextValue(blockSettings.name));

    return (
        <div
            data-test-id="image-block"
            className={joinClassNames([
                'tw-flex tw-h-auto tw-gap-3',
                mapCaptionPositionClasses[blockSettings.positioning],
            ])}
        >
            {!image ? (
                isEditing && <UploadPlaceholder appBridge={appBridge} />
            ) : (
                <Image appBridge={appBridge} blockSettings={blockSettings} isEditing={isEditing} image={image} />
            )}
            <ImageCaption
                name={blockSettings.name ?? image?.fileName}
                description={blockSettings.description}
                onNameChange={(value) => setBlockSettings({ ...blockSettings, name: value })}
                onDescriptionChange={(value) => setBlockSettings({ ...blockSettings, description: value })}
                isEditing={isEditing}
            />
        </div>
    );
};
