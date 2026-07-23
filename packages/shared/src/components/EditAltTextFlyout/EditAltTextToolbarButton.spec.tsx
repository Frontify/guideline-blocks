/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockItemWrapper } from '@frontify/guideline-blocks-settings';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// oxlint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { getEditAltTextToolbarButton } from './EditAltTextToolbarButton';

import '@frontify/guideline-blocks-settings/styles';
import 'tailwindcss/tailwind.css';

const TOOLBAR_FLYOUT_TEST_ID = 'block-item-wrapper-toolbar-flyout';
const FLYOUT_MENU_TEST_ID = 'flyout-menu';
const CANCEL_BUTTON_TEST_ID = 'cancel-button';
const SAVE_BUTTON_TEST_ID = 'save-button';
const TOOLTIP_TEST_ID = 'fondue-tooltip-content';

const renderToolbar = ({
    setBlockSettings = vi.fn(),
    setLocalAltText = vi.fn(),
    blockSettings = {},
    localAltText = '',
}: {
    setBlockSettings?: (newSettings: { altText: string }) => Promise<void>;
    setLocalAltText?: (localAltText?: string) => void;
    blockSettings?: { altText?: string };
    localAltText?: string;
} = {}) =>
    render(
        <div className="tw-p-20">
            <BlockItemWrapper
                toolbarItems={[
                    getEditAltTextToolbarButton({
                        setBlockSettings,
                        blockSettings,
                        localAltText,
                        setLocalAltText,
                    }),
                ]}
            >
                <div>Block</div>
            </BlockItemWrapper>
        </div>
    );

describe('getEditAltTextToolbarButton', () => {
    it('should display the flyout screen and call setLocalAltText when the user types', async () => {
        const setLocalAltText = vi.fn();
        renderToolbar({ setLocalAltText });

        const flyoutButton = screen.getAllByTestId(TOOLBAR_FLYOUT_TEST_ID)[0];
        await userEvent.click(flyoutButton);
        expect(await screen.findByTestId(FLYOUT_MENU_TEST_ID)).toBeInTheDocument();

        await userEvent.type(screen.getByRole('textbox'), 'text');
        expect(setLocalAltText).toHaveBeenCalled();
    });

    it('should reset localAltText to the saved value when the cancel button is clicked', async () => {
        const OLD_VALUE = 'old-text';
        const setLocalAltText = vi.fn();
        renderToolbar({ setLocalAltText, blockSettings: { altText: OLD_VALUE } });

        const flyoutButton = screen.getAllByTestId(TOOLBAR_FLYOUT_TEST_ID)[0];
        await userEvent.click(flyoutButton);
        expect(await screen.findByTestId(FLYOUT_MENU_TEST_ID)).toBeInTheDocument();

        await userEvent.click(screen.getByTestId(CANCEL_BUTTON_TEST_ID));
        expect(setLocalAltText).toHaveBeenCalledOnce();
        expect(setLocalAltText).toHaveBeenCalledWith(OLD_VALUE);
    });

    it('should update blockSettings with localAltText when the save button is clicked', async () => {
        const NEW_VALUE = 'text';
        const setBlockSettings = vi.fn();
        renderToolbar({ setBlockSettings, blockSettings: { altText: '' }, localAltText: NEW_VALUE });

        const flyoutButton = screen.getAllByTestId(TOOLBAR_FLYOUT_TEST_ID)[0];
        await userEvent.click(flyoutButton);
        expect(await screen.findByTestId(FLYOUT_MENU_TEST_ID)).toBeInTheDocument();

        await userEvent.click(screen.getByTestId(SAVE_BUTTON_TEST_ID));
        expect(setBlockSettings).toHaveBeenCalledOnce();
        expect(setBlockSettings).toHaveBeenCalledWith({ altText: NEW_VALUE });
    });

    it('should render the tooltip with the correct text for the toolbar button', async () => {
        renderToolbar({ blockSettings: { altText: '' }, localAltText: 'text' });

        const flyoutButton = screen.getAllByTestId(TOOLBAR_FLYOUT_TEST_ID)[0];
        await userEvent.hover(flyoutButton);
        const tooltip = await screen.findByTestId(TOOLTIP_TEST_ID);
        expect(tooltip).toHaveTextContent('Set alt text');
    });
});
