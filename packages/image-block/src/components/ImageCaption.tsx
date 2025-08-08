/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextEditor, TextStyles, convertToRteValue, hasRichTextValue } from '@frontify/guideline-blocks-settings';
import { getCaptionPlugins, titlePlugins } from './helpers';
import { AppBridgeBlock } from '@frontify/app-bridge';
import { type Settings } from '../types';

type ImageCaptionProps = {
    blockId: string;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
    titleKey: string;
    name?: string;
    description?: string;
    setBlockSettings: (newBlockSettings: Partial<Settings>) => void;
};

export const ImageCaption = ({
    isEditing,
    blockId,
    appBridge,
    titleKey,
    description,
    name,

    setBlockSettings,
}: ImageCaptionProps) => {
    const hasTitle = hasRichTextValue(name);
    const hasDescription = hasRichTextValue(description);

    if (!isEditing && !hasTitle && !hasDescription) {
        return null;
    }

    return (
        <div className="tw-gap-1 tw-flex-1 tw-w-full" data-test-id="image-caption">
            <RichTextEditor
                key={titleKey}
                id={`${blockId}_title`}
                isEditing={isEditing}
                plugins={titlePlugins}
                placeholder="Asset name"
                showSerializedText={hasTitle}
                value={name ?? convertToRteValue(TextStyles.imageTitle, '', 'center')}
                onTextChange={(name) => setBlockSettings({ name })}
            />
            <RichTextEditor
                id={`${blockId}_description`}
                isEditing={isEditing}
                plugins={getCaptionPlugins(appBridge)}
                onTextChange={(description) => setBlockSettings({ description })}
                placeholder="Add a description here"
                showSerializedText={hasDescription}
                value={description ?? convertToRteValue(TextStyles.imageCaption, '', 'center')}
            />
        </div>
    );
};
