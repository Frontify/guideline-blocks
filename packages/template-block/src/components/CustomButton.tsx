/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockStyles, RichTextEditor, convertToRteValue, hasRichTextValue } from '@frontify/guideline-blocks-settings';
import { PluginComposer } from '@frontify/fondue';
import { useState } from 'react';
import { CustomButtonProps } from './types';
import { PreviewType } from '../types';

export const CustomButton = ({
    appBridge,
    blockSettings,
    isEditing,
    isDisabled,
    updateBlockSettings,
    handleNewPublication,
}: CustomButtonProps) => {
    const [buttonHover, setButtonHover] = useState<boolean>(false);
    const { buttonText, preview } = blockSettings;
    const blockId = appBridge.context('blockId').get();

    const marginOverwrites = preview === PreviewType.None ? '!tw-m-0' : '!tw-mb-0';

    return (
        <button
            data-test-id="template-block-new-publication-btn"
            disabled={isDisabled}
            onClick={isEditing ? undefined : handleNewPublication}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            className={`disabled:tw-opacity-50 ${marginOverwrites}`}
            style={{
                ...BlockStyles.buttonPrimary,
                ...(buttonHover ? BlockStyles.buttonPrimary?.hover : null),
            }}
        >
            <RichTextEditor
                id={`template-block-new-publication-button-text-${blockId}`}
                value={hasRichTextValue(buttonText) ? buttonText : convertToRteValue('p', 'Use this Template')}
                isEditing={isEditing}
                plugins={new PluginComposer({ noToolbar: true }).setPlugin()}
                onTextChange={(newButtonText) => updateBlockSettings({ buttonText: newButtonText })}
            />
        </button>
    );
};
