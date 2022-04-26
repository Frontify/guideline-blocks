/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/arcade-tokens/styles';
import 'tailwindcss/tailwind.css';
import { FC, useEffect, useState } from 'react';
import {
    Asset,
    AssetChooserResult,
    IAppBridgeNative,
    useBlockAssets,
    useFileInput,
    useFileUpload,
} from '@frontify/app-bridge';
import { Button } from '@frontify/arcade';

export const ExampleBlock: FC<{ appBridge: IAppBridgeNative }> = ({ appBridge }) => {
    // Manual upload demo
    const [loading, setLoading] = useState(false);
    const [openFileDialog, { selectedFiles }] = useFileInput({});
    const [uploadFile, { results: uploadResults, doneAll }] = useFileUpload({
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
                await updateAssetIdsFromKey('images', assetsId);
                setLoading(false);
            })(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    // Asset chooser demo
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);

    const onOpenAssetChooser = () => {
        appBridge.openAssetChooser(
            (result: AssetChooserResult) => {
                const resultId = result.screenData[0].id;
                updateAssetIdsFromKey('images', [resultId]);
                appBridge.closeAssetChooser();
            },
            {
                selectedValueId: blockAssets['images']?.[0]?.id,
            }
        );
    };

    return (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-gap-4">
                <Button onClick={onOpenAssetChooser}>Open asset chooser</Button>
                <Button onClick={openFileDialog}>{loading ? 'Uploading...' : 'Upload'}</Button>
            </div>

            <div data-test-id="example-block">
                {blockAssets['images'] ? (
                    blockAssets['images'].map((asset: Asset) => (
                        <div key={asset.id}>
                            <img src={asset.preview_url} />
                            <p>{asset.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No image set</p>
                )}
            </div>
        </div>
    );
};
