/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockStyles, RichTextEditor, convertToRteValue, hasRichTextValue } from '@frontify/guideline-blocks-settings';
import { PluginComposer, merge } from '@frontify/fondue';
import { useRef, useState } from 'react';
import { CustomButtonProps } from './types';
import { PreviewType } from '../types';

export const CustomButton = ({
    blockSettings,
    isEditing,
    isDisabled,
    updateBlockSettings,
    handleNewPublication,
}: CustomButtonProps) => {
    const screenReaderRef = useRef<HTMLDivElement>(null);
    const [buttonHover, setButtonHover] = useState<boolean>(false);
    const { buttonText, preview } = blockSettings;

    return (
        <button
            data-test-id="template-block-new-publication-btn"
            disabled={isDisabled}
            onClick={isEditing ? undefined : handleNewPublication}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            className={merge(['disabled:tw-opacity-50', preview === PreviewType.None ? '!tw-mt-0' : ''])}
            style={{
                ...BlockStyles.buttonPrimary,
                ...(buttonHover ? BlockStyles.buttonPrimary?.hover : null),
            }}
        >
            <RichTextEditor
                id="asset-kit-block-download-button-text"
                value={hasRichTextValue(buttonText) ? buttonText : convertToRteValue('p', 'Use this Template')}
                isEditing={isEditing}
                plugins={new PluginComposer({ noToolbar: true }).setPlugin()}
                onTextChange={(buttonText) => updateBlockSettings({ buttonText })}
            />
            <span
                data-test-id="asset-kit-block-screen-reader"
                ref={screenReaderRef}
                role="status"
                className="tw-absolute -tw-left-[10000px] tw-top-auto tw-w-1 tw-h-1 tw-overflow-hidden"
            />
        </button>
    );
};
