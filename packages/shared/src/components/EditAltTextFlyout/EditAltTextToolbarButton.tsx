/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { IconSpeechBubbleQuote16 } from '@frontify/fondue';
import { ALT_TEXT_FLYOUT_ID, BaseEditAltTextFlyoutFooter, EditAltTextFlyoutScreen } from './EditAltTextFlyout';
import { EditAltTextFlyoutFooterProps, EditAltTextFlyoutScreenProps } from './types';
import { FlyoutToolbarButtonProps, useMultiFlyoutState } from '@frontify/guideline-blocks-settings';

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
    icon: <IconSpeechBubbleQuote16 />,
    flyoutId: ALT_TEXT_FLYOUT_ID,
});
