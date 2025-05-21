/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Asset,
    AssetChooserObjectType,
    rgbStringToRgbObject,
    useAssetChooser,
    useAssetUpload,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';
import throttle from 'lodash/throttle';

import { DndContext, DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import {
    BlockInjectButton,
    BlockProps,
    FileExtensionSets,
    THEME_PREFIX,
    joinClassNames,
    useDndSensors,
} from '@frontify/guideline-blocks-settings';
import { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import { AssetsContext, AssetsProvider } from './AssetsProvider';
import { CONTAINER_SMALL_LIMIT, DONT_ICON_ASSET_KEY, DO_ICON_ASSET_KEY } from './const';
import { StyleProvider } from '@frontify/guideline-blocks-shared';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_BORDER_COLOR } from './settings';

export const DO_COLOR_DEFAULT_VALUE = { red: 0, green: 200, blue: 165, alpha: 1 };
export const DONT_COLOR_DEFAULT_VALUE = { red: 255, green: 55, blue: 90, alpha: 1 };

export const DosDontsBlockWrapper = ({ appBridge }: BlockProps) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const shouldFetchAssets =
        blockSettings.mode === BlockMode.TEXT_AND_IMAGE ||
        blockSettings.hasCustomDoIcon ||
        blockSettings.hasCustomDontIcon;

    return shouldFetchAssets ? (
        <AssetsProvider appBridge={appBridge}>
            <DosDontsBlock appBridge={appBridge} />
        </AssetsProvider>
    ) : (
        <DosDontsBlock appBridge={appBridge} />
    );
};

export const DosDontsBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useContext(AssetsContext);
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
    const doIconAsset = blockAssets?.[DO_ICON_ASSET_KEY];
    const dontIconAsset = blockAssets?.[DONT_ICON_ASSET_KEY];
    const [localItems, setLocalItems] = useState<Item[]>(items);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isContainerSmall, setIsContainerSmall] = useState<boolean>(false);

    const themeStyle = useMemo(() => getComputedStyle(document.body), []);
    const defaultDoColor = useMemo(
        () =>
            rgbStringToRgbObject(themeStyle.getPropertyValue(`${THEME_PREFIX}accent-color-tip-color`)) ||
            DO_COLOR_DEFAULT_VALUE,
        [themeStyle]
    );
    const defaultDontColor = useMemo(
        () =>
            rgbStringToRgbObject(themeStyle.getPropertyValue(`${THEME_PREFIX}accent-color-warning-color`)) ||
            DONT_COLOR_DEFAULT_VALUE,
        [themeStyle]
    );

    const doColor = useMemo(
        () => (hasCustomDoColor ? customDoColor : defaultDoColor),
        [customDoColor, hasCustomDoColor, defaultDoColor]
    );
    const dontColor = useMemo(
        () => (hasCustomDontColor ? customDontColor : defaultDontColor),
        [customDontColor, hasCustomDontColor, defaultDontColor]
    );

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

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const throttledFn = throttle((entries) => {
            const lastEntry = entries[entries.length - 1];
            const isSmall = lastEntry?.contentRect?.width < CONTAINER_SMALL_LIMIT;

            setIsContainerSmall(isSmall);
        }, 200);

        const observer = new ResizeObserver(throttledFn);

        observer.observe(container);

        return () => {
            if (container) {
                observer.unobserve(container);
            }
        };
    }, [containerRef, isEditing]);

    const addItem = (type: DoDontType) => {
        const newItems: Item[] = [...localItems, { id: generateRandomId(), body: '', title: '', type }];
        setAndSaveItems(newItems);
    };

    const batchAddItems = (assets: Asset[]) => {
        if (!selectedType) {
            return;
        }
        const newItems: Item[] = [];
        setIsUploadLoading(true);
        for (const image of assets) {
            const itemId = generateRandomId();
            newItems.push({
                id: itemId,
                body: '',
                title: '',
                type: selectedType,
                alt: image.title || image.fileName || '',
            });
            if (addAssetIdsToKey) {
                addAssetIdsToKey(itemId, [image.id]);
            }
        }
        setAndSaveItems([...localItems, ...newItems]);
        setIsUploadLoading(false);
        setSelectedType(undefined);
        setSelectedAssets(undefined);
        setSelectedFiles(null);
    };

    const saveItems = useCallback(
        (newItems: Item[]) => {
            setBlockSettings({
                items: newItems,
                ...(!customDoColor && !customDontColor
                    ? {
                          doColor,
                          dontColor,
                      }
                    : {}),
            });
        },
        [setBlockSettings, customDoColor, customDontColor, doColor, dontColor]
    );

    const setAndSaveItems = useCallback(
        (newItems: Item[]) => {
            setLocalItems(newItems);
            saveItems(newItems);
        },
        [saveItems]
    );

    const removeItemById = useCallback(
        (itemId: string) => {
            let updatedItems: Item[] = [];

            setLocalItems((prevItems) => {
                updatedItems = prevItems.filter((item) => item.id !== itemId);
                return updatedItems;
            });

            setBlockSettings({ items: updatedItems });

            if (blockAssets && deleteAssetIdsFromKey) {
                const asset = blockAssets[itemId]?.[0];
                const assetId = asset?.id;
                if (assetId) {
                    deleteAssetIdsFromKey(itemId, [assetId]);
                }
            }
        },
        [blockAssets, deleteAssetIdsFromKey, setBlockSettings]
    );
    const onChangeLocalItem = useCallback((itemId: string, value: ValueType, type: ChangeType) => {
        setLocalItems((previousItems) =>
            previousItems.map((item) => (item.id === itemId ? { ...item, [type]: value } : item))
        );
    }, []);

    const onChangeItem = useCallback(
        (itemId: string, change: Partial<Record<ChangeType, ValueType>>) => {
            setLocalItems((previousItems) => {
                const newItems = previousItems.map((item) =>
                    item.id === itemId ? ({ ...item, ...change } as Item) : item
                );
                setBlockSettings({
                    items: newItems,
                });
                return newItems;
            });
        },
        [setBlockSettings]
    );

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

    const getDoDontItemProps = (item: Item) => ({
        id: item.id,
        onChangeItem,
        onChangeLocalItem,
        onRemoveSelf: removeItemById,
        title: item.title,
        body: item.body,
        type: item.type,
        style,
        doColor: doColor || DO_COLOR_DEFAULT_VALUE,
        linkedImage: blockAssets?.[item.id]?.[0],
        dontColor: dontColor || DONT_COLOR_DEFAULT_VALUE,
        editing: isEditing,
        hasCustomDoIcon,
        doIconChoice,
        doIconAsset,
        hasCustomDontIcon,
        dontIconChoice,
        alt: item.alt,
        dontIconAsset,
        mode,
        columns,
        appBridge,
        isCustomImageHeight,
        customImageHeightValue,
        imageDisplay,
        imageHeightChoice,
        hasStrikethrough,
        backgroundColor: backgroundColor || DEFAULT_BACKGROUND_COLOR,
        borderColor: borderColor || DEFAULT_BORDER_COLOR,
        borderStyle,
        hasBackground,
        hasBorder,
        hasRadius,
        radiusChoice,
        radiusValue,
        borderWidth,
        updateAssetIdsFromKey,
        activeId,
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
                extensions: FileExtensionSets.Images,
            }
        );
    };

    const gridClassName =
        keepSideBySide && columns.toString() === '2'
            ? ['tw-grid-cols-1', 'tw-grid-cols-2', 'tw-grid-cols-3', 'tw-grid-cols-4'][columns - 1]
            : [
                  'tw-grid-cols-1',
                  '@sm:tw-grid-cols-2',
                  '@md:tw-grid-cols-3 @sm:tw-grid-cols-2',
                  '@md:tw-grid-cols-4 @sm:tw-grid-cols-3 @xs:tw-grid-cols-2',
              ][columns - 1];

    const activeItem = localItems.find((x) => x.id === activeId);

    return (
        <div ref={containerRef} className="dos-donts-block tw-@container">
            <StyleProvider>
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
                    {activeItem ? (
                        <DragOverlay>
                            <DoDontItem key={activeItem.id} isDragging={true} {...getDoDontItemProps(activeItem)} />
                        </DragOverlay>
                    ) : null}
                </DndContext>
                {isEditing && (
                    <div className="tw-w-full tw-flex tw-gap-3 tw-mt-9 tw-flex-wrap">
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
                        <div
                            data-test-id="dos-donts-block-add-buttons"
                            className="tw-flex tw-w-full tw-flex-col @sm:tw-flex-row"
                        >
                            <BlockInjectButton
                                verticalLayout={isContainerSmall}
                                label="Add do"
                                withMenu={false}
                                icon={<IconCheckMarkCircle20 />}
                                onClick={() => addItem(DoDontType.Do)}
                            />
                            <BlockInjectButton
                                verticalLayout={isContainerSmall}
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
            </StyleProvider>
        </div>
    );
};
