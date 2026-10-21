/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge/testing';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ExampleAssetUploadBlock } from './ExampleAssetUploadBlock';
import { IMAGE_SETTING_ID } from './settings';

const EXAMPLE_ASSET_UPLOAD_BLOCK_TEST_ID = 'example-asset-upload-block';
const EXAMPLE_ASSET_UPLOAD_IMAGE_TEST_ID = 'example-asset-upload-image';

const ASSET_ID = 94593;

describe('Example Asset Upload Block', () => {
    it('should render an example block', () => {
        const [ExampleAssetUploadBlockWithStubs] = withAppBridgeBlockStubs(ExampleAssetUploadBlock);

        render(<ExampleAssetUploadBlockWithStubs />);

        expect(screen.getByTestId(EXAMPLE_ASSET_UPLOAD_BLOCK_TEST_ID)).toBeInTheDocument();
    });

    it('should render the image of the selected asset', () => {
        const asset = AssetDummy.with(ASSET_ID);
        const [ExampleAssetUploadBlockWithStubs] = withAppBridgeBlockStubs(ExampleAssetUploadBlock, {
            blockAssets: {
                [IMAGE_SETTING_ID]: [asset],
            },
        });

        render(<ExampleAssetUploadBlockWithStubs />);

        expect(screen.getByTestId(EXAMPLE_ASSET_UPLOAD_IMAGE_TEST_ID)).toHaveAttribute('src', asset.previewUrl);
    });
});
