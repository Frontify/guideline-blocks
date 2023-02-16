/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useEffect, useRef, useState } from 'react';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
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
    joinClassNames,
    radiusStyleMap,
    toRgbaString,
    useGuidelineDesignTokens,
} from '@frontify/guideline-blocks-shared';
import {
    IconCaretLeft24,
    IconCaretLeft32,
    IconCaretRight24,
    IconCaretRight32,
    IconPlus24,
    RichTextEditor,
    debounce,
} from '@frontify/fondue';

import {
    Alignment,
    BlockSettings,
    Handle,
    Height,
    SliderImageSlot,
    captionPlacementStyleMap,
    heightMap,
    slotAssetSettingMap,
} from './types';
import { Strikethrough } from './Strikethrough';

export const CompareSliderBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const { designTokens } = useGuidelineDesignTokens();

    const { firstAsset, secondAsset } = blockAssets;

    const isEditing = useEditorState(appBridge);

    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'image/*', multiple: false });

    const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null);
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
        onUploadDone: () => setIsLoading(false),
    });

    const [slotWithUploadInProgress, setSlotWithUploadInProgress] = useState<SliderImageSlot>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const startFileDialogUpload = (slot: SliderImageSlot) => {
        setSlotWithUploadInProgress(slot);
        openFileDialog();
    };

    const startDragAndDropUpload = (files: FileList, slot: SliderImageSlot) => {
        setSlotWithUploadInProgress(slot);
        setDroppedFiles(files);
    };

    const openAssetChooser = (slot: SliderImageSlot) => {
        appBridge.openAssetChooser(
            async (result) => {
                setIsLoading(true);
                await updateAssetIdsFromKey(slot === SliderImageSlot.First ? 'firstAsset' : 'secondAsset', [
                    result[0].id,
                ]);
                setIsLoading(false);
                appBridge.closeAssetChooser();
            },
            {
                objectTypes: [AssetChooserObjectType.ImageVideo],
                extensions: FileExtensionSets['Images'],
            }
        );
    };

    useEffect(() => {
        if (!droppedFiles) {
            return;
        }

        if (droppedFiles.length > 1) {
            return console.error('Please only upload one file per slot.');
        }

        setIsLoading(true);
        uploadFile(droppedFiles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [droppedFiles]);

    useEffect(() => {
        if (selectedFiles) {
            setIsLoading(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults && slotWithUploadInProgress) {
            (async (uploadResults) => {
                const resultId = uploadResults[0].id;
                await updateAssetIdsFromKey(slotAssetSettingMap[slotWithUploadInProgress], [resultId]);
                setIsLoading(false);
                setSlotWithUploadInProgress(undefined);
            })(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    const sliderRef = useRef<HTMLDivElement | null>(null);

    const [firstAssetStrikethroughOffset, setFirstAssetStrikethroughOffset] = useState<number>(0);
    const [secondAssetStrikethroughOffset, setSecondAssetStrikethroughOffset] = useState<number>(0);

    const getFirstAssetPreviewUrl = (): string | undefined => (firstAsset ? firstAsset[0].previewUrl : undefined);
    const getFirstAssetTitle = (): string | undefined => (firstAsset ? firstAsset[0].title : undefined);
    const getSecondAssetPreviewUrl = (): string | undefined => (secondAsset ? secondAsset[0].previewUrl : undefined);
    const getSecondAssetTitle = (): string | undefined => (secondAsset ? secondAsset[0].title : undefined);

    const getImageHeight = (): number | undefined => {
        if (blockSettings.hasCustomHeight) {
            return parseInt(blockSettings.customHeight);
        }

        if (blockSettings.height !== Height.Auto) {
            return heightMap[blockSettings.height];
        }

        return calculateAutoImageHeight();
    };

    const calculateAutoImageHeight = (): number | undefined => {
        if (!firstAsset || !secondAsset) {
            return undefined;
        }

        const currentSliderWidth = sliderRef.current?.clientWidth;

        if (!currentSliderWidth) {
            return undefined;
        }

        const assetWithHigherAspectRatio =
            firstAsset[0].width / firstAsset[0].height > secondAsset[0].width / firstAsset[0].height
                ? firstAsset[0]
                : secondAsset[0];

        return Math.round((assetWithHigherAspectRatio.height * currentSliderWidth) / assetWithHigherAspectRatio.width);
    };

    const getBorderRadius = () => {
        if (blockSettings.hasCustomBorderRadius) {
            return blockSettings.customBorderRadius;
        }

        return radiusStyleMap[blockSettings.borderRadius];
    };

    const renderSliderItem = (slot: SliderImageSlot) => {
        return (
            <div slot={slot}>
                <img
                    src={slot === SliderImageSlot.First ? getFirstAssetPreviewUrl() : getSecondAssetPreviewUrl()}
                    alt={slot === SliderImageSlot.First ? getFirstAssetTitle() : getSecondAssetTitle()}
                    className="tw-w-full tw-object-cover"
                    style={{ height: getImageHeight() }}
                />

                {slot === SliderImageSlot.First &&
                    blockSettings.firstAssetHasCaption &&
                    blockSettings.firstAssetCaption &&
                    renderFirstSlotCaption()}

                {slot === SliderImageSlot.Second &&
                    blockSettings.secondAssetHasCaption &&
                    blockSettings.secondAssetCaption &&
                    renderSecondSlotCaption()}

                {slot === SliderImageSlot.First &&
                    blockSettings.firstAssetHasStrikethrough &&
                    renderFirstSlotStrikethrough()}

                {slot === SliderImageSlot.Second &&
                    blockSettings.secondAssetHasStrikethrough &&
                    renderSecondSlotStrikethrough()}
            </div>
        );
    };

    const renderFirstSlotCaption = () => {
        return (
            <div
                className={joinClassNames([
                    captionPlacementStyleMap[blockSettings.firstAssetCaptionPlacement],
                    'tw-absolute tw-flex tw-max-w-[40%] tw-ml-3 tw-px-2 tw-py-1 tw-bg-white/60 tw-rounded-sm tw-text-black tw-text-sm',
                ])}
            >
                {blockSettings.firstAssetCaption}
            </div>
        );
    };

    const renderSecondSlotCaption = () => {
        return (
            <div
                className={joinClassNames([
                    captionPlacementStyleMap[blockSettings.secondAssetCaptionPlacement],
                    'tw-absolute tw-flex tw-max-w-[40%] tw-right-0 tw-mr-3 tw-px-2 tw-py-1 tw-bg-white/60 tw-rounded-sm tw-text-black tw-text-sm',
                ])}
            >
                {blockSettings.secondAssetCaption}
            </div>
        );
    };

    const renderFirstSlotStrikethrough = () => {
        return (
            <div
                style={{
                    left: `${blockSettings.alignment === Alignment.Horizontal ? firstAssetStrikethroughOffset : 0}%`,
                    top: `${blockSettings.alignment === Alignment.Vertical ? firstAssetStrikethroughOffset : 0}%`,
                }}
                className={
                    blockSettings.alignment === Alignment.Horizontal
                        ? 'tw-absolute tw-h-full tw-w-[50%] tw-top-0'
                        : 'tw-absolute tw-h-[50%] tw-w-full tw-left-0'
                }
            >
                <Strikethrough />
            </div>
        );
    };

    const renderSecondSlotStrikethrough = () => {
        return (
            <div
                style={{
                    right: `${blockSettings.alignment === Alignment.Horizontal ? secondAssetStrikethroughOffset : 0}%`,
                    bottom: `${blockSettings.alignment === Alignment.Vertical ? secondAssetStrikethroughOffset : 0}%`,
                }}
                className={
                    blockSettings.alignment === Alignment.Horizontal
                        ? 'tw-absolute tw-h-full tw-w-[50%] tw-top-0'
                        : 'tw-absolute tw-h-[50%] tw-w-full tw-left-0'
                }
            >
                <Strikethrough />
            </div>
        );
    };

    const renderHandle = () => {
        if (blockSettings.handle === Handle.Circles) {
            return (
                <div
                    slot="handle"
                    className="tw-flex"
                    style={{ color: toRgbaString(blockSettings.sliderColor), gap: blockSettings.sliderWidth }}
                >
                    <div className="tw-h-[22px] tw-w-[22px] tw-flex tw-justify-center tw-items-center tw-pr-1 tw-bg-white/[.7] tw-rounded-full tw-mr-2">
                        <IconCaretLeft24 />
                    </div>
                    <div className="tw-h-[22px] tw-w-[22px] tw-flex tw-justify-center tw-items-center tw-pl-1 tw-bg-white/[.7] tw-rounded-full tw-ml-2">
                        <IconCaretRight24 />
                    </div>
                </div>
            );
        }

        return (
            <div
                slot="handle"
                className="tw-flex"
                style={{ color: toRgbaString(blockSettings.sliderColor), gap: blockSettings.sliderWidth }}
            >
                <IconCaretLeft32 />
                <IconCaretRight32 />
            </div>
        );
    };

    const handleSlide = debounce((event: { target: { value: number } }) => {
        const currentHandlePosition = event.target.value;
        const currentSliderWidth = sliderRef.current?.clientWidth;

        if (!currentSliderWidth) {
            return;
        }

        if (currentHandlePosition > 50) {
            setFirstAssetStrikethroughOffset((currentHandlePosition - 50) / 2);
            setSecondAssetStrikethroughOffset(0);
        }

        if (currentHandlePosition <= 50) {
            setFirstAssetStrikethroughOffset(0);
            setSecondAssetStrikethroughOffset((100 - currentHandlePosition - 50) / 2);
        }
    }, 0);

    if (isEditing && (!firstAsset || !secondAsset)) {
        return (
            <div className="tw-h-[500px] tw-flex">
                <div className="tw-w-[50%]">
                    {firstAsset ? (
                        <img
                            className="tw-w-full tw-h-full tw-object-cover tw-object-left"
                            src={getFirstAssetPreviewUrl()}
                            alt={getFirstAssetTitle()}
                        />
                    ) : (
                        <BlockInjectButton
                            label="Add first image"
                            icon={<IconPlus24 />}
                            fillParentContainer={true}
                            secondaryLabel="Or drop it here"
                            onUploadClick={() => startFileDialogUpload(SliderImageSlot.First)}
                            onAssetChooseClick={() => openAssetChooser(SliderImageSlot.First)}
                            onDrop={(files) => startDragAndDropUpload(files, SliderImageSlot.First)}
                            isLoading={slotWithUploadInProgress === SliderImageSlot.First && isLoading}
                        />
                    )}
                </div>

                <div className="tw-w-[50%] tw-border-r-0">
                    {secondAsset ? (
                        <img
                            className="tw-w-full tw-h-full tw-object-cover tw-object-right"
                            src={getSecondAssetPreviewUrl()}
                            alt={getSecondAssetTitle()}
                        />
                    ) : (
                        <BlockInjectButton
                            label="Add second image"
                            icon={<IconPlus24 />}
                            fillParentContainer={true}
                            secondaryLabel="Or drop it here"
                            onUploadClick={() => startFileDialogUpload(SliderImageSlot.Second)}
                            onAssetChooseClick={() => openAssetChooser(SliderImageSlot.Second)}
                            onDrop={(files) => startDragAndDropUpload(files, SliderImageSlot.Second)}
                            isLoading={slotWithUploadInProgress === SliderImageSlot.Second && isLoading}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            ref={sliderRef}
            className={
                !blockSettings.customHeight && blockSettings.height === Height.Auto
                    ? 'tw-w-full'
                    : 'tw-flex tw-justify-center'
            }
        >
            <ImgComparisonSlider
                direction={blockSettings?.alignment}
                className={!blockSettings.hasCustomHeight && blockSettings.height === Height.Auto ? 'tw-w-full' : ''}
                style={
                    {
                        borderWidth: blockSettings.borderWidth,
                        borderColor: toRgbaString(blockSettings.borderColor),
                        borderStyle: blockSettings.borderStyle,
                        borderRadius: getBorderRadius(),
                        '--divider-width': blockSettings.sliderWidth,
                        '--divider-color': toRgbaString(blockSettings.sliderColor),
                        '--default-handle-opacity': blockSettings.handle === Handle.None ? 0 : 1,
                    } as React.CSSProperties
                }
                onSlide={handleSlide}
            >
                {renderSliderItem(SliderImageSlot.First)}
                {renderSliderItem(SliderImageSlot.Second)}
                {blockSettings.handle !== Handle.None ? renderHandle() : ''}
            </ImgComparisonSlider>

            <div className="tw-flex tw-flex-col tw-mt-3 tw-gap-1">
                <RichTextEditor
                    value={blockSettings.sliderName}
                    border={false}
                    readonly={!isEditing}
                    onBlur={(sliderName) => setBlockSettings({ sliderName })}
                    designTokens={designTokens ?? undefined}
                    placeholder={isEditing ? 'Asset name' : undefined}
                />
                <RichTextEditor
                    value={blockSettings.sliderDescription}
                    border={false}
                    readonly={!isEditing}
                    onBlur={(sliderDescription) => setBlockSettings({ sliderDescription })}
                    designTokens={designTokens ?? undefined}
                    placeholder={isEditing ? 'Add a description here' : undefined}
                />
            </div>
        </div>
    );
};
