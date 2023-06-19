/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject } from 'react';
import {
    ButtonEmphasis,
    ButtonStyle,
    Flyout,
    FlyoutFooter,
    FlyoutPlacement,
    FormControl,
    HelperPosition,
    IconCheckMark16,
    TextInput,
} from '@frontify/fondue';
import React from 'react';

type EditAltTextFlyoutProps = {
    setShowAltTextMenu: (showAltTextMenu: boolean) => void;
    showAltTextMenu: boolean;
    setLocalAltText: (localAltText: string) => void;
    defaultAltText: string;
    onSave: () => void;
    localAltText: string;
};

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
            <FlyoutFooter
                buttons={[
                    {
                        style: ButtonStyle.Default,
                        emphasis: ButtonEmphasis.Default,
                        children: 'Cancel',
                        onClick: () => {
                            setLocalAltText(defaultAltText);
                            setShowAltTextMenu(false);
                        },
                    },
                    {
                        style: ButtonStyle.Default,
                        emphasis: ButtonEmphasis.Strong,
                        icon: <IconCheckMark16 />,
                        children: 'Save',
                        onClick: () => {
                            onSave;
                            setShowAltTextMenu(false);
                        },
                    },
                ]}
            />
        }
    >
        <div className="tw-flex tw-flex-col tw-p-6 tw-max-w-[20rem]">
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
                    value={localAltText ?? defaultAltText}
                    onChange={setLocalAltText}
                    id="alt-text-input"
                    placeholder="Enter alt text"
                />
            </FormControl>
        </div>
    </Flyout>
);
