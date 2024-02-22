/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextEditor, TextStyles, convertToRteValue, hasRichTextValue } from '@frontify/guideline-blocks-settings';
import { getCaptionPlugins, titlePlugins } from './helpers';
import { AppBridgeBlock, useBlockSettings } from '@frontify/app-bridge';
import { Settings } from '../types';

type ImageCaptionProps = {
    blockId: string;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
    titleKey: string;
};

export const ImageCaption = ({ isEditing, blockId, appBridge, titleKey }: ImageCaptionProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const { name, description } = blockSettings;

    return (
        <div
            className="tw-mt-3 tw-gap-1 tw-flex-1 tw-w-full"
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
