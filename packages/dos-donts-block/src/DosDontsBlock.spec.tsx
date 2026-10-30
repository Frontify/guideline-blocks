/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset } from '@frontify/app-bridge';
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge/testing';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DosDontsBlock, DosDontsBlockWrapper } from './DosDontsBlock';
import { DONT_COLOR_DEFAULT_VALUE, DO_COLOR_DEFAULT_VALUE } from './helpers/Color';
import { BlockMode, DoDontSpacing, DoDontStyle, DoDontType, ItemIconChoice } from './types';

import type * as AppBridge from '@frontify/app-bridge';
import type * as GuidelineBlocksShared from '@frontify/guideline-blocks-shared';
const DOS_DONTS_BLOCK = 'dos-donts-block';
const DOS_DONTS_HEADING = 'dos-donts-heading';
const DOS_DONTS_ICON = 'dos-donts-icon';
const RTE_CONTENT_HTML = 'rte-content-html';
const RICH_TEXT_EDITOR = 'rich-text-editor';
const DO_DONT_IMAGE = 'do-dont-image';
const BLOCK_ITEM_WRAPPER = 'block-item-wrapper';
const BLOCK_ITEM_WRAPPER_BUTTON = 'block-item-wrapper-toolbar-btn';

const uploadMocks = vi.hoisted(() => ({
    uploadFile: vi.fn<(files: FileList) => void>(),
    selectedFiles: null as FileList | null,
    results: [] as Asset[],
    doneAll: false,
}));

vi.mock('@frontify/app-bridge', async (importOriginal) => {
    const actual = await importOriginal<typeof AppBridge>();
    return {
        ...actual,
        // Only the block-level picker accepts multiple files; the per-item pickers stay empty.
        useFileInput: ({ multiple }: { multiple?: boolean }) => [
            vi.fn(),
            { selectedFiles: multiple ? uploadMocks.selectedFiles : null },
        ],
        // Like the real hook, hand out a new upload function on every render.
        useAssetUpload: () => [
            (files: FileList) => uploadMocks.uploadFile(files),
            { results: uploadMocks.results, doneAll: uploadMocks.doneAll },
        ],
    };
});

vi.mock('./helpers/Color', async (importOriginal) => {
    return {
        ...(await importOriginal()),
        getDefaultDoColor: vi.fn().mockReturnValue({ r: 0, g: 200, b: 165, a: 1 }),
        getDefaultDontColor: vi.fn().mockReturnValue({ r: 255, g: 55, b: 90, a: 1 }),
    };
});

vi.mock('@frontify/guideline-blocks-shared', async (importOriginal) => {
    const actual = await importOriginal<typeof GuidelineBlocksShared>();
    return {
        ...actual,
        useImageContainer: () => ({
            containerWidth: 300,
            setContainerRef: vi.fn(),
        }),
    };
});

describe("Dos & Don'ts Block", () => {
    it('renders a dos donts block', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: { columns: 2 },
        });

        render(<DosDontsBlockWithStubs />);

        expect(screen.getByTestId(DOS_DONTS_BLOCK)).toBeTruthy();
    });

    it('renders default theme colors from mocked helper', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: {
                columns: 2,
                hasCustomDoColor: false,
                hasCustomDontColor: false,
            },
        });

        render(<DosDontsBlockWithStubs />);

        const headings = screen.getAllByTestId(DOS_DONTS_HEADING);

        expect(getComputedStyle(headings[0]).color).toBe('rgb(0, 200, 165)');
        expect(getComputedStyle(headings[1]).color).toBe('rgb(255, 55, 90)');
    });

    it('renders a dos donts block in view mode', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: { columns: 2 },
        });

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
        });

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
        });

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
        });

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
        });

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
        });

        render(<DosDontsBlockWithStubs />);
        const image = screen.getByTestId(DO_DONT_IMAGE);
        expect(image).toHaveAttribute('alt', 'Alt text');
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
        });

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

    describe('saving items', () => {
        const items = [
            { id: '1', title: 'Saved title', body: '', type: DoDontType.Do },
            { id: '2', title: '', body: '', type: DoDontType.Dont },
        ];

        const renderEditableBlock = () => {
            const [DosDontsBlockWithStubs, appBridge] = withAppBridgeBlockStubs(DosDontsBlock, {
                editorState: true,
                blockSettings: { columns: 2, items },
            });
            render(<DosDontsBlockWithStubs />);
            appBridge.updateBlockSettings.resetHistory();
            return appBridge;
        };

        it('should not save when a title is blurred without changes', async () => {
            const user = userEvent.setup();
            const appBridge = renderEditableBlock();

            await user.click(screen.getByDisplayValue('Saved title'));
            await user.tab();

            expect(appBridge.updateBlockSettings.called).toBe(false);
        });

        it('should save the title once when it is blurred after typing', async () => {
            const user = userEvent.setup();
            const appBridge = renderEditableBlock();

            await user.type(screen.getByDisplayValue('Saved title'), ' changed');

            expect(appBridge.updateBlockSettings.called).toBe(false);

            await user.tab();

            expect(appBridge.updateBlockSettings.calledOnce).toBe(true);
            expect(appBridge.updateBlockSettings.getCall(0).args[0]).toMatchObject({
                items: [{ id: '1', title: 'Saved title changed' }, { id: '2' }],
            });
        });

        it('should not save when a drag starts', async () => {
            const appBridge = renderEditableBlock();

            const [dragHandle] = within(screen.getAllByTestId(BLOCK_ITEM_WRAPPER)[0]).getAllByTestId(
                BLOCK_ITEM_WRAPPER_BUTTON
            );
            dragHandle.focus();
            fireEvent.keyDown(dragHandle, { code: 'Enter', key: 'Enter' });
            await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

            expect(screen.getAllByDisplayValue('Saved title')).toHaveLength(2);
            expect(appBridge.updateBlockSettings.called).toBe(false);
        });
    });

    describe('uploading images', () => {
        beforeEach(() => {
            uploadMocks.uploadFile.mockReset();
            uploadMocks.selectedFiles = null;
            uploadMocks.results = [];
            uploadMocks.doneAll = false;
        });

        it('should upload dropped images only once and add them as items when the upload is done', async () => {
            const user = userEvent.setup();
            const files = [new File([''], 'image.png', { type: 'image/png' })] as unknown as FileList;
            uploadMocks.selectedFiles = files;

            const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlockWrapper, {
                editorState: true,
                blockSettings: { columns: 2, mode: BlockMode.TEXT_AND_IMAGE },
            });

            const { rerender } = render(<DosDontsBlockWithStubs />);

            await user.click(screen.getByRole('button', { name: /add as do$/i }));

            expect(uploadMocks.uploadFile).toHaveBeenCalledOnce();
            expect(uploadMocks.uploadFile).toHaveBeenCalledWith(files);

            uploadMocks.results = [AssetDummy.with(1)];
            uploadMocks.doneAll = true;
            rerender(<DosDontsBlockWithStubs />);

            expect(uploadMocks.uploadFile).toHaveBeenCalledOnce();
            expect(screen.getAllByPlaceholderText('Add a title')).toHaveLength(3);
        });
    });
});
