/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginComposer } from '@frontify/fondue/rte';
import { BlockStyles, RichTextEditor, convertToRteValue, hasRichTextValue } from '@frontify/guideline-blocks-settings';
import { useCallback, useState } from 'react';

import { PreviewType } from '../types';

import { type CtaButtonProps } from './types';

const buttonPlugins = new PluginComposer({ noToolbar: true }).setPlugin();

export const CtaButton = ({
    blockSettings,
    isEditing,
    isDisabled,
    updateBlockSettings,
    handleNewPublication,
}: CtaButtonProps) => {
    const [buttonHover, setButtonHover] = useState<boolean>(false);
    const { buttonText, preview, buttonStyle } = blockSettings;

    const onButtonTextChange = useCallback(
        (newButtonText: string) => updateBlockSettings({ buttonText: newButtonText }),
        [updateBlockSettings]
    );

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
            type="button"
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
                value={hasRichTextValue(buttonText) ? buttonText : convertToRteValue('p', 'Use this Template')}
                isEditing={isEditing}
                plugins={buttonPlugins}
                onTextChange={onButtonTextChange}
            />
        </button>
    );
};
