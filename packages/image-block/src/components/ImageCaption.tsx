/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import { RichTextEditor, TextStyles, convertToRteValue, hasRichTextValue } from '@frontify/guideline-blocks-settings';
import { useCallback, useMemo } from 'react';

import { CaptionPosition, type Ratio, type Settings, textRatioValues } from '../types';

import { getCaptionPlugins, titlePlugins } from './helpers';

type ImageCaptionProps = {
    isEditing: boolean;
    appBridge: AppBridgeBlock;
    titleKey: string;
    positioning: CaptionPosition;
    name?: string;
    description?: string;
    setBlockSettings: (newBlockSettings: Partial<Settings>) => void;
    ratio: Ratio;
};

export const ImageCaption = ({
    isEditing,
    appBridge,
    titleKey,
    description,
    name,
    positioning,
    ratio,
    setBlockSettings,
}: ImageCaptionProps) => {
    const hasTitle = hasRichTextValue(name);
    const hasDescription = hasRichTextValue(description);
    const captionPlugins = useMemo(() => getCaptionPlugins(appBridge), [appBridge]);
    const onNameChange = useCallback((name: string) => setBlockSettings({ name }), [setBlockSettings]);
    const onDescriptionChange = useCallback(
        (description: string) => setBlockSettings({ description }),
        [setBlockSettings]
    );

    if (!isEditing && !hasTitle && !hasDescription) {
        return null;
    }

    return (
        <div
            className={
                positioning === CaptionPosition.Above || positioning === CaptionPosition.Below
                    ? 'tw-w-full'
                    : textRatioValues[ratio]
            }
        >
            <div className="tw-gap-1 tw-flex-1 tw-w-full" data-test-id="image-caption">
                <RichTextEditor
                    key={titleKey}
                    isEditing={isEditing}
                    plugins={titlePlugins}
                    placeholder="Asset name"
                    showSerializedText={hasTitle}
                    value={name ?? convertToRteValue(TextStyles.imageTitle, '', 'center')}
                    onTextChange={onNameChange}
                />
                <RichTextEditor
                    isEditing={isEditing}
                    plugins={captionPlugins}
                    onTextChange={onDescriptionChange}
                    placeholder="Add a description here"
                    showSerializedText={hasDescription}
                    value={description ?? convertToRteValue(TextStyles.imageCaption, '', 'center')}
                />
            </div>
        </div>
    );
};
