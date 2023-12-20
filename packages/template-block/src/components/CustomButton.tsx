/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockStyles, RichTextEditor, convertToRteValue, hasRichTextValue } from '@frontify/guideline-blocks-settings';
import { PluginComposer, merge } from '@frontify/fondue';
import { useState } from 'react';
import { CustomButtonProps } from './types';
import { PreviewType } from '../types';

export const CustomButton = ({
    blockSettings,
    isEditing,
    isDisabled,
    updateBlockSettings,
    handleNewPublication,
}: CustomButtonProps) => {
    const [buttonHover, setButtonHover] = useState<boolean>(false);
    const { buttonText, preview } = blockSettings;

    return (
        <button
            data-test-id="template-block-new-publication-btn"
            disabled={isDisabled}
            onClick={isEditing ? undefined : handleNewPublication}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            className={merge(['disabled:tw-opacity-50', preview === PreviewType.None ? '!tw-mt-0' : '!tw-mb-0'])}
            style={{
                ...BlockStyles.buttonPrimary,
                ...(buttonHover ? BlockStyles.buttonPrimary?.hover : null),
            }}
        >
            <RichTextEditor
                id="template-block-new-publication-button-text"
                value={hasRichTextValue(buttonText) ? buttonText : convertToRteValue('p', 'Use this Template')}
                isEditing={isEditing}
                plugins={new PluginComposer({ noToolbar: true }).setPlugin()}
                onTextChange={(buttonText) => updateBlockSettings({ buttonText })}
            />
        </button>
    );
};
