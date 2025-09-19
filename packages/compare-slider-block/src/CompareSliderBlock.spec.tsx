/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { CompareSliderBlock } from './CompareSliderBlock';
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { convertToRteValue } from '@frontify/guideline-blocks-settings';

const CompareSliderBlockSelector = 'compare-slider-block';
const CompareSliderSelector = 'compare-slider-block-slider';
const BlockInjectButtonSelector = 'block-inject-button';
const LabelWrapperSelector = 'compare-slider-block-label-wrapper';
const StrikethroughWrapperSelector = 'compare-slider-block-strikethrough-wrapper';
const FirstAssetSelector = 'slider-item-first';
const FirstAssetWrapper = 'slider-item-container-first';
const SecondAssetSelector = 'slider-item-second';
const SecondAssetWrapper = 'slider-item-container-second';
const RteContentSelector = 'rte-content-html';

describe('Compare Slider Block', () => {
    it('should render a compare slider block', () => {
        const [CompareSliderBlockStub] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockSettings: {
                firstAssetHasStrikethrough: true,
            },
        });
        const { getByTestId } = render(<CompareSliderBlockStub />);
        expect(getByTestId(CompareSliderBlockSelector)).toBeInTheDocument();
    });

    it('should render upload buttons if there are no assets uploaded yet', () => {
        const [CompareSliderBlockStub] = withAppBridgeBlockStubs(CompareSliderBlock, { editorState: true });
        const { getAllByTestId } = render(<CompareSliderBlockStub />);
        expect(getAllByTestId(BlockInjectButtonSelector)).toHaveLength(2);
    });

    it('should render upload buttons if there is only one asset uploaded', async () => {
        const [CompareSliderBlockStub] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [{ ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200' }],
            },
            editorState: true,
        });
        const { getAllByTestId } = render(<CompareSliderBlockStub />);
        await waitFor(() => {
            expect(getAllByTestId(BlockInjectButtonSelector)).toHaveLength(1);
        });
    });

    it('should render the compare slider if there are two assets uploaded', async () => {
        const [CompareSliderBlockStub] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [
                    { ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
                secondAsset: [
                    { ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
            },
            editorState: true,
        });
        const { getByTestId } = render(<CompareSliderBlockStub />);

        await waitFor(() => {
            expect(getByTestId(CompareSliderSelector)).toBeInTheDocument();
        });
    });

    it('should not render label in view mode if no content exists', async () => {
        const [CompareSliderBlockStub] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [
                    { ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
                secondAsset: [
                    { ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
            },
            editorState: false,
        });
        const { getByTestId } = render(<CompareSliderBlockStub />);

        await waitFor(() => {
            expect(getByTestId(CompareSliderSelector)).toBeInTheDocument();
        });
    });

    it('should render label in view mode if content exists', async () => {
        const [CompareSliderBlockStub] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [{ ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200' }],
                secondAsset: [{ ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200' }],
            },
            blockSettings: {
                firstAssetLabel: convertToRteValue(undefined, 'first Asset Label'),
            },
            editorState: false,
        });

        const { getByTestId } = render(<CompareSliderBlockStub />);
        await waitFor(() => {
            expect(getByTestId(RteContentSelector)).toHaveTextContent('first Asset Label');
        });
    });

    it('should not render 2 labels in view mode if no content exists', async () => {
        const [CompareSliderBlockStub] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [
                    { ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
                secondAsset: [
                    { ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
            },
            blockSettings: {
                firstAssetLabel: convertToRteValue(undefined, 'Test'),
                secondAssetLabel: convertToRteValue(undefined, 'Test2'),
            },
            editorState: false,
        });
        const { getAllByTestId } = render(<CompareSliderBlockStub />);
        await waitFor(() => {
            expect(getAllByTestId(RteContentSelector)).toHaveLength(2);
            expect(getAllByTestId(RteContentSelector)[0]).toHaveTextContent('Test');
            expect(getAllByTestId(RteContentSelector)[1]).toHaveTextContent('Test2');
        });
    });

    it('should render 2 labels in edit mode', async () => {
        const [CompareSliderBlockStub] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [
                    { ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
                secondAsset: [
                    { ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
            },
            editorState: true,
        });
        const { getAllByTestId } = render(<CompareSliderBlockStub />);
        await waitFor(() => {
            expect(getAllByTestId(LabelWrapperSelector)).toHaveLength(2);
        });
    });

    it('should not render a strikethrough line', async () => {
        const [CompareSliderBlockStub] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [
                    { ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
                secondAsset: [
                    { ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
            },
            blockSettings: {
                firstAssetHasStrikethrough: true,
            },
        });
        const { getByTestId } = render(<CompareSliderBlockStub />);
        await waitFor(() => {
            expect(getByTestId(StrikethroughWrapperSelector)).toBeInTheDocument();
        });
    });

    it('should render the alt texts as empty by default', async () => {
        const [CompareSliderBlockStub] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [
                    { ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
                secondAsset: [
                    { ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
            },
            blockSettings: {
                firstAssetAlt: 'First alt text',
                secondAssetAlt: 'Second alt text',
            },
            editorState: true,
        });
        const { getByTestId } = render(<CompareSliderBlockStub />);

        await waitFor(() => {
            expect(getByTestId(FirstAssetSelector)).toBeInTheDocument();
            expect(getByTestId(FirstAssetSelector)).toHaveAttribute('alt', 'First alt text');
            expect(getByTestId(SecondAssetSelector)).toBeInTheDocument();
            expect(getByTestId(SecondAssetSelector)).toHaveAttribute('alt', 'Second alt text');
        });
    });

    it('should calculate the aspect ratio based on the image aspect ratio if height setting is set to auto', async () => {
        const [CompareSliderBlockStub] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [
                    { ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/100', width: 200, height: 100 },
                ],
                secondAsset: [
                    { ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
            },
            blockSettings: {
                height: 'auto',
            },
            editorState: true,
        });
        const { getByTestId } = render(<CompareSliderBlockStub />);

        await waitFor(() => {
            expect(getByTestId(FirstAssetSelector)).toBeInTheDocument();
            expect(getByTestId(FirstAssetWrapper)).toHaveStyle({ aspectRatio: '1 / 1' });
            expect(getByTestId(SecondAssetSelector)).toBeInTheDocument();
            expect(getByTestId(SecondAssetWrapper)).toHaveStyle({ aspectRatio: '1 / 1' });
        });
    });

    it('should set height correctly if custom height is set 242px', async () => {
        const customHeight = '242px';
        const [CompareSliderBlockStub] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [
                    { ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/100', width: 200, height: 100 },
                ],
                secondAsset: [
                    { ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200', width: 200, height: 200 },
                ],
            },
            blockSettings: {
                hasCustomHeight: true,
                customHeight,
            },
            editorState: true,
        });
        const { getByTestId } = render(<CompareSliderBlockStub />);

        await waitFor(() => {
            expect(getByTestId(FirstAssetSelector)).toBeInTheDocument();
            expect(getByTestId(CompareSliderSelector)).toHaveStyle({ height: customHeight });
            expect(getByTestId(FirstAssetSelector)).toHaveStyle({ height: customHeight });
            expect(getByTestId(SecondAssetSelector)).toBeInTheDocument();
            expect(getByTestId(CompareSliderSelector)).toHaveStyle({ height: customHeight });
            expect(getByTestId(SecondAssetSelector)).toHaveStyle({ height: customHeight });
        });
    });
});
