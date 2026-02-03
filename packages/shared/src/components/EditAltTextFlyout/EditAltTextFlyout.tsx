/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FormControl, HelperPosition } from '@frontify/fondue';
import { Button, Flyout, TextInput } from '@frontify/fondue/components';
import { IconCheckMark } from '@frontify/fondue/icons';
// eslint-disable-next-line no-restricted-syntax
import * as React from 'react';

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

export const EditAltTextFlyoutScreen = ({ setLocalAltText, localAltText }: EditAltTextFlyoutScreenProps) => (
    <div className="tw-flex tw-flex-col" data-test-id="flyout-menu">
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
                onChange={(event) => setLocalAltText(event.target.value)}
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
    <Flyout.Root open={showAltTextMenu}>
        <Flyout.Trigger>
            <div className="tw-absolute tw-top-0 tw-right-6" />
        </Flyout.Trigger>
        <Flyout.Content side="bottom" align="start" padding="comfortable" maxWidth="320px">
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
