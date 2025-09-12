/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useState } from 'react';
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
import { ResponsiveImage, StyleProvider, useImageContainer } from '@frontify/guideline-blocks-shared';

import {
    DEFAULT_BACKGROUND_COLOR,
    DEFAULT_BORDER_COLOR,
    DEFAULT_LINE_COLOR,
    DEFAULT_STRIKETHROUGH_COLOR,
} from './settings';

export const CompareSliderBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const { containerWidth, setContainerRef } = useImageContainer();
    const { blockAssets, updateAssetIdsFromKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'image/*', multiple: false });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload();
    const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null);
    const [isFirstAssetLoading, setIsFirstAssetLoading] = useState<boolean>(false);
    const [isSecondAssetLoading, setIsSecondAssetLoading] = useState<boolean>(false);
    const [slotWithUploadInProgress, setSlotWithUploadInProgress] = useState<SliderImageSlot>();
    const [isFirstAssetLoaded, setIsFirstAssetLoaded] = useState(false);
    const [isSecondAssetLoaded, setIsSecondAssetLoaded] = useState(false);
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
        if (firstAssetPreviewUrl) {
            const firstImage = new Image();
            firstImage.onload = () => {
                setIsFirstAssetLoaded(true);
                setIsFirstAssetLoading(false);
            };
            firstImage.src = firstAssetPreviewUrl;
        }
        if (secondAssetPreviewUrl) {
            const secondImage = new Image();
            secondImage.onload = () => {
                setIsSecondAssetLoaded(true);
                setIsSecondAssetLoading(false);
            };
            secondImage.src = secondAssetPreviewUrl;
        }
    }, [firstAssetPreviewUrl, secondAssetPreviewUrl]);

    useEffect(() => {
        if (isEditing) {
            setCurrentSliderPosition(50);
        }
    }, [isEditing]);

    useEffect(() => {
        if (!droppedFiles) {
            return;
        }

        if (droppedFiles.length > 1) {
            return console.error('Please only upload one file per slot.');
        }
        const initialAlt = droppedFiles[0].name ?? '';

        if (slotWithUploadInProgress === SliderImageSlot.First) {
            setIsFirstAssetLoading(true);
            setBlockSettings({ firstAssetAlt: initialAlt });
        } else {
            setIsSecondAssetLoading(true);
            setBlockSettings({ secondAssetAlt: initialAlt });
        }
        uploadFile(droppedFiles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [droppedFiles]);

    useEffect(() => {
        if (selectedFiles) {
            const initialAlt = selectedFiles[0].name ?? '';

            if (slotWithUploadInProgress === SliderImageSlot.First) {
                setIsFirstAssetLoading(true);
                setBlockSettings({ firstAssetAlt: initialAlt });
            } else {
                setIsSecondAssetLoading(true);
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
                const setAssetLoading = isFirstSlot ? setIsFirstAssetLoading : setIsSecondAssetLoading;
                const prefix = isFirstSlot ? 'first' : 'second';

                setAssetLoading(true);
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

    const getUploadViewHeight = (): number => {
        if (hasCustomHeight) {
            return parseInt(customHeight);
        }

        if (height !== Height.Auto) {
            return heightMap[height];
        }

        return heightMap.m;
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

    const renderSliderItem = (slot: SliderImageSlot) => {
        return (
            <div className="tw-grow">
                <div
                    style={{
                        background: hasBackground
                            ? toRgbaString(backgroundColor || DEFAULT_BACKGROUND_COLOR)
                            : undefined,
                    }}
                >
                    <ResponsiveImage
                        image={slot === SliderImageSlot.First ? firstAsset[0] : secondAsset[0]}
                        alt={slot === SliderImageSlot.First ? firstAssetAlt || '' : secondAssetAlt || ''}
                        containerWidth={containerWidth}
                        className="tw-w-full tw-object-cover"
                        testId={`slider-item-${slot}`}
                    />
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
                style={{
                    height: getUploadViewHeight(),
                }}
                className="tw-flex"
            >
                <UploadView
                    alignment={alignment}
                    isFirstAssetLoading={isFirstAssetLoading}
                    isSecondAssetLoading={isSecondAssetLoading}
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
                <div
                    data-test-id="compare-slider-block"
                    ref={setContainerRef}
                    className="tw-w-full tw-flex tw-relative"
                >
                    {isFirstAssetLoaded && isSecondAssetLoaded && (
                        <>
                            <div
                                data-test-id="compare-slider-block-slider"
                                className="tw-w-full tw-overflow-hidden tw-relative [&_.handle]:focus-within:tw-ring-4 [&_.handle]:focus-within:tw-ring-offset-2"
                                style={{
                                    ...getBorderStyle(),
                                    borderRadius: getBorderRadius(),
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
                        </>
                    )}
                </div>
            </StyleProvider>
        </div>
    );
};
