/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginComposer } from '@frontify/fondue/rte';
import { BlockStyles, RichTextEditor, convertToRteValue, hasRichTextValue } from '@frontify/guideline-blocks-settings';

import { type DownloadPackageButtonProps } from '../types';

const buttonPlugins = new PluginComposer({ noToolbar: true }).setPlugin();

export const DownloadPackageButton = ({
    buttonText,
    isDisabled,
    isEditing,
    onButtonTextChange,
    onDownload,
    screenReaderRef,
}: DownloadPackageButtonProps) => {
    const { hover: _hover, ...buttonPrimaryStyles } = BlockStyles.buttonPrimary;

    return (
        <button
            type="button"
            data-test-id="asset-kit-block-download-button"
            className="[&>div]:!tw-@container-normal hover:!tw-bg-[color:var(--f-theme-settings-button-primary-background-color-hover)] hover:!tw-border-[color:var(--f-theme-settings-button-primary-border-color-hover)] hover:!tw-text-[color:var(--f-theme-settings-button-primary-color-hover)]"
            disabled={isDisabled}
            onClick={isEditing ? undefined : onDownload}
            style={{
                ...buttonPrimaryStyles,
                ...(isDisabled ? { opacity: 0.5 } : null),
                overflow: 'visible',
            }}
        >
            <RichTextEditor
                value={hasRichTextValue(buttonText) ? buttonText : convertToRteValue('p', 'Download package')}
                isEditing={isEditing}
                plugins={buttonPlugins}
                onTextChange={onButtonTextChange}
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
