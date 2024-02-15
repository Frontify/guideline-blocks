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
import { useMultiFlyoutState } from '@frontify/guideline-blocks-settings';
import React from 'react';
import {
    type EditAltTextFlyoutFooterProps,
    type EditAltTextFlyoutProps,
    type EditAltTextFlyoutScreenProps,
} from './types';

export const ALT_TEXT_FLYOUT_ID = 'alt-text';

const BaseEditAltTextFlyoutFooter = ({ onCancel, onSave }: EditAltTextFlyoutFooterProps) => (
    <div className="tw-flex tw-gap-x-3 tw-rounded-b tw-justify-end tw-p-4 tw-bg-base tw-border-t tw-border-line">
        <Button
            style={ButtonStyle.Default}
            emphasis={ButtonEmphasis.Default}
            data-test-id="cancel-button"
            onClick={onCancel}
            size={ButtonSize.Medium}
        >
            Cancel
        </Button>
        <Button
            style={ButtonStyle.Default}
            emphasis={ButtonEmphasis.Strong}
            icon={<IconCheckMark16 />}
            data-test-id="save-button"
            onClick={onSave}
        >
            Save
        </Button>
    </div>
);

export const ToolbarEditAltTextFlyoutFooter = ({ onCancel, onSave }: EditAltTextFlyoutFooterProps) => {
    const { onOpenChange } = useMultiFlyoutState(ALT_TEXT_FLYOUT_ID);

    const closeAfterAction = (action: () => void) => () => {
        action();
        onOpenChange(false);
    };

    return <BaseEditAltTextFlyoutFooter onCancel={closeAfterAction(onCancel)} onSave={closeAfterAction(onSave)} />;
};

export const EditAltTextFlyoutScreen = ({ setLocalAltText, localAltText }: EditAltTextFlyoutScreenProps) => (
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
);

export const EditAltTextFlyout = ({
    setShowAltTextMenu,
    showAltTextMenu,
    setLocalAltText,
    defaultAltText,
    onSave,
    localAltText,
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
        placement={FlyoutPlacement.BottomLeft}
        legacyFooter={false}
        fixedFooter={
            <BaseEditAltTextFlyoutFooter
                onCancel={() => {
                    setLocalAltText(defaultAltText);
                    setShowAltTextMenu(false);
                }}
                onSave={() => {
                    onSave();
                    setShowAltTextMenu(false);
                }}
            />
        }
    >
        <EditAltTextFlyoutScreen setLocalAltText={setLocalAltText} localAltText={localAltText} />
    </Flyout>
);
