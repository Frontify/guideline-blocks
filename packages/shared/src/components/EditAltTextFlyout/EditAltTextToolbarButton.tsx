/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSpeechBubbleQuote } from '@frontify/fondue/icons';
import { type FlyoutToolbarButtonProps, useMultiFlyoutState } from '@frontify/guideline-blocks-settings';
// eslint-disable-next-line no-restricted-syntax
import * as React from 'react';

import { ALT_TEXT_FLYOUT_ID, BaseEditAltTextFlyoutFooter, EditAltTextFlyoutScreen } from './EditAltTextFlyout';
import { type EditAltTextFlyoutFooterProps, type EditAltTextFlyoutScreenProps } from './types';

const EditAltTextFlyoutToolbarFooter = ({ onCancel, onSave }: EditAltTextFlyoutFooterProps) => {
    const { onOpenChange } = useMultiFlyoutState(ALT_TEXT_FLYOUT_ID);

    const closeAfterAction = (action: () => void) => () => {
        action();
        onOpenChange(false);
    };

    return <BaseEditAltTextFlyoutFooter onCancel={closeAfterAction(onCancel)} onSave={closeAfterAction(onSave)} />;
};

export const getEditAltTextToolbarButton = <T extends { altText?: string }>({
    blockSettings,
    setBlockSettings,
    localAltText,
    setLocalAltText,
}: EditAltTextFlyoutScreenProps & {
    blockSettings: T;
    setBlockSettings: (newSettings: { altText: string }) => Promise<void>;
}): FlyoutToolbarButtonProps & { type: 'flyout' } => ({
    type: 'flyout',
    tooltip: 'Set alt text',
    content: <EditAltTextFlyoutScreen localAltText={localAltText} setLocalAltText={setLocalAltText} />,
    flyoutFooter: (
        <EditAltTextFlyoutToolbarFooter
            onCancel={() => {
                setLocalAltText(blockSettings.altText);
            }}
            onSave={() => setBlockSettings({ altText: localAltText || '' })}
        />
    ),
    icon: <IconSpeechBubbleQuote size={16} />,
    flyoutId: ALT_TEXT_FLYOUT_ID,
});
