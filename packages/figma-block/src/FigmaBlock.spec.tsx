/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FigmaBlock } from './FigmaBlock';
import { ASSET_ID } from './settings';
import { BlockPreview } from './types';

const MAIN_BLOCK_SELECTOR = 'figma-block';
const EMPTY_BLOCK_SELECTOR = 'figma-empty-block';
const IMAGE_PREVIEW_SELECTOR = 'figma-image-preview';
const LIVE_PREVIEW_SELECTOR = 'figma-live-preview';

describe('Figma Block', () => {
    it('renders a Figma block', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock);

        render(<FigmaBlockWithStubs />);

        expect(screen.getByTestId(MAIN_BLOCK_SELECTOR)).toBeTruthy();
    });

    it('renders a Figma empty block on edit', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock, { editorState: true });

        render(<FigmaBlockWithStubs />);

        expect(screen.getByTestId(EMPTY_BLOCK_SELECTOR)).toBeTruthy();
    });

    it('renders a Figma image preview', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock, {
            blockAssets: {
                [ASSET_ID]: [{ ...AssetDummy.with(345), externalUrl: 'https://picsum.photos/200/200' }],
            },
            editorState: true,
        });

        render(<FigmaBlockWithStubs />);

        expect(screen.getByTestId(IMAGE_PREVIEW_SELECTOR)).toBeTruthy();
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

        expect(screen.getByTestId(LIVE_PREVIEW_SELECTOR)).toBeTruthy();
    });

    it('toggles Figma Live preview Full screen', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock, {
            blockAssets: {
                [ASSET_ID]: [{ ...AssetDummy.with(345), externalUrl: 'https://picsum.photos/200/200' }],
            },
            blockSettings: { figmaPreviewId: BlockPreview.Live, allowFullScreen: true },
            editorState: true,
        });

        render(<FigmaBlockWithStubs />);

        expect(screen.getByTestId(LIVE_PREVIEW_SELECTOR)).toBeTruthy();
    });
});
