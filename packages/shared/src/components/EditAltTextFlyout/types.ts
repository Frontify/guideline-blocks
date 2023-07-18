/* (c) Copyright Frontify Ltd., all rights reserved. */

export type EditAltTextFlyoutProps = {
    setShowAltTextMenu: (showAltTextMenu: boolean) => void;
    showAltTextMenu: boolean;
    setLocalAltText: (localAltText?: string) => void;
    /*
     * To reset the alt text to its default value after canceling the flyout.
     */
    defaultAltText?: string;
    onSave: () => void;
    localAltText?: string;
};
