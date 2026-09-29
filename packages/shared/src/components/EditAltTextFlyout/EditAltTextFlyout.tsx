/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Flyout, Label, Text, TextInput } from '@frontify/fondue/components';
import { IconCheckMark } from '@frontify/fondue/icons';
// oxlint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { useId } from 'react';

import {
    type EditAltTextFlyoutFooterProps,
    type EditAltTextFlyoutProps,
    type EditAltTextFlyoutScreenProps,
} from './types';

export const ALT_TEXT_FLYOUT_ID = 'alt-text';

export const BaseEditAltTextFlyoutFooter = ({ onCancel, onSave }: EditAltTextFlyoutFooterProps) => (
    <div className="tw-flex tw-gap-x-3 w-justify-end tw-w-full">
        <Button emphasis="default" data-test-id="cancel-button" onPress={onCancel}>
            Cancel
        </Button>
        <Button data-test-id="save-button" onPress={onSave}>
            <IconCheckMark size={16} />
            Save
        </Button>
    </div>
);

export const EditAltTextFlyoutScreen = ({ setLocalAltText, localAltText }: EditAltTextFlyoutScreenProps) => {
    const id = useId();
    const inputId = `${id}-input`;
    const descriptionId = `${id}-description`;

    return (
        <div className="tw-flex tw-flex-col tw-gap-y-2" data-test-id="flyout-menu">
            <Label htmlFor={inputId}>Alt text</Label>
            <TextInput
                value={localAltText}
                onChange={(event) => setLocalAltText(event.target.value)}
                id={inputId}
                placeholder="Enter alt text"
                data-test-id="alt-text-input"
                aria-describedby={descriptionId}
            />
            <Text as="p" id={descriptionId} size="small" color="weak">
                The best alt text describes the most relevant content of the image.
            </Text>
        </div>
    );
};

export const EditAltTextFlyout = ({
    setShowAltTextMenu,
    showAltTextMenu,
    setLocalAltText,
    defaultAltText,
    onSave,
    localAltText,
}: EditAltTextFlyoutProps) => (
    <Flyout.Root open={showAltTextMenu} onOpenChange={setShowAltTextMenu}>
        <Flyout.Trigger>
            <div className="tw-absolute tw-top-0 tw-right-6" />
        </Flyout.Trigger>
        <Flyout.Content
            side="bottom"
            align="start"
            padding="comfortable"
            maxWidth="320px"
            {...{ onFocusOutside: (event: Event) => event.preventDefault() }}
        >
            <Flyout.Body>
                <EditAltTextFlyoutScreen setLocalAltText={setLocalAltText} localAltText={localAltText} />
            </Flyout.Body>
            <Flyout.Footer>
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
            </Flyout.Footer>
        </Flyout.Content>
    </Flyout.Root>
);
