/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { PLACEHOLDER } from './settings';
import { TextBlock } from './TextBlock';

const RTE_CONTENT_HTML_TEST_ID = 'rte-content-html';
const RICH_TEXT_EDITOR_TEST_ID = 'rich-text-editor';
const TEXT_BLOCK_WRAPPER_TEST_ID = 'text-block-wrapper';

const defaultContent = [
    {
        type: 'p',
        children: [{ text: 'Rich Text Editor Value' }],
    },
];

// RichTextEditor only mounts the editable editor once its container is reported in the viewport;
// happy-dom's IntersectionObserver never fires, so report every observed element as intersecting.
class IntersectingObserver {
    private readonly callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }

    observe(target: Element) {
        this.callback(
            [{ isIntersecting: true, target } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver
        );
    }

    unobserve() {}

    disconnect() {}
}

const renderTextBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [TextBlockWithStubs, appBridge] = withAppBridgeBlockStubs(TextBlock, appBridgeProps);
    const utils = render(<TextBlockWithStubs />);
    return { ...utils, appBridge };
};

describe('Text Block', () => {
    beforeEach(() => {
        vi.stubGlobal('IntersectionObserver', IntersectingObserver);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should render a text block', async () => {
        renderTextBlock({ editorState: true });

        expect(await screen.findByTestId(RICH_TEXT_EDITOR_TEST_ID)).toBeInTheDocument();
    });

    it('should not be able to input to a text block when in view mode', async () => {
        renderTextBlock({ blockSettings: { content: JSON.stringify(defaultContent) } });

        expect(await screen.findByTestId(RTE_CONTENT_HTML_TEST_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(RICH_TEXT_EDITOR_TEST_ID)).not.toBeInTheDocument();
    });

    it('should show the placeholder when there is no content', async () => {
        renderTextBlock({ editorState: true });

        const editor = await screen.findByTestId(RICH_TEXT_EDITOR_TEST_ID);
        await waitFor(() => {
            expect(editor.querySelector('[contenteditable=true]')).toHaveTextContent(PLACEHOLDER);
        });
    });

    it('should render html content when rich text editor content is passed', async () => {
        renderTextBlock({ blockSettings: { content: JSON.stringify(defaultContent) } });

        await waitFor(() => {
            expect(screen.getByTestId(RTE_CONTENT_HTML_TEST_ID)).toHaveTextContent(/^Rich Text Editor Value$/);
        });
    });

    it('should render html content when html is passed', async () => {
        renderTextBlock({ blockSettings: { content: '<p>Html Text</p>' } });

        await waitFor(() => {
            expect(screen.getByTestId(RTE_CONTENT_HTML_TEST_ID)).toHaveTextContent(/^Html Text$/);
        });
    });

    it('should render html content when a plain string is passed', async () => {
        renderTextBlock({ blockSettings: { content: 'string' } });

        await waitFor(() => {
            expect(screen.getByTestId(RTE_CONTENT_HTML_TEST_ID)).toHaveTextContent(/^string$/);
        });
    });

    it('should have a minimum height when editing mode is on', () => {
        renderTextBlock({ editorState: true });

        expect(screen.getByTestId(TEXT_BLOCK_WRAPPER_TEST_ID)).toHaveClass('tw-min-h-9');
    });

    it('should not have a minimum height when editing mode is off', () => {
        renderTextBlock({ editorState: false });

        expect(screen.getByTestId(TEXT_BLOCK_WRAPPER_TEST_ID)).not.toHaveClass('tw-min-h-9');
    });
});
