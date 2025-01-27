/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    RichTextEditor,
    TextStyles,
    convertToRteValue,
    hasRichTextValue,
    joinClassNames,
} from '@frontify/guideline-blocks-settings';
import { getCaptionPlugins, titlePlugins } from './helpers';
import { AppBridgeBlock } from '@frontify/app-bridge';
import { CaptionPosition, type Ratio, type Settings, textRatioValues } from '../types';

type ImageCaptionProps = {
    blockId: string;
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
    blockId,
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
            <div
                className={joinClassNames([
                    positioning === CaptionPosition.Below && 'tw-mt-3',
                    'tw-gap-1 tw-flex-1 tw-w-full',
                ])}
                data-test-id="image-caption"
            >
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
        </div>
    );
};
