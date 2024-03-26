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
import { CaptionPosition, type Settings } from '../types';

type ImageCaptionProps = {
    blockId: string;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
    titleKey: string;
    positioning: CaptionPosition;
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
    positioning,
    setBlockSettings,
}: ImageCaptionProps) => {
    return (
        <div
            className={joinClassNames([
                positioning === CaptionPosition.Below && 'tw-mt-3',
                'tw-gap-1 tw-flex-1 tw-w-full',
            ])}
            style={{ wordBreak: 'break-word' }}
            data-test-id="image-caption"
        >
            <RichTextEditor
                key={titleKey}
                id={`${blockId}_title`}
                isEditing={isEditing}
                plugins={titlePlugins}
                placeholder="Asset name"
                showSerializedText={hasRichTextValue(name)}
                value={name ?? convertToRteValue(TextStyles.imageTitle, '', 'center')}
                onTextChange={(name) => setBlockSettings({ name })}
            />
            <RichTextEditor
                id={`${blockId}_description`}
                isEditing={isEditing}
                plugins={getCaptionPlugins(appBridge)}
                onTextChange={(description) => setBlockSettings({ description })}
                placeholder="Add a description here"
                showSerializedText={hasRichTextValue(description)}
                value={description ?? convertToRteValue(TextStyles.imageCaption, '', 'center')}
            />
        </div>
    );
};
