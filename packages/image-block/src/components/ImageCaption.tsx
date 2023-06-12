/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextStyles } from '@frontify/fondue';
import { RichTextEditor, convertToRteValue, hasRichTextValue } from '@frontify/guideline-blocks-shared';
import { getCaptionPlugins, titlePlugins } from './helpers';
import { AppBridgeBlock, useBlockSettings } from '@frontify/app-bridge';
import { useState } from 'react';
import { Settings } from '../types';

type ImageCaptionProps = {
    blockId: string;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
};

export const ImageCaption = ({ isEditing, blockId, appBridge }: ImageCaptionProps) => {
    const [isApiRequestPending, setIsApiRequestPending] = useState(false);
    const [isApiRequestNamePending, setIsApiRequestNamePending] = useState(false);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const { name, description } = blockSettings;
    const onTitleChange = (value: string) => {
        if (value === name) {
            setIsApiRequestNamePending(false);
        } else {
            setBlockSettings({ name: value }).finally(() => {
                setIsApiRequestNamePending(false);
            });
        }
    };

    const onDescriptionChange = (value: string) => {
        if (value === name) {
            setIsApiRequestPending(false);
        } else {
            setBlockSettings({ description: value }).finally(() => {
                setIsApiRequestPending(false);
            });
        }
    };

    return (
        <div
            className="tw-mt-3 tw-gap-1 tw-flex-1 tw-w-full"
            style={{ wordBreak: 'break-word' }}
            data-test-id="image-caption"
        >
            <RichTextEditor
                id={`${blockId}_title`}
                isEditing={isEditing}
                plugins={titlePlugins}
                placeholder="Asset name"
                showSerializedText={hasRichTextValue(name)}
                value={name ?? convertToRteValue(TextStyles.imageTitle, '', 'center')}
                onTextChange={onTitleChange}
                onBlur={onTitleChange}
                onValueChanged={() => setIsApiRequestNamePending(true)}
                shouldPreventPageLeave={isApiRequestNamePending}
            />
            <RichTextEditor
                id={`${blockId}_description`}
                isEditing={isEditing}
                plugins={getCaptionPlugins(appBridge)}
                onBlur={onDescriptionChange}
                onTextChange={onDescriptionChange}
                placeholder="Add a description here"
                showSerializedText={hasRichTextValue(description)}
                value={description ?? convertToRteValue(TextStyles.imageCaption, '', 'center')}
                onValueChanged={() => setIsApiRequestPending(true)}
                shouldPreventPageLeave={isApiRequestPending}
            />
        </div>
    );
};
