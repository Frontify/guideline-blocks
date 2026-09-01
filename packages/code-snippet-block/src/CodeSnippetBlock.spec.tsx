/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { type Color, Radius } from '@frontify/guideline-blocks-settings';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { CodeSnippetBlock } from './CodeSnippetBlock';

import type * as GuidelineBlocksShared from '@frontify/guideline-blocks-shared';

vi.mock('./styles.css', () => ({}));
vi.mock('@frontify/guideline-blocks-shared', async () => {
    const actual = await vi.importActual<typeof GuidelineBlocksShared>('@frontify/guideline-blocks-shared');
    return {
        ...actual,
        StyleProvider: ({ children }: { children: ReactNode }) => children,
    };
});

const CODE_SNIPPET_BLOCK_TEST_ID = 'code-snippet-block';
const CODE_SNIPPET_HEADER_TEST_ID = 'code-snippet-header';
const HEADER_COPY_BUTTON_TEST_ID = 'header-copy-button';
const COPY_BUTTON_TEST_ID = 'copy-button';
const SELECT_TEST_ID = 'fondue-select';
const SELECT_ITEM_TEST_ID = 'fondue-select-item';
const TOOLTIP_CONTENT_TEST_ID = 'fondue-tooltip-content';

const EDITOR_SELECTOR = '.cm-editor';
const LINE_NUMBERS_SELECTOR = '.cm-lineNumbers';
const LINE_TOKEN_SELECTOR = '.cm-line span';

const EXAMPLE_COLOR: Color = { red: 22, green: 181, blue: 181, name: 'Java' };

const renderCodeSnippetBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [CodeSnippetBlockWithStubs, appBridge] = withAppBridgeBlockStubs(CodeSnippetBlock, appBridgeProps);
    const utils = render(<CodeSnippetBlockWithStubs />);
    return { ...utils, appBridge };
};

describe('Code Snippet Block', () => {
    it('should render a basic code snippet block', () => {
        renderCodeSnippetBlock();

        expect(screen.getByTestId(CODE_SNIPPET_BLOCK_TEST_ID)).toBeInTheDocument();
    });

    it('should render with the Github Dark theme', () => {
        const { container } = renderCodeSnippetBlock({ blockSettings: { theme: 'githubDark' } });

        const editor = container.querySelector(EDITOR_SELECTOR);

        expect(editor).not.toBeNull();
        expect(getComputedStyle(editor as Element).backgroundColor).toBe('#0d1117');
    });

    it('should not render the heading panel when it is disabled', () => {
        renderCodeSnippetBlock({ blockSettings: { withHeading: false } });

        expect(screen.queryByTestId(CODE_SNIPPET_HEADER_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render the heading panel with the selected language', () => {
        renderCodeSnippetBlock({ blockSettings: { withHeading: true, language: 'typescript' } });

        expect(screen.getByTestId(CODE_SNIPPET_HEADER_TEST_ID)).toHaveTextContent('TypeScript');
    });

    it('should render line numbers when they are enabled', () => {
        const { container } = renderCodeSnippetBlock({ blockSettings: { withRowNumbers: true } });

        expect(container.querySelector(LINE_NUMBERS_SELECTOR)).not.toBeNull();
    });

    it('should not render line numbers when they are disabled', () => {
        const { container } = renderCodeSnippetBlock({ blockSettings: { withRowNumbers: false } });

        expect(container.querySelector(LINE_NUMBERS_SELECTOR)).toBeNull();
    });

    it('should render with a border', () => {
        renderCodeSnippetBlock({
            blockSettings: {
                hasBorder: true,
                borderWidth: '2px',
                borderStyle: 'Solid',
                borderColor: EXAMPLE_COLOR,
            },
        });

        expect(screen.getByTestId(CODE_SNIPPET_BLOCK_TEST_ID)).toHaveStyle({
            border: '2px solid rgb(22, 181, 181)',
        });
    });

    it('should render with a border radius', () => {
        renderCodeSnippetBlock({
            blockSettings: {
                borderColor: EXAMPLE_COLOR,
                hasExtendedCustomRadius: false,
                extendedRadiusChoice: Radius.Large,
            },
        });

        expect(screen.getByTestId(CODE_SNIPPET_BLOCK_TEST_ID)).toHaveStyle({ borderRadius: '12px' });
    });

    it('should render with a custom border radius', () => {
        renderCodeSnippetBlock({
            blockSettings: {
                borderRadius: '12px',
                borderColor: EXAMPLE_COLOR,
                hasExtendedCustomRadius: true,
                extendedRadiusTopLeft: '5px',
                extendedRadiusTopRight: '2px',
                extendedRadiusBottomRight: '10px',
                extendedRadiusBottomLeft: '8px',
            },
        });

        expect(screen.getByTestId(CODE_SNIPPET_BLOCK_TEST_ID)).toHaveStyle({
            borderRadius: '5px 2px 10px 8px',
        });
    });

    it('should render syntax highlighting for javascript', () => {
        const { container } = renderCodeSnippetBlock({
            blockSettings: { language: 'javascript', content: 'const a = 1;' },
        });

        const tokens = container.querySelectorAll(LINE_TOKEN_SELECTOR);

        expect(getComputedStyle(tokens[0]).color).toBe('#708');
        expect(getComputedStyle(tokens[1]).color).toBe('#00f');
    });

    it('should switch the language from the dropdown inside the block', async () => {
        const user = userEvent.setup();
        renderCodeSnippetBlock({
            editorState: true,
            blockSettings: { withHeading: true, language: 'html' },
        });

        expect(screen.getByTestId(SELECT_TEST_ID)).toHaveTextContent('HTML');

        await user.click(screen.getByTestId(SELECT_TEST_ID));
        await user.click(
            screen.getAllByTestId(SELECT_ITEM_TEST_ID).find((item) => item.textContent === 'JavaScript') as HTMLElement
        );

        await waitFor(() => {
            expect(screen.getByTestId(SELECT_TEST_ID)).toHaveTextContent('JavaScript');
        });
    });

    it('should copy the content using the copy button in the header', async () => {
        const user = userEvent.setup();
        const content = 'const a = 1;';
        renderCodeSnippetBlock({
            editorState: true,
            blockSettings: { withHeading: true, language: 'javascript', content },
        });

        const copyButton = screen.getByTestId(HEADER_COPY_BUTTON_TEST_ID);

        expect(copyButton).toHaveTextContent('Copy');

        await user.click(copyButton);

        await waitFor(() => {
            expect(screen.getByTestId(HEADER_COPY_BUTTON_TEST_ID)).toHaveTextContent('Copied');
        });
        expect(await navigator.clipboard.readText()).toBe(content);
    });

    it('should copy the content using the copy button without a header', async () => {
        const user = userEvent.setup();
        const content = `const counter = function() {
         let count = 0;
            return function() {
               return ++count;
            }
        };`;
        renderCodeSnippetBlock({
            editorState: true,
            blockSettings: { language: 'javascript', content },
        });

        const copyButton = screen.getByTestId(COPY_BUTTON_TEST_ID);

        await user.hover(copyButton);

        await waitFor(() => {
            expect(screen.getByTestId(TOOLTIP_CONTENT_TEST_ID)).toHaveTextContent('Copy to clipboard');
        });

        await user.click(copyButton);

        expect(await navigator.clipboard.readText()).toBe(content);
        await waitFor(() => {
            expect(screen.getByTestId(TOOLTIP_CONTENT_TEST_ID)).toHaveTextContent('Copied');
        });
    });
});
