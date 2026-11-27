/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginComposer } from '@frontify/fondue/rte';
import {
    BlockStyles,
    RichTextEditor,
    convertToRteValue,
    hasRichTextValue,
    joinClassNames,
} from '@frontify/guideline-blocks-settings';
import { type CSSProperties } from 'react';

import { type DownloadPackageButtonProps } from '../types';

const buttonPlugins = new PluginComposer({ noToolbar: true }).setPlugin();

const { hover: buttonPrimaryHover, ...buttonPrimaryStyles } = BlockStyles.buttonPrimary ?? {};

const buttonHoverVariables = {
    '--asset-kit-button-hover-background': buttonPrimaryHover?.backgroundColor ?? buttonPrimaryStyles.backgroundColor,
    '--asset-kit-button-hover-border': buttonPrimaryHover?.borderColor ?? buttonPrimaryStyles.borderColor,
    '--asset-kit-button-hover-color': buttonPrimaryHover?.color ?? buttonPrimaryStyles.color,
} as CSSProperties;

const buttonClassNames = joinClassNames([
    '[&>div]:!tw-@container-normal',
    'enabled:hover:!tw-bg-[color:var(--asset-kit-button-hover-background)]',
    'enabled:hover:!tw-border-[color:var(--asset-kit-button-hover-border)]',
    'enabled:hover:!tw-text-[color:var(--asset-kit-button-hover-color)]',
    'focus-visible:!tw-bg-[color:var(--asset-kit-button-hover-background)]',
    'focus-visible:!tw-border-[color:var(--asset-kit-button-hover-border)]',
    'focus-visible:!tw-text-[color:var(--asset-kit-button-hover-color)]',
]);

export const DownloadPackageButton = ({
    buttonText,
    isDisabled,
    isEditing,
    onButtonTextChange,
    onDownload,
    screenReaderRef,
}: DownloadPackageButtonProps) => {
    return (
        <button
            type="button"
            data-test-id="asset-kit-block-download-button"
            className={buttonClassNames}
            disabled={isDisabled}
            onClick={isEditing ? undefined : onDownload}
            style={{
                ...buttonPrimaryStyles,
                ...buttonHoverVariables,
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
