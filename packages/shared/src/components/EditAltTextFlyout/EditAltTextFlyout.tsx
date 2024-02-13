/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject } from 'react';
import {
    Button,
    ButtonEmphasis,
    ButtonSize,
    ButtonStyle,
    Flyout,
    FlyoutPlacement,
    FormControl,
    HelperPosition,
    IconCheckMark16,
    TextInput,
} from '@frontify/fondue';
import React from 'react';
import { EditAltTextFlyoutProps } from './types';

export const EditAltTextFlyout = ({
    setShowAltTextMenu,
    showAltTextMenu,
    setLocalAltText,
    defaultAltText,
    onSave,
    localAltText,
    placement = FlyoutPlacement.BottomLeft,
}: EditAltTextFlyoutProps) => (
    <Flyout
        fitContent
        isTriggerDisabled
        trigger={(_, ref) => (
            <div className="tw-absolute tw-top-0 tw-right-6" ref={ref as MutableRefObject<HTMLDivElement>} />
        )}
        onOpenChange={setShowAltTextMenu}
        hug={false}
        isOpen={showAltTextMenu}
        placement={placement}
        legacyFooter={false}
        fixedFooter={
            <div className="tw-flex tw-gap-x-3 tw-rounded-b tw-justify-end tw-p-4 tw-bg-base tw-border-t tw-border-line">
                <Button
                    style={ButtonStyle.Default}
                    emphasis={ButtonEmphasis.Default}
                    data-test-id="cancel-button"
                    onClick={() => {
                        setLocalAltText(defaultAltText);
                        setShowAltTextMenu(false);
                    }}
                    size={ButtonSize.Medium}
                >
                    Cancel
                </Button>
                <Button
                    style={ButtonStyle.Default}
                    emphasis={ButtonEmphasis.Strong}
                    icon={<IconCheckMark16 />}
                    data-test-id="save-button"
                    onClick={() => {
                        onSave();
                        setShowAltTextMenu(false);
                    }}
                >
                    Save
                </Button>
            </div>
        }
    >
        <div className="tw-flex tw-flex-col tw-p-6 tw-max-w-[320px]" data-test-id="flyout-menu">
            <FormControl
                label={{
                    children: 'Alt text',
                    htmlFor: 'alt-text-input',
                }}
                helper={{
                    text: 'The best alt text describes the most relevant content of the image.',
                    position: HelperPosition.After,
                }}
            >
                <TextInput
                    value={localAltText}
                    onChange={setLocalAltText}
                    id="alt-text-input"
                    placeholder="Enter alt text"
                    data-test-id="alt-text-input"
                />
            </FormControl>
        </div>
    </Flyout>
);
