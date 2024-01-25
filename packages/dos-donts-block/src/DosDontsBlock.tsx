/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Asset,
    AssetChooserObjectType,
    rgbStringToRgbObject,
    useAssetChooser,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';

import { DndContext, DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import {
    BlockInjectButton,
    BlockProps,
    THEME_PREFIX,
    joinClassNames,
    useDndSensors,
} from '@frontify/guideline-blocks-settings';
import { FC, useEffect, useRef, useState } from 'react';
import { DoDontItem, SortableDoDontItem } from './DoDontItem';
import { BlockMode, ChangeType, DoDontType, GUTTER_VALUES, Item, Settings, ValueType } from './types';
import {
    ButtonEmphasis,
    ButtonStyle,
    IconCheckMarkCircle20,
    IconCrossCircle20,
    IconPlus20,
    Modal,
    ModalButton,
    PatternDesign,
    PatternTheme,
    generateRandomId,
} from '@frontify/fondue';

export const DO_COLOR_DEFAULT_VALUE = { red: 0, green: 200, blue: 165, alpha: 1 };
export const DONT_COLOR_DEFAULT_VALUE = { red: 255, green: 55, blue: 90, alpha: 1 };

export const DosDontsBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const isEditing = useEditorState(appBridge);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const [selectedType, setSelectedType] = useState<DoDontType | undefined>();
    const [selectedAssets, setSelectedAssets] = useState<Asset[] | undefined>();
    const [openFileDialog, { selectedFiles: filesFromInput }] = useFileInput({ multiple: true, accept: 'image/*' });
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(filesFromInput);
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isUploadLoading && setIsUploadLoading(true),
    });
    const [activeId, setActiveId] = useState<string | undefined>(undefined);
    const {
        style,
        hasCustomDoIcon,
        doIconChoice,
        hasCustomDontIcon,
        dontIconChoice,
        hasStrikethrough,
        columns,
        keepSideBySide,
        isCustomColumnGutter,
        customColumnGutterValue,
        columnGutterChoice,
        isCustomRowGutter,
        customRowGutterValue,
        rowGutterChoice,
        isCustomImageHeight,
        customImageHeightValue,
        imageDisplay,
        imageHeightChoice,
        doColor: customDoColor,
        dontColor: customDontColor,
        hasCustomDoColor,
        hasCustomDontColor,
        items = [],
        mode,
        borderWidth,
        backgroundColor,
        borderColor,
        borderStyle,
        hasBackground,
        hasBorder,
        hasRadius,
        radiusChoice,
        radiusValue,
    } = blockSettings;

    const columnGap = isCustomColumnGutter ? customColumnGutterValue : GUTTER_VALUES[columnGutterChoice];
    const rowGap = isCustomRowGutter ? customRowGutterValue : GUTTER_VALUES[rowGutterChoice];
    const sensors = useDndSensors(parseInt(columnGap ?? '0'), parseInt(rowGap ?? '0'));
    const { dontIconAsset, doIconAsset, itemImages } = blockAssets;
    const [localItems, setLocalItems] = useState<Item[]>(items);

    const themeStyle = getComputedStyle(document.body);
    const defaultDoColor =
        rgbStringToRgbObject(themeStyle.getPropertyValue(`${THEME_PREFIX}accent-color-tip-color`)) ||
        DO_COLOR_DEFAULT_VALUE;
    const defaultDontColor =
        rgbStringToRgbObject(themeStyle.getPropertyValue(`${THEME_PREFIX}accent-color-warning-color`)) ||
        DONT_COLOR_DEFAULT_VALUE;
    const doColor = hasCustomDoColor ? customDoColor : defaultDoColor;
    const dontColor = hasCustomDontColor ? customDontColor : defaultDontColor;

    /**
     * Save the design tokens to the settings initially
     */
    useEffect(() => {
        if (!customDoColor && !customDontColor) {
            setBlockSettings({
                doColor,
                dontColor,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customDoColor, customDontColor]);

    /**
     * Create placeholders on mount if empty
     */
    useEffect(() => {
        if (localItems.length === 0) {
            const placeholderItems: Item[] = [
                {
                    id: generateRandomId(),
                    body: '',
                    title: '',
                    type: DoDontType.Do,
                },
                {
                    id: generateRandomId(),
                    body: '',
                    title: '',
                    type: DoDontType.Dont,
                },
            ];
            setAndSaveItems(placeholderItems);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setSelectedFiles(filesFromInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filesFromInput]);

    useEffect(() => {
        if (selectedFiles && selectedType) {
            setIsUploadLoading(true);
            uploadFile(selectedFiles);
        } else if (selectedAssets && selectedType) {
            batchAddItems(selectedAssets);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles, selectedType, selectedAssets]);

    useEffect(() => {
        if (doneAll) {
            batchAddItems(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    const addItem = (type: DoDontType) => {
        const newItems: Item[] = [...localItems, { id: generateRandomId(), body: '', title: '', type }];
        setAndSaveItems(newItems);
    };

    const batchAddItems = (assets: Asset[]) => {
        if (!selectedType) {
            return;
        }
        const newItems: Item[] = [];
        const assetIds = [];
        setIsUploadLoading(true);
        for (const image of assets) {
            newItems.push({
                id: generateRandomId(),
                body: '',
                title: '',
                imageId: image.id,
                type: selectedType,
            });
            assetIds.push(image.id);
        }
        const existingIds = itemImages?.map((x) => x.id) || [];
        const newIds = [...new Set([...existingIds, ...assetIds])];
        updateAssetIdsFromKey('itemImages', newIds).then(() => {
            setAndSaveItems([...localItems, ...newItems]);
            setIsUploadLoading(false);
            setSelectedType(undefined);
            setSelectedAssets(undefined);
            setSelectedFiles(null);
        });
    };

    const removeItemById = (itemId: string) => {
        const newItems: Item[] = localItems.filter((item) => item.id !== itemId);
        setAndSaveItems(newItems);
    };

    const onChangeLocalItem = (itemId: string, value: ValueType, type: ChangeType) => {
        setLocalItems((previousItems) =>
            previousItems.map((item) => (item.id === itemId ? { ...item, [type]: value } : item)),
        );
    };

    const onChangeItem = (itemId: string, value: ValueType, type: ChangeType) => {
        setLocalItems((previousItems) => {
            const newItems = previousItems.map((item) => (item.id === itemId ? { ...item, [type]: value } : item));
            setBlockSettings({
                items: newItems,
            });
            return newItems;
        });
    };

    const setAndSaveItems = (newItems: Item[]) => {
        setLocalItems(newItems);
        saveItems(newItems);
    };

    const saveItems = (newItems: Item[]) => {
        setBlockSettings({
            items: newItems,
        });
    };

    const handleDragStart = (event: DragEndEvent) => {
        const { active } = event;
        saveItems(localItems);
        setActiveId(active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = localItems.findIndex((i) => i.id === active.id);
            const newIndex = localItems.findIndex((i) => i.id === over.id);
            const sortedItems = arrayMove(localItems, oldIndex, newIndex);
            setLocalItems(sortedItems);
            setBlockSettings({
                items: sortedItems,
            });
            setActiveId(undefined);
        }
    };

    const getLinkedImageOfItem = (item: Item) => {
        if (!itemImages) {
            return;
        }
        return itemImages.find((asset) => asset.id === item.imageId)?.genericUrl;
    };

    const getDoDontItemProps = (item: Item) => ({
        id: item.id,
        onChangeItem,
        onChangeLocalItem,
        onRemoveSelf: () => removeItemById(item.id),
        title: item.title,
        body: item.body,
        type: item.type,
        style,
        doColor,
        linkedImage: getLinkedImageOfItem(item),
        dontColor,
        editing: isEditing,
        hasCustomDoIcon,
        doIconChoice,
        doIconAsset,
        hasCustomDontIcon,
        dontIconChoice,
        dontIconAsset,
        mode,
        columns,
        appBridge,
        isCustomImageHeight,
        customImageHeightValue,
        imageDisplay,
        imageHeightChoice,
        hasStrikethrough,
        backgroundColor,
        borderColor,
        borderStyle,
        hasBackground,
        hasBorder,
        hasRadius,
        radiusChoice,
        radiusValue,
        borderWidth,
    });

    const onOpenAssetChooser = () => {
        openAssetChooser(
            (result) => {
                setSelectedAssets(result);
                closeAssetChooser();
            },
            {
                multiSelection: true,
                objectTypes: [AssetChooserObjectType.ImageVideo],
            },
        );
    };

    const gridClassName =
        keepSideBySide && columns.toString() === '2'
            ? ['tw-grid-cols-1', 'tw-grid-cols-2', 'tw-grid-cols-3', 'tw-grid-cols-4'][columns - 1]
            : [
                  'tw-grid-cols-1',
                  'md:tw-grid-cols-2 sm:tw-grid-cols-1',
                  'lg:tw-grid-cols-3 md:tw-grid-cols-2 sm:tw-grid-cols-1',
                  'lg:tw-grid-cols-4 md:tw-grid-cols-2 sm:tw-grid-cols-1',
              ][columns - 1];

    const activeItem = localItems.find((x) => x.id === activeId);

    return (
        <div className="dos-donts-block">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToParentElement]}
            >
                <SortableContext items={localItems} strategy={rectSortingStrategy}>
                    <div
                        data-test-id="dos-donts-block"
                        ref={wrapperRef}
                        className={joinClassNames(['tw-grid', gridClassName])}
                        style={{
                            columnGap,
                            rowGap,
                        }}
                    >
                        {localItems.map((item) => (
                            <SortableDoDontItem key={item.id} {...getDoDontItemProps(item)} />
                        ))}
                    </div>
                </SortableContext>
                <DragOverlay>
                    {activeItem ? (
                        <DoDontItem key={activeItem.id} isDragging={true} {...getDoDontItemProps(activeItem)} />
                    ) : null}
                </DragOverlay>
            </DndContext>
            {isEditing && (
                <div className="tw-w-full tw-flex tw-gap-3 tw-mt-9">
                    {mode === BlockMode.TEXT_AND_IMAGE && (
                        <div className="tw-flex tw-flex-wrap tw-w-full tw-gap-3 tw-justify-center">
                            <BlockInjectButton
                                label="Add images"
                                secondaryLabel="Or drop them here"
                                icon={<IconPlus20 />}
                                onUploadClick={openFileDialog}
                                onAssetChooseClick={onOpenAssetChooser}
                                onDrop={setSelectedFiles}
                                isLoading={isUploadLoading}
                            />
                        </div>
                    )}
                    <div className="tw-flex tw-w-full">
                        <BlockInjectButton
                            label="Add do"
                            withMenu={false}
                            icon={<IconCheckMarkCircle20 />}
                            onClick={() => addItem(DoDontType.Do)}
                        />
                        <BlockInjectButton
                            label="Add don't"
                            withMenu={false}
                            icon={<IconCrossCircle20 />}
                            onClick={() => addItem(DoDontType.Dont)}
                        />
                    </div>
                </div>
            )}
            <Modal
                visual={{ pattern: PatternDesign.Typography, foregroundColor: PatternTheme.Green }}
                isOpen={(!!selectedAssets?.[0] || !!selectedFiles) && !selectedType}
            >
                <Modal.Header title="What should be the type of those images?" />
                <Modal.Body>
                    <div>You can always change the type later on each item.</div>
                </Modal.Body>
                <Modal.Footer
                    buttons={
                        [
                            {
                                children: 'Cancel',
                                onClick: () => {
                                    setSelectedAssets(undefined);
                                    setSelectedFiles(null);
                                    setSelectedType(undefined);
                                },
                                style: ButtonStyle.Default,
                                emphasis: ButtonEmphasis.Weak,
                            },
                            {
                                children: 'Add as Do',
                                onClick: () => {
                                    setSelectedType(DoDontType.Do);
                                },
                                icon: <IconCheckMarkCircle20 />,
                                style: ButtonStyle.Default,
                                emphasis: ButtonEmphasis.Default,
                            },
                            {
                                children: "Add as Don't",
                                onClick: () => {
                                    setSelectedType(DoDontType.Dont);
                                },
                                icon: <IconCrossCircle20 />,
                                style: ButtonStyle.Default,
                                emphasis: ButtonEmphasis.Default,
                            },
                        ] as unknown as [ModalButton, ModalButton]
                    }
                />
            </Modal>
        </div>
    );
};
