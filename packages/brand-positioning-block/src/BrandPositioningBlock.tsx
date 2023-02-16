/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Asset,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import 'tailwindcss/tailwind.css';
import { ASSETS_KEY, BlockSettings, Item } from './types';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { Board } from './components/Board';
import { IconPlus20, generateRandomId } from '@frontify/fondue';
import { useEffect, useState } from 'react';
import { BlockInjectButton } from '@frontify/guideline-blocks-shared';

export const BrandPositioningBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { items = [] } = blockSettings;
    const isEditing = useEditorState(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ multiple: true, accept: 'image/*' });
    const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null);
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload();

    const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const [internalItems, setInternalItems] = useState<Item[]>(items);

    useEffect(() => {
        if (selectedFiles) {
            setIsUploadLoading(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (droppedFiles) {
            setIsUploadLoading(true);
            uploadFile(droppedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [droppedFiles]);

    useEffect(() => {
        if (doneAll) {
            (async (uploadResults) => {
                try {
                    await onAssetsAdded(uploadResults);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsUploadLoading(false);
                }
            })(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    const openAssetChooser = async () => {
        appBridge.openAssetChooser(
            async (result) => {
                try {
                    setIsUploadLoading(true);
                    appBridge.closeAssetChooser();
                    await onAssetsAdded(result);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsUploadLoading(false);
                }
            },
            {
                multiSelection: true,
                selectedValueIds: (blockAssets[ASSETS_KEY] || []).map((asset) => asset.id),
            }
        );
    };

    const getStackingPosition = (existingItems: Item[]) => {
        const position = { x: 0, y: 0 };
        while (existingItems.find((item) => item.position.x === position.x && item.position.y === position.y)) {
            position.x += 3;
        }
        return position;
    };

    const onAssetsAdded = async (assets: Asset[]) => {
        const newItems: Item[] = [];
        const selectedAssetIds = [];
        for (const asset of assets) {
            const position = getStackingPosition([...internalItems, ...newItems]);
            newItems.push({
                id: generateRandomId(),
                position,
                assetId: asset.id,
            });
            selectedAssetIds.push(asset.id);
        }
        await addAssetIdsToKey(ASSETS_KEY, selectedAssetIds);
        updateItems([...internalItems, ...newItems]);
    };

    const updateItems = async (updatedItems: Item[]) => {
        setBlockSettings({ items: updatedItems });
        setInternalItems(updatedItems);
    };

    const deleteItem = async (itemToDelete: Item) => {
        deleteAssetIdsFromKey(ASSETS_KEY, [itemToDelete.assetId]);
        updateItems(internalItems.filter((item) => item.id !== itemToDelete.id));
    };

    return (
        <div className="tw-flex tw-flex-col tw-gap-2" data-test-id="brand-positioning-block">
            <Board
                items={internalItems}
                deleteItem={deleteItem}
                assets={blockAssets[ASSETS_KEY] || []}
                setItems={updateItems}
                isEditing={isEditing}
            />
            {isEditing && (
                <div>
                    <BlockInjectButton
                        label="Add images"
                        secondaryLabel="Or drop them here"
                        icon={<IconPlus20 />}
                        onUploadClick={openFileDialog}
                        onAssetChooseClick={openAssetChooser}
                        onDrop={setDroppedFiles}
                        isLoading={isUploadLoading}
                    />
                </div>
            )}
        </div>
    );
};
