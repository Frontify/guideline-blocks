/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// oxlint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { EditAltTextFlyout, EditAltTextFlyoutScreen } from './EditAltTextFlyout';

const FLYOUT_MENU_TEST_ID = 'flyout-menu';
const SAVE_BUTTON_TEST_ID = 'save-button';
const CANCEL_BUTTON_TEST_ID = 'cancel-button';

describe('EditAltTextFlyout', () => {
    it('should render a flyout with the provided localAltText and call onSave when the save button is clicked', async () => {
        const onSave = vi.fn();
        const setShowAltTextMenu = vi.fn();
        render(
            <EditAltTextFlyout
                onSave={onSave}
                setLocalAltText={vi.fn()}
                setShowAltTextMenu={setShowAltTextMenu}
                showAltTextMenu
                defaultAltText="default alt text"
                localAltText="local alt text"
            />
        );

        expect(screen.getByTestId(FLYOUT_MENU_TEST_ID)).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveValue('local alt text');

        await userEvent.click(screen.getByTestId(SAVE_BUTTON_TEST_ID));
        expect(onSave).toHaveBeenCalledOnce();
        expect(setShowAltTextMenu).toHaveBeenCalledWith(false);
    });

    it('should reset the alt text to its default value after canceling the flyout', async () => {
        const setLocalAltText = vi.fn();
        const setShowAltTextMenu = vi.fn();
        render(
            <EditAltTextFlyout
                onSave={vi.fn()}
                setLocalAltText={setLocalAltText}
                setShowAltTextMenu={setShowAltTextMenu}
                showAltTextMenu
                defaultAltText="default alt text"
                localAltText="local alt text"
            />
        );

        await userEvent.click(screen.getByTestId(CANCEL_BUTTON_TEST_ID));
        expect(setLocalAltText).toHaveBeenCalledWith('default alt text');
        expect(setShowAltTextMenu).toHaveBeenCalledWith(false);
    });

    it('should call setLocalAltText with an empty string when the input is cleared', async () => {
        const setLocalAltText = vi.fn();
        render(
            <EditAltTextFlyout
                onSave={vi.fn()}
                setLocalAltText={setLocalAltText}
                setShowAltTextMenu={vi.fn()}
                showAltTextMenu
                defaultAltText="default alt text"
                localAltText="local alt text"
            />
        );

        await userEvent.clear(screen.getByRole('textbox'));
        expect(setLocalAltText).toHaveBeenCalledWith('');
    });

    it('should call setLocalAltText with the typed value when the user types in the input', async () => {
        const setLocalAltText = vi.fn();
        render(
            <EditAltTextFlyout
                onSave={vi.fn()}
                setLocalAltText={setLocalAltText}
                setShowAltTextMenu={vi.fn()}
                showAltTextMenu
                defaultAltText="default alt text"
                localAltText=""
            />
        );

        await userEvent.type(screen.getByRole('textbox'), 'N');
        expect(setLocalAltText).toHaveBeenCalledWith('N');
    });

    it('should label the input and describe it with the helper text', () => {
        render(<EditAltTextFlyoutScreen setLocalAltText={vi.fn()} localAltText="" />);

        const input = screen.getByRole('textbox', { name: 'Alt text' });
        expect(input).toHaveAccessibleDescription(
            'The best alt text describes the most relevant content of the image.'
        );
    });

    it('should not share input ids between multiple instances', () => {
        render(
            <>
                <EditAltTextFlyoutScreen setLocalAltText={vi.fn()} localAltText="" />
                <EditAltTextFlyoutScreen setLocalAltText={vi.fn()} localAltText="" />
            </>
        );

        const [firstInput, secondInput] = screen.getAllByRole('textbox', { name: 'Alt text' });
        expect(firstInput.id).not.toBe(secondInput.id);
    });
});
