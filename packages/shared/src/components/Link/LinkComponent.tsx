/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { ButtonSize, Checkbox, CheckboxState, FormControl, TextInput, TooltipPosition } from '@frontify/fondue';
import { LinkSelector } from './LinkSelector';
import React from 'react';

type LinkComponentProps = {
    url?: string;
    info?: string;
    label?: string;
    required?: boolean;
    newTab?: CheckboxState;
    openInNewTab?: boolean;
    onUrlChange?: (value: string) => void;
    onToggleTab?: (checked: boolean) => void;
    isValidUrlOrEmpty?: (url: string) => boolean | undefined;
    appBridge: AppBridgeBlock;
    clearable?: boolean;
    placeholder?: string;
    buttonSize?: ButtonSize;
    hideInternalLinkButton?: boolean;
};

export const LinkComponent = ({
    onUrlChange,
    onToggleTab,
    isValidUrlOrEmpty,
    appBridge,
    clearable,
    placeholder,
    newTab,
    openInNewTab,
    url = '',
    required,
    info,
    label,
    buttonSize,
    hideInternalLinkButton,
}: LinkComponentProps) => {
    const isUrlValid = isValidUrlOrEmpty ? isValidUrlOrEmpty(url) : 'import';
    const checkedState = newTab ?? (openInNewTab ? CheckboxState.Checked : CheckboxState.Unchecked);
    return (
        <div data-test-id="link-component">
            <FormControl
                label={{
                    children: label,
                    htmlFor: 'url',
                    required,
                    tooltip: info ? { content: info, position: TooltipPosition.Top } : undefined,
                }}
            >
                <TextInput
                    id="url"
                    value={url}
                    clearable={clearable}
                    onChange={onUrlChange}
                    placeholder={placeholder ?? 'https://example.com'}
                    focusOnMount
                />
            </FormControl>
            {!isUrlValid && <div className="tw-text-red-65 tw-mt-1 tw-text-s">Please enter a valid URL.</div>}

            {!hideInternalLinkButton && (
                <div className="tw-mt-3">
                    <LinkSelector
                        url={url}
                        appBridge={appBridge}
                        onUrlChange={onUrlChange}
                        buttonSize={buttonSize ?? ButtonSize.Medium}
                    />
                </div>
            )}

            <div className="tw-mt-3">
                <Checkbox value="new-tab" label="Open in new tab" state={checkedState} onChange={onToggleTab} />
            </div>
        </div>
    );
};
