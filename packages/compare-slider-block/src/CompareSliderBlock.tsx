/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useEffect, useRef, useState } from 'react';
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
import {
    BlockInjectButton,
    BlockItemWrapper,
    joinClassNames,
    radiusStyleMap,
    toRgbaString,
    useGuidelineDesignTokens,
} from '@frontify/guideline-blocks-shared';
import { IconArrowCircleUp20, IconImageStack20, IconPlus24, IconTrashBin16 } from '@frontify/fondue';

import {
    Alignment,
    BlockSettings,
    Height,
    InheritSettings,
    SliderImageSlot,
    heightMap,
    horizontalLabelPlacementStyleMap,
    slotAssetSettingMap,
    verticalLabelPlacementStyleMap,
} from './types';
import { Label } from './components/Label/Label';
import { Strikethrough } from './components/StrikeThrough/Strikethrough';
import { StrikethroughWrapper } from './components/StrikeThrough/StrikethroughWrapper';
import { DEFAULT_STRIKETHROUGH_COLOR } from './const';
import { LabelWrapper } from './components/Label/LabelWrapper';
import { SliderLine } from './components/SliderLine/SliderLine';

export const CompareSliderBlock: FC<BlockProps> = ({ appBridge }) => {
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
        firstAssetLabelPlacement_horizontal,
        firstAssetLabelPlacement_vertical,
        secondAssetHasStrikethrough,
        secondAssetLabel,
        secondAssetLabelPlacement_horizontal,
        secondAssetLabelPlacement_vertical,
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

    const calculateAutoImageHeight = (): number | undefined => {
        if (!firstAsset || !secondAsset) {
            return 0;
        }

        const currentSliderWidth = sliderRef.current?.clientWidth;

        if (!currentSliderWidth) {
            return undefined;
        }

        const assetWithSmallerAspectRatio =
            firstAsset[0].width / firstAsset[0].height > secondAsset[0].width / firstAsset[0].height
                ? secondAsset[0]
                : firstAsset[0];

        return Math.round(
            (assetWithSmallerAspectRatio.height * currentSliderWidth) / assetWithSmallerAspectRatio.width
        );
    };

    const getImageHeight = (): number | undefined => {
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
        let top = 0;
        let left = 0;
        let height = alignment === Alignment.Horizontal ? 100 : currentSliderPosition;
        let width = alignment === Alignment.Horizontal ? currentSliderPosition : 100;

        if (slot === SliderImageSlot.Second) {
            top = alignment === Alignment.Horizontal ? 0 : currentSliderPosition;
            left = alignment === Alignment.Horizontal ? currentSliderPosition : 0;
            height = alignment === Alignment.Horizontal ? 100 : 100 - currentSliderPosition;
            width = alignment === Alignment.Horizontal ? 100 - currentSliderPosition : 100;
            if (!secondAssetHasStrikethrough) {
                return null;
            }
        }
        if (slot === SliderImageSlot.First && !firstAssetHasStrikethrough) {
            return null;
        }
        return (
            <StrikethroughWrapper top={top} height={height} width={width} left={left} borderRadius={getBorderRadius()}>
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
        const verticalPlacement =
            slot === SliderImageSlot.First ? firstAssetLabelPlacement_vertical : secondAssetLabelPlacement_vertical;
        const horizontalPlacement =
            slot === SliderImageSlot.First ? firstAssetLabelPlacement_horizontal : secondAssetLabelPlacement_horizontal;
        const label = slot === SliderImageSlot.First ? firstAssetLabel : secondAssetLabel;
        const key = slot === SliderImageSlot.First ? 'firstAssetLabel' : 'secondAssetLabel';

        let left = alignment === Alignment.Vertical ? verticalLabelPlacementStyleMap[verticalPlacement]?.left : 0;
        let right =
            alignment === Alignment.Vertical ? verticalLabelPlacementStyleMap[verticalPlacement]?.right : undefined;
        let top = alignment === Alignment.Vertical ? 0 : horizontalLabelPlacementStyleMap[horizontalPlacement]?.top;
        let bottom =
            alignment === Alignment.Vertical
                ? undefined
                : horizontalLabelPlacementStyleMap[horizontalPlacement]?.bottom;

        if (slot === SliderImageSlot.Second) {
            left =
                alignment === Alignment.Vertical ? verticalLabelPlacementStyleMap[verticalPlacement]?.left : undefined;
            right = alignment === Alignment.Vertical ? verticalLabelPlacementStyleMap[verticalPlacement]?.right : 0;
            top =
                alignment === Alignment.Vertical
                    ? undefined
                    : horizontalLabelPlacementStyleMap[horizontalPlacement]?.top;
            bottom =
                alignment === Alignment.Vertical ? 0 : horizontalLabelPlacementStyleMap[horizontalPlacement]?.bottom;
        }

        return (
            <LabelWrapper
                alignment={alignment}
                left={left}
                right={right}
                top={top}
                bottom={bottom}
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
            <div className="tw-h-[500px] tw-flex">
                <div
                    className={joinClassNames([
                        'tw-grid tw-w-full',
                        alignment === Alignment.Vertical ? 'tw-grid-cols-1 tw-grid-rows-2' : 'tw-grid-cols-2',
                    ])}
                >
                    {firstAsset ? (
                        <img
                            className="tw-w-full tw-h-full tw-object-cover tw-object-left"
                            src={firstAssetPreviewUrl}
                            alt={firstAssetTitle}
                        />
                    ) : (
                        <BlockInjectButton
                            verticalLayout={alignment === Alignment.Vertical}
                            label="Add or drop image here"
                            icon={<IconPlus24 />}
                            fillParentContainer={true}
                            onUploadClick={() => startFileDialogUpload(SliderImageSlot.First)}
                            onAssetChooseClick={() => openAssetChooser(SliderImageSlot.First)}
                            onDrop={(files) => startDragAndDropUpload(files, SliderImageSlot.First)}
                            isLoading={isFirstAssetLoading}
                        />
                    )}

                    {secondAsset ? (
                        <img
                            className="tw-w-full tw-h-full tw-object-cover tw-object-right"
                            src={secondAssetPreviewUrl}
                            alt={secondAssetTitle}
                        />
                    ) : (
                        <BlockInjectButton
                            verticalLayout={alignment === Alignment.Vertical}
                            label="Add or drop image here"
                            icon={<IconPlus24 />}
                            fillParentContainer={true}
                            onUploadClick={() => startFileDialogUpload(SliderImageSlot.Second)}
                            onAssetChooseClick={() => openAssetChooser(SliderImageSlot.Second)}
                            onDrop={(files) => startDragAndDropUpload(files, SliderImageSlot.Second)}
                            isLoading={isSecondAssetLoading}
                        />
                    )}
                </div>
            </div>
        );
    }
    return (
        <>
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
                            <>
                                <div
                                    style={{
                                        left: 0,
                                        top: 0,
                                        width: alignment === Alignment.Vertical ? '100%' : '50%',
                                        height: alignment === Alignment.Vertical ? '50%' : '100%',
                                    }}
                                    className="tw-absolute tw-flex tw-top-0"
                                >
                                    <BlockItemWrapper
                                        shouldFillContainer
                                        outlineOffset={1}
                                        toolbarItems={[
                                            {
                                                icon: <IconTrashBin16 />,
                                                onClick: () => handleAssetDelete('firstAsset', firstAsset[0].id),
                                                tooltip: 'Remove asset',
                                            },
                                        ]}
                                        toolbarFlyoutItems={[
                                            [
                                                {
                                                    title: 'Replace with upload',
                                                    icon: <IconArrowCircleUp20 />,
                                                    onClick: () => startFileDialogUpload(SliderImageSlot.First),
                                                },
                                                {
                                                    title: 'Replace with asset',
                                                    icon: <IconImageStack20 />,
                                                    onClick: () => openAssetChooser(SliderImageSlot.First),
                                                },
                                            ],
                                        ]}
                                    >
                                        <div className="tw-w-full tw-h-full tw-pointer-events-none" />
                                    </BlockItemWrapper>
                                </div>
                                <div
                                    style={{
                                        left: alignment === Alignment.Vertical ? 0 : '50%',
                                        top: alignment === Alignment.Vertical ? '50%' : 0,
                                        width: alignment === Alignment.Vertical ? '100%' : '50%',
                                        height: alignment === Alignment.Vertical ? '50%' : '100%',
                                    }}
                                    className="tw-absolute tw-flex tw-top-0"
                                >
                                    <BlockItemWrapper
                                        shouldFillContainer
                                        outlineOffset={1}
                                        toolbarItems={[
                                            {
                                                icon: <IconTrashBin16 />,
                                                onClick: () => handleAssetDelete('secondAsset', secondAsset[0].id),
                                                tooltip: 'Remove asset',
                                            },
                                        ]}
                                        toolbarFlyoutItems={[
                                            [
                                                {
                                                    title: 'Replace with upload',
                                                    icon: <IconArrowCircleUp20 />,
                                                    onClick: () => startFileDialogUpload(SliderImageSlot.Second),
                                                },
                                                {
                                                    title: 'Replace with asset',
                                                    icon: <IconImageStack20 />,
                                                    onClick: () => openAssetChooser(SliderImageSlot.Second),
                                                },
                                            ],
                                        ]}
                                    >
                                        <div className="tw-w-full tw-h-full" />
                                    </BlockItemWrapper>
                                </div>
                                <div
                                    className="tw-w-full tw-h-full tw-absolute tw-pointer-events-none"
                                    style={{ ...getBorderStyle(), borderColor: 'transparent' }}
                                >
                                    <div className="tw-pointer-events-auto">
                                        {renderLabel(SliderImageSlot.First)}
                                        {renderLabel(SliderImageSlot.Second)}
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};
