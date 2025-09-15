/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ReactCompareSlider } from 'react-compare-slider';

import {
    AssetChooserObjectType,
    FileExtensionSets,
    useAssetChooser,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';

import {
    Alignment,
    BlockSettings,
    Height,
    InheritSettings,
    SliderImageSlot,
    heightMap,
    slotAssetSettingMap,
} from './types';
import {
    EditorOverlay,
    Label,
    LabelWrapper,
    SliderLine,
    Strikethrough,
    StrikethroughWrapper,
    UploadView,
} from './components';
import { BlockProps, THEME_PREFIX, radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-settings';
import { StyleProvider } from '@frontify/guideline-blocks-shared';

import {
    DEFAULT_BACKGROUND_COLOR,
    DEFAULT_BORDER_COLOR,
    DEFAULT_LINE_COLOR,
    DEFAULT_STRIKETHROUGH_COLOR,
} from './settings';

export const CompareSliderBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const { blockAssets, updateAssetIdsFromKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'image/*', multiple: false });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload();

    const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null);
    const [assetLoadingStatus, setAssetLoadingStatus] = useState({
        [SliderImageSlot.First]: false,
        [SliderImageSlot.Second]: false,
    });
    const [slotWithUploadInProgress, setSlotWithUploadInProgress] = useState<SliderImageSlot>();
    const [currentSliderPosition, setCurrentSliderPosition] = useState(50);

    const { firstAsset, secondAsset } = blockAssets;
    const {
        alignment,
        firstAssetHasStrikethrough,
        firstAssetLabel,
        firstAssetLabelPlacementHorizontal,
        firstAssetLabelPlacementVertical,
        firstAssetAlt,
        secondAssetHasStrikethrough,
        secondAssetLabel,
        secondAssetLabelPlacementHorizontal,
        secondAssetLabelPlacementVertical,
        secondAssetAlt,
        borderColor,
        borderStyle,
        borderWidth,
        customHeight,
        customStrikeThroughColor,
        handle,
        hasBorder,
        hasCustomHeight,
        strikethroughColorSource,
        hasRadius,
        height,
        radiusChoice,
        radiusValue,
        sliderColor,
        sliderStyle,
        sliderWidth,
        hasBackground,
        backgroundColor,
    } = blockSettings;

    const firstAssetTitle = firstAsset ? (firstAssetAlt ?? '') : '';
    const firstAssetPreviewUrl = firstAsset ? firstAsset[0].previewUrl : '';
    const secondAssetTitle = secondAsset ? (secondAssetAlt ?? '') : '';
    const secondAssetPreviewUrl = secondAsset ? secondAsset[0].previewUrl : '';

    useEffect(() => {
        if (isEditing) {
            setCurrentSliderPosition(50);
        }
    }, [isEditing]);

    useEffect(() => {
        if (!droppedFiles) {
            return;
        }

        const initialAlt = droppedFiles[0].name ?? '';

        if (slotWithUploadInProgress === SliderImageSlot.First) {
            setAssetLoadingStatus((prev) => ({ ...prev, [SliderImageSlot.First]: true }));
            setBlockSettings({ firstAssetAlt: initialAlt });
        } else {
            setAssetLoadingStatus((prev) => ({ ...prev, [SliderImageSlot.Second]: true }));
            setBlockSettings({ secondAssetAlt: initialAlt });
        }
        uploadFile(droppedFiles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [droppedFiles]);

    useEffect(() => {
        if (selectedFiles) {
            const initialAlt = selectedFiles[0].name ?? '';

            if (slotWithUploadInProgress === SliderImageSlot.First) {
                setAssetLoadingStatus((prev) => ({ ...prev, [SliderImageSlot.First]: true }));
                setBlockSettings({ firstAssetAlt: initialAlt });
            } else {
                setAssetLoadingStatus((prev) => ({ ...prev, [SliderImageSlot.Second]: true }));
                setBlockSettings({ secondAssetAlt: initialAlt });
            }
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults && slotWithUploadInProgress) {
            (async (uploadResults) => {
                const resultId = uploadResults[0].id;
                await updateAssetIdsFromKey(slotAssetSettingMap[slotWithUploadInProgress], [resultId]);
                setAssetLoadingStatus((prev) => ({ ...prev, [slotWithUploadInProgress]: false }));
            })(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    const startFileDialogUpload = (slot: SliderImageSlot) => {
        setSlotWithUploadInProgress(slot);
        openFileDialog();
    };

    const startDragAndDropUpload = (files: FileList, slot: SliderImageSlot) => {
        setSlotWithUploadInProgress(slot);
        setDroppedFiles(files);
    };

    const updateImageAlt = useCallback(
        (key: 'firstAssetAlt' | 'secondAssetAlt', newAlt: string) => {
            setBlockSettings({ [key]: newAlt });
        },
        [setBlockSettings]
    );

    const handleAssetDelete = (key: string, id: number) => {
        deleteAssetIdsFromKey(key, [id]);
    };

    const onOpenAssetChooser = (slot: SliderImageSlot) => {
        openAssetChooser(
            async (result) => {
                const { alternativeText, title, fileName, id } = result[0];
                const initialAlt = alternativeText ?? title ?? fileName ?? '';
                const isFirstSlot = slot === SliderImageSlot.First;
                const prefix = isFirstSlot ? 'first' : 'second';

                setAssetLoadingStatus((prev) => ({ ...prev, [slot]: true }));
                setBlockSettings({ [`${prefix}AssetAlt`]: initialAlt });
                updateAssetIdsFromKey(`${prefix}Asset`, [id]);
                closeAssetChooser();
            },
            {
                objectTypes: [AssetChooserObjectType.ImageVideo],
                extensions: FileExtensionSets['Images'],
            }
        );
    };

    const getContainerAspectRatio = useMemo((): string => {
        if (!firstAsset || !secondAsset) {
            return '16/9';
        }
        const firstAspectRatio = firstAsset[0].width / firstAsset[0].height;
        const secondAspectRatio = secondAsset[0].width / secondAsset[0].height;
        const minAspectRatio = Math.min(firstAspectRatio, secondAspectRatio);
        return `${minAspectRatio}/1`;
    }, [firstAsset, secondAsset]);

    const getContainerHeight = (): string => {
        if (hasCustomHeight) {
            return `${parseInt(customHeight)}px`;
        }
        if (height !== Height.Auto) {
            return `${heightMap[height]}px`;
        }
        return 'auto';
    };

    const getBorderStyle = () => {
        return hasBorder
            ? { borderWidth, borderColor: toRgbaString(borderColor || DEFAULT_BORDER_COLOR), borderStyle }
            : {};
    };

    const getBorderRadius = () => {
        if (hasRadius) {
            return radiusValue;
        }
        return radiusStyleMap[radiusChoice];
    };

    const handleImageLoad = (slot: SliderImageSlot) => {
        setAssetLoadingStatus((prev) => ({ ...prev, [slot]: false }));
    };

    const handleImageError = (slot: SliderImageSlot) => {
        setAssetLoadingStatus((prev) => ({ ...prev, [slot]: false }));
        console.warn(`Failed to load image for slot: ${slot}`);
    };

    const renderSliderItem = (slot: SliderImageSlot) => {
        const previewUrl = slot === SliderImageSlot.First ? firstAssetPreviewUrl : secondAssetPreviewUrl;
        const title = slot === SliderImageSlot.First ? firstAssetTitle : secondAssetTitle;

        return (
            <div className="tw-grow">
                <div
                    style={{
                        background: hasBackground
                            ? toRgbaString(backgroundColor || DEFAULT_BACKGROUND_COLOR)
                            : undefined,
                        aspectRatio: height === Height.Auto ? getContainerAspectRatio : undefined,
                    }}
                    data-test-id={`slider-item-container-${slot}`}
                >
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt={title}
                            className="tw-w-full tw-h-full tw-object-cover"
                            data-test-id={`slider-item-${slot}`}
                            onLoad={() => handleImageLoad(slot)}
                            onError={() => handleImageError(slot)}
                            style={{
                                height: height === Height.Auto ? 'undefined' : getContainerHeight(),
                            }}
                        />
                    )}
                </div>
                {renderStrikethrough(slot)}
                {!isEditing && renderLabel(slot)}
            </div>
        );
    };

    const renderStrikethrough = (slot: SliderImageSlot) => {
        const style = getComputedStyle(document.body);
        return (
            <StrikethroughWrapper
                alignment={alignment}
                currentSliderPosition={currentSliderPosition}
                hasStrikeThrough={
                    slot === SliderImageSlot.First ? firstAssetHasStrikethrough : secondAssetHasStrikethrough
                }
                slot={slot}
                borderRadius={getBorderRadius()}
            >
                <Strikethrough
                    color={
                        strikethroughColorSource === InheritSettings.OVERRIDE
                            ? toRgbaString(customStrikeThroughColor || DEFAULT_STRIKETHROUGH_COLOR)
                            : style.getPropertyValue(`${THEME_PREFIX}accent-color-warning-color`)
                    }
                />
            </StrikethroughWrapper>
        );
    };

    const renderLabel = (slot: SliderImageSlot) => {
        const label = slot === SliderImageSlot.First ? firstAssetLabel : secondAssetLabel;
        const key = slot === SliderImageSlot.First ? 'firstAssetLabel' : 'secondAssetLabel';

        return (
            <LabelWrapper
                firstAssetLabelPlacementHorizontal={firstAssetLabelPlacementHorizontal}
                firstAssetLabelPlacementVertical={firstAssetLabelPlacementVertical}
                secondAssetLabelPlacementVertical={secondAssetLabelPlacementVertical}
                secondAssetLabelPlacementHorizontal={secondAssetLabelPlacementHorizontal}
                alignment={alignment}
                slot={slot}
                borderRadius={getBorderRadius()}
            >
                <Label
                    blockId={appBridge.context('blockId').get().toString()}
                    isEditing={isEditing}
                    value={label}
                    onBlur={(newValue: string) => setBlockSettings({ [key]: newValue })}
                />
            </LabelWrapper>
        );
    };

    if (isEditing && (!firstAsset || !secondAsset)) {
        return (
            <div
                className="tw-flex"
                style={{
                    height: getContainerHeight(),
                    aspectRatio: height === Height.Auto ? getContainerAspectRatio : undefined,
                }}
            >
                <UploadView
                    alignment={alignment}
                    isFirstAssetLoading={assetLoadingStatus[SliderImageSlot.First]}
                    isSecondAssetLoading={assetLoadingStatus[SliderImageSlot.Second]}
                    openAssetChooser={onOpenAssetChooser}
                    startDragAndDropUpload={startDragAndDropUpload}
                    startFileDialogUpload={startFileDialogUpload}
                    firstAssetPreviewUrl={firstAssetPreviewUrl}
                    firstAssetTitle={firstAssetTitle}
                    secondAssetPreviewUrl={secondAssetPreviewUrl}
                    secondAssetTitle={secondAssetTitle}
                />
            </div>
        );
    }

    return (
        <div className="compare-slider-block">
            <StyleProvider>
                <div data-test-id="compare-slider-block" className="tw-w-full tw-flex tw-relative">
                    <div
                        data-test-id="compare-slider-block-slider"
                        className="tw-w-full tw-overflow-hidden tw-relative [&_.handle]:focus-within:tw-ring-4 [&_.handle]:focus-within:tw-ring-offset-2"
                        style={{
                            ...getBorderStyle(),
                            borderRadius: getBorderRadius(),
                            height: getContainerHeight(),
                        }}
                    >
                        <ReactCompareSlider
                            position={currentSliderPosition}
                            onPositionChange={setCurrentSliderPosition}
                            itemOne={renderSliderItem(SliderImageSlot.First)}
                            itemTwo={renderSliderItem(SliderImageSlot.Second)}
                            handle={
                                <SliderLine
                                    alignment={alignment}
                                    handle={handle}
                                    sliderColor={sliderColor || DEFAULT_LINE_COLOR}
                                    sliderStyle={sliderStyle}
                                    sliderWidth={sliderWidth}
                                />
                            }
                            portrait={alignment === Alignment.Vertical}
                            onlyHandleDraggable
                        />
                    </div>
                    {isEditing && (
                        <EditorOverlay
                            alignment={alignment}
                            openAssetChooser={onOpenAssetChooser}
                            startFileDialogUpload={startFileDialogUpload}
                            firstAsset={firstAsset}
                            secondAsset={secondAsset}
                            borderStyle={{ ...getBorderStyle(), borderColor: 'transparent' }}
                            renderLabel={renderLabel}
                            handleAssetDelete={handleAssetDelete}
                            firstAlt={firstAssetAlt}
                            secondAlt={secondAssetAlt}
                            updateImageAlt={updateImageAlt}
                        />
                    )}
                </div>
            </StyleProvider>
        </div>
    );
};
