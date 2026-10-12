/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ERROR_MSG } from './settings';
import { StorybookBlock } from './StorybookBlock';
import { StorybookBorderStyle, StorybookHeight, StorybookPosition, StorybookStyle, heights } from './types';

const STORYBOOK_BLOCK_TEST_ID = 'storybook-block';
const EMPTY_WRAPPER_TEST_ID = 'storybook-empty-wrapper';
const IFRAME_TEST_ID = 'storybook-iframe';
const RESIZE_BAR_TEST_ID = 'resize-bar';
const RESIZABLE_CHILDREN_CONTAINER_TEST_ID = 'resizable-children-container';

const EXAMPLE_URL = 'https://beta-fondue-components.frontify.com/?path=/story/tokens--alias-tokens';
const EXAMPLE_COLOR = { red: 22, green: 181, blue: 181, alpha: 1, name: 'Java' };

const renderStorybookBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [StorybookBlockWithStubs, appBridge] = withAppBridgeBlockStubs(StorybookBlock, appBridgeProps);
    const utils = render(<StorybookBlockWithStubs />);
    return { ...utils, appBridge };
};

// happy-dom's MouseEvent ignores `pageY` in its init dict, so define it on the event directly.
const createMouseEvent = (type: string, pageY: number) => {
    const event = new MouseEvent(type, { bubbles: true, cancelable: true, button: 0 });
    Object.defineProperty(event, 'pageY', { value: pageY });
    return event;
};

const dragResizeBar = (fromY: number, toY: number) => {
    const resizeBar = screen.getByTestId(RESIZE_BAR_TEST_ID);
    fireEvent(resizeBar, createMouseEvent('mousedown', fromY));
    fireEvent(resizeBar, createMouseEvent('mousemove', toY));
    fireEvent(resizeBar, createMouseEvent('mouseup', toY));
};

describe('Storybook Block', () => {
    it('should render a storybook block', () => {
        renderStorybookBlock();

        expect(screen.getByTestId(STORYBOOK_BLOCK_TEST_ID)).toBeInTheDocument();
    });

    it('should save a storybook url and show the iframe', async () => {
        renderStorybookBlock({ editorState: true });

        const emptyWrapper = screen.getByTestId(EMPTY_WRAPPER_TEST_ID);
        await userEvent.type(within(emptyWrapper).getByRole('textbox'), EXAMPLE_URL);
        await userEvent.click(within(emptyWrapper).getByRole('button', { name: 'Confirm' }));

        const iframe = await screen.findByTestId(IFRAME_TEST_ID);
        expect(iframe.getAttribute('src')).toContain('beta-fondue-components.frontify.com');
        expect(iframe).toHaveAttribute('loading', 'lazy');
    });

    it('should render the storybook iframe without addons', () => {
        renderStorybookBlock({ blockSettings: { url: EXAMPLE_URL, style: StorybookStyle.Default } });

        expect(screen.getByTestId(IFRAME_TEST_ID).getAttribute('src')).toContain('panel=false');
    });

    it('should render the storybook iframe with the addons panel at the bottom', () => {
        renderStorybookBlock({
            blockSettings: {
                url: EXAMPLE_URL,
                style: StorybookStyle.WithAddons,
                positioning: StorybookPosition.Vertical,
            },
        });

        expect(screen.getByTestId(IFRAME_TEST_ID).getAttribute('src')).toContain('panel=bottom');
    });

    it('should render the storybook iframe with the correct styling', () => {
        renderStorybookBlock({
            blockSettings: {
                url: EXAMPLE_URL,
                hasRadius: true,
                radiusValue: '5px',
                borderColor: EXAMPLE_COLOR,
                borderStyle: StorybookBorderStyle.Dotted,
                borderWidth: '2px',
                heightChoice: StorybookHeight.Small,
            },
        });

        const iframe = screen.getByTestId(IFRAME_TEST_ID);
        expect(iframe).toHaveAttribute('height', heights[StorybookHeight.Small]);
        expect(iframe).toHaveStyle({
            borderStyle: 'dotted',
            borderWidth: '2px',
            borderColor: 'rgb(22, 181, 181)',
            borderRadius: '5px',
        });
    });

    it('should render an error when an invalid url is submitted with enter', async () => {
        renderStorybookBlock({ editorState: true });

        const emptyWrapper = screen.getByTestId(EMPTY_WRAPPER_TEST_ID);
        await userEvent.type(within(emptyWrapper).getByRole('textbox'), 'asdf{Enter}');

        expect(within(emptyWrapper).getByText(ERROR_MSG)).toBeInTheDocument();
    });

    it('should not render the iframe with an invalid url', async () => {
        renderStorybookBlock({ editorState: true, blockSettings: { url: 'asdf' } });

        const emptyWrapper = screen.getByTestId(EMPTY_WRAPPER_TEST_ID);
        await userEvent.click(within(emptyWrapper).getByRole('button', { name: 'Confirm' }));

        expect(within(emptyWrapper).getByText(ERROR_MSG)).toBeInTheDocument();
        expect(screen.queryByTestId(IFRAME_TEST_ID)).not.toBeInTheDocument();
    });

    it('should resize the empty container', async () => {
        renderStorybookBlock({ editorState: true, blockSettings: { url: '', heightChoice: StorybookHeight.Small } });

        const container = screen.getByTestId(RESIZABLE_CHILDREN_CONTAINER_TEST_ID);
        expect(container).toHaveStyle({ height: '200px' });

        dragResizeBar(100, 600);
        await waitFor(() => expect(container).toHaveStyle({ height: '700px' }));

        dragResizeBar(600, 100);
        await waitFor(() => expect(container).toHaveStyle({ height: '200px' }));
    });

    it('should not render the resize bar in view mode', () => {
        renderStorybookBlock({ blockSettings: { url: '', heightChoice: StorybookHeight.Small } });

        expect(screen.queryByTestId(RESIZE_BAR_TEST_ID)).not.toBeInTheDocument();
    });

    it('should resize the iframe and save the new height', async () => {
        renderStorybookBlock({
            editorState: true,
            blockSettings: { url: EXAMPLE_URL, heightChoice: StorybookHeight.Small },
        });

        const container = screen.getByTestId(RESIZABLE_CHILDREN_CONTAINER_TEST_ID);
        expect(container).toHaveStyle({ height: '200px' });

        dragResizeBar(100, 600);

        await waitFor(() => expect(container).toHaveStyle({ height: '700px' }));
        await waitFor(() => expect(screen.getByTestId(IFRAME_TEST_ID)).toHaveAttribute('height', '700px'));
    });
});
