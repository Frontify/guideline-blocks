/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import 'tailwindcss/tailwind.css';
import { Settings, mapCaptionPositionClasses } from './types';
import { UploadPlaceholder } from './UploadPlaceholder';
import { ImageCaption } from './ImageCaption';
import { IMAGE_SETTING_ID } from './settings';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { Image } from './Image';

export const ImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const image = blockAssets?.[IMAGE_SETTING_ID]?.[0];
    const isEditing = useEditorState(appBridge);

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
                <Image
                    url={image.genericUrl}
                    blockSettings={blockSettings}
                    isEditing={isEditing}
                    imageName={image.fileName}
                />
            )}
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
