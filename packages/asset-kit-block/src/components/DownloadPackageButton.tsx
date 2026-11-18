/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginComposer } from '@frontify/fondue/rte';
import { BlockStyles, RichTextEditor, convertToRteValue, hasRichTextValue } from '@frontify/guideline-blocks-settings';
import { useState } from 'react';

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
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            type="button"
            data-test-id="asset-kit-block-download-button"
            className="[&>div]:!tw-@container-normal"
            disabled={isDisabled}
            onClick={isEditing ? undefined : onDownload}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                ...BlockStyles.buttonPrimary,
                ...(isHovered ? BlockStyles.buttonPrimary?.hover : null),
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
