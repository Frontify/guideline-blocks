/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { Asset } from '@frontify/app-bridge';
import { useAssetUpload, useBlockAssets, useFileInput } from '@frontify/app-bridge';
import { Button } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { IMAGE_SETTING_ID } from './settings';

export const ExampleAssetUploadBlock: FC<BlockProps> = ({ appBridge }) => {
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);

    // Manual upload demo
    const [loading, setLoading] = useState(false);
    const [openFileDialog, { selectedFiles }] = useFileInput({});
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !loading && setLoading(true),
    });

    useEffect(() => {
        if (selectedFiles) {
            setLoading(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll) {
            (async (uploadResults) => {
                const assetsId = uploadResults.map((uploadResult) => uploadResult.id);
                await updateAssetIdsFromKey(IMAGE_SETTING_ID, assetsId);
                setLoading(false);
            })(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    // Asset chooser demo
    const onOpenAssetChooser = () => {
        appBridge.openAssetChooser(
            (result: Asset[]) => {
                const resultId = result[0].id;
                updateAssetIdsFromKey(IMAGE_SETTING_ID, [resultId]);
                appBridge.closeAssetChooser();
            },
            {
                selectedValueId: blockAssets[IMAGE_SETTING_ID]?.[0]?.id,
            }
        );
    };

    const Link = ({ link, text }: { link: string; text: string }) => {
        return (
            <a className="tw-text-text-interactive" href={link} target="_blank" rel="noopener noreferrer">
                {text}
            </a>
        );
    };

    return (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-gap-4">
                <Button onClick={onOpenAssetChooser}>Open asset chooser</Button>
                <Button onClick={openFileDialog} disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </Button>
            </div>

            <div data-test-id="example-asset-upload-block">
                {blockAssets[IMAGE_SETTING_ID] ? (
                    blockAssets[IMAGE_SETTING_ID].map((asset: Asset) => (
                        <div key={asset.id}>
                            <img src={asset.previewUrl} data-test-id="example-asset-upload-image" />
                            <div className="tw-flex tw-flex-col tw-gap-4">
                                <strong>{asset.title}</strong>
                                <div className="tw-flex tw-gap-4">
                                    <Link link={asset.previewUrl} text="Preview URL" />
                                    <Link link={asset.genericUrl} text="Generic URL" />
                                    {asset.originUrl && <Link link={asset.originUrl} text="Origin URL" />}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No image set</p>
                )}
            </div>
        </div>
    );
};
