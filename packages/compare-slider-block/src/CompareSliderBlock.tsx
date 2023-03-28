/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';
import { ReactCompareSlider } from 'react-compare-slider';

import { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    AssetChooserObjectType,
    FileExtensionSets,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';
import { radiusStyleMap, toRgbaString, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import {
    Alignment,
    BlockSettings,
    Height,
    InheritSettings,
    SliderImageSlot,
    heightMap,
    slotAssetSettingMap,
} from './types';
import { DEFAULT_STRIKETHROUGH_COLOR } from './const';
import {
    EditorOverlay,
    Label,
    LabelWrapper,
    SliderLine,
    Strikethrough,
    StrikethroughWrapper,
    UploadView,
} from './components';

export const CompareSliderBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const { designTokens } = useGuidelineDesignTokens();
    const isEditing = useEditorState(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'image/*', multiple: false });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload();

    const sliderRef = useRef<HTMLDivElement | null>(null);

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
        secondAssetHasStrikethrough,
        secondAssetLabel,
        secondAssetLabelPlacementHorizontal,
        secondAssetLabelPlacementVertical,
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

    const firstAssetTitle = firstAsset ? firstAsset[0].title : '';
    const firstAssetPreviewUrl = firstAsset ? firstAsset[0].previewUrl : '';
    const secondAssetTitle = secondAsset ? secondAsset[0].title : '';
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
        if (slotWithUploadInProgress === SliderImageSlot.First) {
            setIsFirstAssetLoading(true);
        } else {
            setIsSecondAssetLoading(true);
        }
        uploadFile(droppedFiles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [droppedFiles]);

    useEffect(() => {
        if (selectedFiles) {
            if (slotWithUploadInProgress === SliderImageSlot.First) {
                setIsFirstAssetLoading(true);
            } else {
                setIsSecondAssetLoading(true);
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

    const handleAssetDelete = (key: string, id: number) => {
        deleteAssetIdsFromKey(key, [id]);
    };

    const openAssetChooser = (slot: SliderImageSlot) => {
        appBridge.openAssetChooser(
            async (result) => {
                if (slot === SliderImageSlot.First) {
                    setIsFirstAssetLoading(true);
                } else {
                    setIsSecondAssetLoading(true);
                }
                updateAssetIdsFromKey(slot === SliderImageSlot.First ? 'firstAsset' : 'secondAsset', [result[0].id]);
                appBridge.closeAssetChooser();
            },
            {
                objectTypes: [AssetChooserObjectType.ImageVideo],
                extensions: FileExtensionSets['Images'],
            }
        );
    };

    const calculateAutoImageHeight = (): number => {
        const currentSliderWidth = sliderRef.current?.clientWidth;
        if (!firstAsset || !secondAsset || !currentSliderWidth) {
            return 0;
        }

        const assetWithSmallerAspectRatio =
            firstAsset[0].width / firstAsset[0].height > secondAsset[0].width / firstAsset[0].height
                ? secondAsset[0]
                : firstAsset[0];

        return Math.round(
            (assetWithSmallerAspectRatio.height * currentSliderWidth) / assetWithSmallerAspectRatio.width
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

    const getImageHeight = (): number => {
        if (hasCustomHeight) {
            return parseInt(customHeight);
        }

        if (height !== Height.Auto) {
            return heightMap[height];
        }

        return calculateAutoImageHeight();
    };

    const getBorderStyle = () => {
        return hasBorder ? { borderWidth, borderColor: toRgbaString(borderColor), borderStyle } : {};
    };

    const getBorderRadius = () => {
        if (hasRadius) {
            return radiusValue;
        }

        return radiusStyleMap[radiusChoice];
    };

    const renderSliderItem = (slot: SliderImageSlot) => {
        return (
            <div>
                <div style={{ background: hasBackground ? toRgbaString(backgroundColor) : undefined }}>
                    <img
                        src={slot === SliderImageSlot.First ? firstAssetPreviewUrl : secondAssetPreviewUrl}
                        alt={slot === SliderImageSlot.First ? firstAssetTitle : secondAssetTitle}
                        className="tw-w-full tw-object-cover"
                        style={{ height: getImageHeight() }}
                    />
                </div>

                {renderStrikethrough(slot)}
                {!isEditing && renderLabel(slot)}
            </div>
        );
    };

    const renderStrikethrough = (slot: SliderImageSlot) => {
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
                            ? toRgbaString(customStrikeThroughColor)
                            : designTokens.callout?.warning ?? toRgbaString(DEFAULT_STRIKETHROUGH_COLOR)
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
                    isEditing={isEditing}
                    designTokens={designTokens}
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
                    openAssetChooser={openAssetChooser}
                    startDragAndDropUpload={startDragAndDropUpload}
                    startFileDialogUpload={startFileDialogUpload}
                    firstAssetPreviewUrl={firstAssetPreviewUrl}
                    secondAssetPreviewUrl={secondAssetPreviewUrl}
                />
            </div>
        );
    }
    return (
        <div data-test-id="compare-slider-block" ref={sliderRef} className="tw-w-full tw-flex tw-relative">
            {isFirstAssetLoaded && isSecondAssetLoaded && (
                <>
                    <div
                        data-test-id="compare-slider-block-slider"
                        className="tw-w-full tw-overflow-hidden tw-relative"
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
                                    sliderColor={sliderColor}
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
                            openAssetChooser={openAssetChooser}
                            startFileDialogUpload={startFileDialogUpload}
                            firstAsset={firstAsset}
                            secondAsset={secondAsset}
                            borderStyle={{ ...getBorderStyle(), borderColor: 'transparent' }}
                            renderLabel={renderLabel}
                            handleAssetDelete={handleAssetDelete}
                        />
                    )}
                </>
            )}
        </div>
    );
};
