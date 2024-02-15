/* (c) Copyright Frontify Ltd., all rights reserved. */

export type EditAltTextFlyoutScreenProps = {
    setLocalAltText: (localAltText?: string) => void;
    localAltText?: string;
};

export type EditAltTextFlyoutProps = EditAltTextFlyoutScreenProps & {
    onSave: () => void;
    setShowAltTextMenu: (show: boolean) => void;
    showAltTextMenu?: boolean;
    /*
     * To reset the alt text to its default value after canceling the flyout.
     */
    defaultAltText?: string;
};

export type EditAltTextFlyoutFooterProps = {
    onCancel: () => void;
    onSave: () => void;
};
