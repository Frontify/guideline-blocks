/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { FigmaBlock } from './FigmaBlock';
import { ASSET_ID } from './settings';
import { BlockPreview } from './types';

const MAIN_BLOCK_TEST_ID = 'figma-block';
const EMPTY_BLOCK_TEST_ID = 'figma-empty-block';
const IMAGE_PREVIEW_TEST_ID = 'figma-image-preview';
const LIVE_PREVIEW_TEST_ID = 'figma-live-preview';
const FULL_SCREEN_TEST_ID = 'figma-full-screen';

describe('Figma Block', () => {
    it('renders a Figma block', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock);

        render(<FigmaBlockWithStubs />);

        expect(screen.getByTestId(MAIN_BLOCK_SELECTOR)).toBeInTheDocument();
    });

    it('renders a Figma empty block on edit', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock, { editorState: true });

        render(<FigmaBlockWithStubs />);

        expect(screen.getByTestId(EMPTY_BLOCK_SELECTOR)).toBeInTheDocument();
    });

    it('triggers openAssetChooser mock', async () => {
        const [FigmaBlockWithStubs, appBridge] = withAppBridgeBlockStubs(FigmaBlock, { editorState: true });
        const dispatchSpy = vi.spyOn(appBridge, 'dispatch');
        const user = userEvent.setup();

        render(<FigmaBlockWithStubs />);

        await user.click(screen.getByTestId(EMPTY_BLOCK_SELECTOR));

        expect(dispatchSpy).toHaveBeenCalledWith({
            name: 'openAssetChooser',
            payload: {
                selectedValueId: undefined,
                projectTypes: ['Workspace'],
                objectTypes: ['URL'],
                urlContains: 'https://www.figma',
            },
        });
    });

    it('renders a Figma image preview', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock, {
            blockAssets: {
                [ASSET_ID]: [{ ...AssetDummy.with(345), externalUrl: 'https://picsum.photos/200/200' }],
            },
            editorState: true,
        });

        render(<FigmaBlockWithStubs />);

        expect(screen.getByTestId(IMAGE_PREVIEW_SELECTOR)).toBeInTheDocument();
    });

    it('renders a Figma Live iframe preview', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock, {
            blockAssets: {
                [ASSET_ID]: [{ ...AssetDummy.with(345), externalUrl: 'https://picsum.photos/200/200' }],
            },
            blockSettings: { figmaPreviewId: BlockPreview.Live },
            editorState: true,
        });

        render(<FigmaBlockWithStubs />);

        expect(screen.getByTestId(LIVE_PREVIEW_SELECTOR)).toBeInTheDocument();
    });

    it('toggles Figma Live preview Full screen', async () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock, {
            blockAssets: {
                [ASSET_ID]: [{ ...AssetDummy.with(345), externalUrl: 'https://picsum.photos/200/200' }],
            },
            blockSettings: { figmaPreviewId: BlockPreview.Live, allowFullScreen: true },
            editorState: true,
        });
        const user = userEvent.setup();

        render(<FigmaBlockWithStubs />);

        expect(screen.getByTestId(LIVE_PREVIEW_SELECTOR)).toBeInTheDocument();

        await user.click(within(screen.getByTestId(LIVE_PREVIEW_SELECTOR)).getByRole('button'));

        expect(screen.getByTestId(FULL_SCREEN_SELECTOR)).toBeInTheDocument();

        await user.click(within(screen.getByTestId(FULL_SCREEN_SELECTOR)).getByRole('button'));

        expect(screen.queryByTestId(FULL_SCREEN_SELECTOR)).not.toBeInTheDocument();
        expect(screen.getByTestId(LIVE_PREVIEW_SELECTOR)).toBeInTheDocument();
    });
});
