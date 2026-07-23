/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy } from '@frontify/app-bridge';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DoDontType } from '../types';

import { DoDontItemWrapper } from './DoDontItemWrapper';

const TOOLBAR_FLYOUT_TEST_ID = 'block-item-wrapper-toolbar-flyout';
const FLYOUT_MENU_TEST_ID = 'flyout-menu';
const SAVE_BUTTON_TEST_ID = 'save-button';

const defaultProps = {
    id: '1',
    type: DoDontType.Do,
    editing: true,
    onRemoveSelf: vi.fn(),
    draggableProps: {},
    isDragging: false,
    replaceWithPlaceholder: false,
    localAltText: undefined,
    setLocalAltText: vi.fn(),
    onUploadClick: vi.fn(),
    onOpenAssetChooser: vi.fn(),
    onChangeItem: vi.fn(),
};

const openMenu = async () => {
    await userEvent.click(screen.getByTestId(TOOLBAR_FLYOUT_TEST_ID));
};

describe('DoDontItemWrapper', () => {
    it('does not render "Replace with upload"/"Replace with asset" when no image is linked', async () => {
        render(
            <DoDontItemWrapper {...defaultProps}>
                <div>content</div>
            </DoDontItemWrapper>
        );
        await openMenu();

        expect(await screen.findByText('Set alt text')).toBeInTheDocument();
        expect(screen.queryByText('Replace with upload')).not.toBeInTheDocument();
        expect(screen.queryByText('Replace with asset')).not.toBeInTheDocument();
    });

    it('renders "Replace with upload"/"Replace with asset" when an image is linked', async () => {
        render(
            <DoDontItemWrapper {...defaultProps} onChangeItem={vi.fn()} linkedImage={AssetDummy.with(1)}>
                <div>content</div>
            </DoDontItemWrapper>
        );

        await openMenu();

        expect(await screen.findByText('Replace with upload')).toBeInTheDocument();
        expect(screen.getByText('Replace with asset')).toBeInTheDocument();
    });

    it('opens the alt text flyout when "Set alt text" is clicked', async () => {
        render(
            <DoDontItemWrapper {...defaultProps} onChangeItem={vi.fn()}>
                <div>content</div>
            </DoDontItemWrapper>
        );

        await openMenu();
        await userEvent.click(await screen.findByText('Set alt text'));

        expect(await screen.findByTestId(FLYOUT_MENU_TEST_ID)).toBeInTheDocument();
    });

    it('calls onChangeItem with the edited alt text when the flyout is saved', async () => {
        const onChangeItem = vi.fn();
        const StatefulWrapper = () => {
            const [localAltText, setLocalAltText] = useState<string | undefined>(undefined);
            return (
                <DoDontItemWrapper
                    {...defaultProps}
                    onChangeItem={onChangeItem}
                    alt=""
                    localAltText={localAltText}
                    setLocalAltText={setLocalAltText}
                >
                    <div>content</div>
                </DoDontItemWrapper>
            );
        };
        render(<StatefulWrapper />);

        await openMenu();
        await userEvent.click(await screen.findByText('Set alt text'));

        const input = await screen.findByRole('textbox');
        await userEvent.type(input, 'new alt text');

        await userEvent.click(screen.getByTestId(SAVE_BUTTON_TEST_ID));

        expect(onChangeItem).toHaveBeenCalledWith('1', { alt: 'new alt text' });
    });

    it('calls onChangeItem with the toggled type when "Change to don\'t" is clicked', async () => {
        const onChangeItem = vi.fn();
        render(
            <DoDontItemWrapper {...defaultProps} type={DoDontType.Do} onChangeItem={onChangeItem}>
                <div>content</div>
            </DoDontItemWrapper>
        );

        await openMenu();
        await userEvent.click(await screen.findByText('Change to "don\'t"'));

        expect(onChangeItem).toHaveBeenCalledWith('1', { type: DoDontType.Dont });
    });

    it('calls onChangeItem with the toggled type when "Change to do" is clicked', async () => {
        const onChangeItem = vi.fn();
        render(
            <DoDontItemWrapper {...defaultProps} type={DoDontType.Dont} onChangeItem={onChangeItem}>
                <div>content</div>
            </DoDontItemWrapper>
        );

        await openMenu();
        await userEvent.click(await screen.findByText('Change to "do"'));

        expect(onChangeItem).toHaveBeenCalledWith('1', { type: DoDontType.Do });
    });
});
