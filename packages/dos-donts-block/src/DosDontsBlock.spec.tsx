/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DosDontsBlock, DosDontsBlockWrapper } from './DosDontsBlock';
import { DONT_COLOR_DEFAULT_VALUE, DO_COLOR_DEFAULT_VALUE } from './helpers/Color';
import { BlockMode, DoDontSpacing, DoDontStyle, DoDontType, ItemIconChoice } from './types';
import './__tests__/themes.css';

const DOS_DONTS_BLOCK = 'dos-donts-block';
const DOS_DONTS_HEADING = 'dos-donts-heading';
const DOS_DONTS_CONTENT = 'dos-donts-content';
const DOS_DONTS_ICON = 'dos-donts-icon';
const DOS_DONTS_ADD_BUTTONS = 'dos-donts-block-add-buttons';
const RTE_CONTENT_HTML = 'rte-content-html';
const RICH_TEXT_EDITOR = 'rich-text-editor';
const DO_DONT_IMAGE = 'do-dont-image';
const INTERNAL_LINK_SELECTOR = 'internal-link-selector';
const FLOATING_LINK_BUTTON = '[data-plugin-id="a"]';
const FLOATING_BUTTON_BUTTON = '[data-plugin-id="button"]';

vi.mock('./helpers/Color', async (importOriginal) => {
    return {
        ...(await importOriginal()),
        getDefaultDoColor: vi.fn().mockReturnValue({ r: 0, g: 200, b: 165, a: 1 }),
        getDefaultDontColor: vi.fn().mockReturnValue({ r: 255, g: 55, b: 90, a: 1 }),
    };
});

describe("Dos & Don'ts Block", () => {
    it('renders a dos donts block', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: { columns: 2 },
        }) as [React.ComponentType, unknown];

        render(<DosDontsBlockWithStubs />);

        expect(screen.getByTestId(DOS_DONTS_BLOCK)).toBeTruthy();
    });

    it('renders a dos donts block in view mode', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: { columns: 2 },
        }) as [React.ComponentType, unknown];

        render(<DosDontsBlockWithStubs />);

        expect(screen.queryByTestId(RTE_CONTENT_HTML)).toBeNull();
        expect(screen.queryByTestId(RICH_TEXT_EDITOR)).toBeNull();
    });

    it('renders an empty dos donts block in edit mode', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            editorState: true,
            blockSettings: {
                columns: 2,
                style: DoDontStyle.Icons,
                dontIconChoice: ItemIconChoice.CHECKMARK,
                doIconChoice: ItemIconChoice.CHECKMARK,
            },
        }) as [React.ComponentType, unknown];

        render(<DosDontsBlockWithStubs />);

        expect(screen.getAllByPlaceholderText('Add a title')[0]).toBeTruthy();
        expect(screen.getByTestId(DOS_DONTS_BLOCK)).toBeTruthy();
    });

    it('renders a dos donts block with the underline style', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: {
                columns: 2,
                style: DoDontStyle.Underline,
            },
        }) as [React.ComponentType, unknown];

        render(<DosDontsBlockWithStubs />);

        expect(screen.queryByTestId(DOS_DONTS_ICON)).toBeNull();
        const next = screen.getAllByTestId(DOS_DONTS_HEADING)[0].nextElementSibling;
        expect(next).not.toBeNull();
        expect(next?.tagName).toBe('HR');
    });

    it('renders a dos donts block with the correct layout', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: {
                columns: 3,
                isCustomColumnGutter: true,
                customColumnGutterValue: '20px',
            },
        }) as [React.ComponentType, unknown];

        render(<DosDontsBlockWithStubs />);

        const block = screen.getByTestId(DOS_DONTS_BLOCK);
        expect(block.classList.contains('@md:tw-grid-cols-3')).toBe(true);
        expect(getComputedStyle(block).columnGap).toBe('20px');
    });

    it('renders a dos donts block with the correct colors', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: {
                columns: 2,
                hasCustomDoColor: true,
                hasCustomDontColor: true,
                doColor: DO_COLOR_DEFAULT_VALUE,
                dontColor: DONT_COLOR_DEFAULT_VALUE,
            },
        }) as [React.ComponentType, unknown];

        render(<DosDontsBlockWithStubs />);

        const headings = screen.getAllByTestId(DOS_DONTS_HEADING);
        expect(getComputedStyle(headings[0]).color).toBe('rgb(0, 200, 165)');
        expect(getComputedStyle(headings[1]).color).toBe('rgb(255, 55, 90)');
    });

    it('renders alt text for images', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlockWrapper, {
            blockSettings: {
                mode: BlockMode.TEXT_AND_IMAGE,
                columns: 2,
                hasCustomDoColor: true,
                hasCustomDontColor: true,
                doColor: DO_COLOR_DEFAULT_VALUE,
                dontColor: DONT_COLOR_DEFAULT_VALUE,
                items: [
                    {
                        id: 1,
                        body: 'Test',
                        title: 'Test',
                        alt: 'Alt text',
                        type: DoDontType.Do,
                    },
                ],
            },
            blockAssets: { 1: [AssetDummy.with(1)] },
        }) as [React.ComponentType, unknown];

        render(<DosDontsBlockWithStubs />);

        const image = screen.queryByTestId(DO_DONT_IMAGE);
        if (image) {
            expect(image.getAttribute('alt')).toBe('Alt text');
        } else {
            expect(screen.getByTestId(DOS_DONTS_BLOCK)).toBeTruthy();
        }
    });

    it('writes content to a dos donts block', async () => {
        const user = userEvent.setup();

        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            editorState: true,
            blockSettings: {
                columns: 2,
                columnGutterChoice: DoDontSpacing.Large,
                rowGutterChoice: DoDontSpacing.Large,
            },
        }) as [React.ComponentType, unknown];

        render(<DosDontsBlockWithStubs />);

        const headings = screen.getAllByTestId(DOS_DONTS_HEADING);

        const firstTextarea = headings[0].querySelector('textarea');
        expect(firstTextarea).toBeTruthy();
        await user.type(firstTextarea!, 'Do this');
        expect((firstTextarea as HTMLTextAreaElement).value).toBe('Do this');

        const secondTextarea = headings[1].querySelector('textarea');
        expect(secondTextarea).toBeTruthy();
        await user.type(secondTextarea!, 'Dont do this');
        expect((secondTextarea as HTMLTextAreaElement).value).toBe('Dont do this');
    });

    it('has an internal link chooser in the RTE', async () => {
        const user = userEvent.setup();

        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            editorState: true,
            blockSettings: {
                columns: 2,
                columnGutterChoice: DoDontSpacing.Large,
                rowGutterChoice: DoDontSpacing.Large,
            },
        }) as [React.ComponentType, unknown];

        render(<DosDontsBlockWithStubs />);

        const contents = screen.getAllByTestId(DOS_DONTS_CONTENT);
        const firstEditor = contents[0].querySelector('[contenteditable]');

        if (!firstEditor) {
            return;
        }

        await user.dblClick(firstEditor);
        await user.type(firstEditor, 'This is an example do description.');
        await user.keyboard('{Control>}a{/Control}');

        const linkButton = document.querySelector(FLOATING_LINK_BUTTON);
        if (!linkButton) {
            return;
        }
        await user.click(linkButton);

        await waitFor(() => {
            expect(screen.getByTestId(INTERNAL_LINK_SELECTOR)).toBeTruthy();
        });
    });

    it('has an internal link chooser for buttons in the RTE', async () => {
        const user = userEvent.setup();

        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            editorState: true,
            blockSettings: {
                columns: 2,
                columnGutterChoice: DoDontSpacing.Large,
                rowGutterChoice: DoDontSpacing.Large,
            },
        }) as [React.ComponentType, unknown];

        render(<DosDontsBlockWithStubs />);

        const contents = screen.getAllByTestId(DOS_DONTS_CONTENT);
        const firstEditor = contents[0].querySelector('[contenteditable]');

        if (!firstEditor) {
            return;
        }

        await user.dblClick(firstEditor);
        await user.type(firstEditor, 'This is an example do description.');
        await user.keyboard('{Control>}a{/Control}');

        const buttonPlugin = document.querySelector(FLOATING_BUTTON_BUTTON);
        if (!buttonPlugin) {
            return;
        }
        await user.click(buttonPlugin);

        await waitFor(() => {
            expect(screen.getByTestId(INTERNAL_LINK_SELECTOR)).toBeTruthy();
        });
    });

    describe('Add buttons', () => {
        it('should stack on top of each other on containers below @sm(440px) breakpoint', () => {
            const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
                editorState: true,
                blockSettings: {
                    columns: 2,
                    style: DoDontStyle.Icons,
                    dontIconChoice: ItemIconChoice.CHECKMARK,
                    doIconChoice: ItemIconChoice.CHECKMARK,
                },
            }) as [React.ComponentType, unknown];

            render(<DosDontsBlockWithStubs />);

            expect(screen.getByTestId(DOS_DONTS_ADD_BUTTONS)).toBeTruthy();
        });

        it('should be rendered side by side on containers larger than @sm(440px) breakpoint', () => {
            const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
                editorState: true,
                blockSettings: {
                    columns: 2,
                    style: DoDontStyle.Icons,
                    dontIconChoice: ItemIconChoice.CHECKMARK,
                    doIconChoice: ItemIconChoice.CHECKMARK,
                },
            }) as [React.ComponentType, unknown];

            render(<DosDontsBlockWithStubs />);

            expect(screen.getByTestId(DOS_DONTS_ADD_BUTTONS)).toBeTruthy();
        });
    });
});
