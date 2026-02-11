/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useAssetChooser, useAssetUpload, useBlockAssets, useFileInput, type Asset } from '@frontify/app-bridge';
import { Button } from '@frontify/fondue/components';
import { type BlockProps } from '@frontify/guideline-blocks-settings';
import { StyleProvider } from '@frontify/guideline-blocks-shared';
import { type ReactElement, useEffect, useState } from 'react';

import { IMAGE_SETTING_ID } from './settings';

export const ExampleAssetUploadBlock = ({ appBridge }: BlockProps): ReactElement => {
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);

    // Manual upload demo
    const [loading, setLoading] = useState(false);
    const [openFileDialog, { selectedFiles }] = useFileInput({});
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !loading && setLoading(true),
    });

    useEffect(() => {
        if (selectedFiles) {
            // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
            setLoading(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
        openAssetChooser(
            (result: Asset[]) => {
                const resultId = result[0].id;
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                updateAssetIdsFromKey(IMAGE_SETTING_ID, [resultId]);
                closeAssetChooser();
            },
            {
                selectedValueId: blockAssets[IMAGE_SETTING_ID]?.[0]?.id,
            }
        );
    };

    // eslint-disable-next-line @eslint-react/no-nested-component-definitions
    const Link = ({ link, text }: { link: string; text: string }) => {
        return (
            <a className="tw-text-text-interactive" href={link} target="_blank" rel="noopener noreferrer">
                {text}
            </a>
        );
    };

    return (
        <div className="example-asset-upload">
            <StyleProvider>
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <div className="tw-flex tw-gap-4">
                        <Button onPress={onOpenAssetChooser}>Open asset chooser</Button>
                        <Button onPress={openFileDialog} disabled={loading}>
                            {loading ? 'Uploading...' : 'Upload'}
                        </Button>
                    </div>

                    <div data-test-id="example-asset-upload-block">
                        {blockAssets[IMAGE_SETTING_ID] ? (
                            blockAssets[IMAGE_SETTING_ID].map((asset: Asset) => (
                                <div key={asset.id}>
                                    <img
                                        src={asset.previewUrl}
                                        alt={asset.title}
                                        data-test-id="example-asset-upload-image"
                                    />
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
            </StyleProvider>
        </div>
    );
};
