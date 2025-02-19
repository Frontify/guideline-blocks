/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockStyles, RichTextEditor, convertToRteValue, hasRichTextValue } from '@frontify/guideline-blocks-settings';
import { PluginComposer } from '@frontify/fondue';
import { useState } from 'react';
import { CtaButtonProps } from './types';
import { PreviewType } from '../types';

export const CtaButton = ({
    appBridge,
    blockSettings,
    isEditing,
    isDisabled,
    updateBlockSettings,
    handleNewPublication,
}: CtaButtonProps) => {
    const [buttonHover, setButtonHover] = useState<boolean>(false);
    const { buttonText, preview, buttonStyle } = blockSettings;
    const blockId = appBridge.context('blockId').get();

    const marginOverwrites = preview === PreviewType.None ? '!tw-m-0' : '!tw-mb-0';

    const buttonStyles = (() => {
        switch (buttonStyle) {
            case 'primary':
                return BlockStyles.buttonPrimary;
            case 'secondary':
                return BlockStyles.buttonSecondary;
            case 'tertiary':
                return BlockStyles.buttonTertiary;
            default:
                return BlockStyles.buttonPrimary;
        }
    })();

    return (
        <button
            data-test-id="cta-button"
            disabled={isDisabled}
            onClick={isEditing ? undefined : handleNewPublication}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            className={`disabled:tw-opacity-50 ${marginOverwrites} [&>div]:!tw-@container-normal tw-max-w-full`}
            style={{
                ...buttonStyles,
                ...(buttonHover ? buttonStyles?.hover : null),
            }}
        >
            <RichTextEditor
                id={`cta-button-text-${blockId}`}
                value={hasRichTextValue(buttonText) ? buttonText : convertToRteValue('p', 'Use this Template')}
                isEditing={isEditing}
                plugins={new PluginComposer({ noToolbar: true }).setPlugin()}
                onTextChange={(newButtonText) => updateBlockSettings({ buttonText: newButtonText })}
            />
        </button>
    );
};
