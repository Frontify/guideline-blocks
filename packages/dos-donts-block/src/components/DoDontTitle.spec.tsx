/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DoDontType, type DoDontTitleProps } from '../types';

import DoDontTitle from './DoDontTitle';

const defaultProps: DoDontTitleProps = {
    id: 'item-1',
    type: DoDontType.Do,
    title: 'Title',
    editing: true,
    headingColor: '#000',
    onChangeItem: vi.fn(),
};

describe('DoDontTitle', () => {
    it('should save a title typed without blurring when editing is turned off without a remount', () => {
        const onChangeItem = vi.fn();
        const { rerender } = render(<DoDontTitle {...defaultProps} onChangeItem={onChangeItem} />);

        fireEvent.change(screen.getByDisplayValue('Title'), { target: { value: 'Typed title' } });
        rerender(<DoDontTitle {...defaultProps} onChangeItem={onChangeItem} editing={false} />);

        expect(onChangeItem).toHaveBeenCalledExactlyOnceWith('item-1', { title: 'Typed title' });
    });

    it('should keep the same focused textarea after a blur saves a changed title', () => {
        const onChangeItem = vi.fn();
        const { rerender } = render(<DoDontTitle {...defaultProps} onChangeItem={onChangeItem} />);
        const textarea = screen.getByDisplayValue('Title');

        textarea.focus();
        fireEvent.change(textarea, { target: { value: 'Typed title' } });
        fireEvent.blur(textarea);
        rerender(<DoDontTitle {...defaultProps} onChangeItem={onChangeItem} title="Typed title" />);

        expect(onChangeItem).toHaveBeenCalledExactlyOnceWith('item-1', { title: 'Typed title' });
        expect(screen.getByDisplayValue('Typed title')).toBe(textarea);
        expect(textarea).toHaveFocus();
    });

    it('should not save while typing when onChangeItem changes identity', () => {
        const onChangeItem = vi.fn();
        const { rerender } = render(<DoDontTitle {...defaultProps} onChangeItem={onChangeItem} />);

        fireEvent.change(screen.getByDisplayValue('Title'), { target: { value: 'Typed title' } });
        rerender(<DoDontTitle {...defaultProps} onChangeItem={vi.fn()} />);

        expect(onChangeItem).not.toHaveBeenCalled();
        expect(screen.getByDisplayValue('Typed title')).toBeInTheDocument();
    });

    it('should show a title that changed from outside', () => {
        const { rerender } = render(<DoDontTitle {...defaultProps} />);

        rerender(<DoDontTitle {...defaultProps} title="Updated title" />);

        expect(screen.getByDisplayValue('Updated title')).toBeInTheDocument();
    });
});
