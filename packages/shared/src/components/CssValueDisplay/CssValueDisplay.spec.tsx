/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditorView } from '@uiw/react-codemirror';
// oxlint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { CssValueDisplay } from './CssValueDisplay';

const CSS_VALUE_TEST_ID = 'css-value-display';
const COPY_BUTTON_TEST_ID = 'css-value-display-copy-button';

describe('CSS Value Display', () => {
    it('should render the css value', () => {
        render(<CssValueDisplay cssValue="width:100%;" />);
        expect(screen.getByTestId(CSS_VALUE_TEST_ID)).toBeInTheDocument();
    });

    it('should render the default placeholder of the css value', () => {
        render(<CssValueDisplay cssValue="" />);
        expect(screen.getByTestId(CSS_VALUE_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(CSS_VALUE_TEST_ID)).toHaveTextContent('No CSS value');
    });

    it('should render the custom placeholder of the css value', () => {
        const placeholder = 'Test placeholder';
        render(<CssValueDisplay cssValue="" placeholder={placeholder} />);
        expect(screen.getByTestId(CSS_VALUE_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(CSS_VALUE_TEST_ID)).toHaveTextContent(placeholder);
    });

    it('should change the value of the copy button after clicking on it', async () => {
        render(<CssValueDisplay cssValue="" />);
        await userEvent.click(screen.getByTestId(COPY_BUTTON_TEST_ID));
        await waitFor(() => {
            expect(screen.getByTestId(COPY_BUTTON_TEST_ID)).toHaveTextContent('Copied');
        });
    });

    it('should not reconfigure the editor when it re-renders with the same css value', () => {
        const { container, rerender } = render(<CssValueDisplay cssValue="width:100%;" />);
        const view = EditorView.findFromDOM(container.querySelector('.cm-editor') as HTMLElement) as EditorView;
        const dispatch = vi.spyOn(view, 'dispatch');

        rerender(<CssValueDisplay cssValue="width:100%;" />);

        expect(dispatch).not.toHaveBeenCalled();
    });

    it('should show the new css value when it changes', () => {
        const { rerender } = render(<CssValueDisplay cssValue="width:100%;" />);

        rerender(<CssValueDisplay cssValue="height:50%;" />);

        expect(screen.getByTestId(CSS_VALUE_TEST_ID)).toHaveTextContent('height:50%;');
    });
});
