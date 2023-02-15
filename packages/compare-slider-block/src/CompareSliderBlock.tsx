import type { FC } from 'react';
import { useRef } from 'react';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    Alignment,
    BlockSettings,
    Handle,
    Height,
    SliderImageSlot,
    blankSlateWidthStyleMap,
    captionPlacementStyleMap,
    heightMap,
} from './types';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { joinClassNames, radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';
import { Icon, IconEnum, IconSize } from '@frontify/fondue';

export const CompareSliderBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const { firstAsset, secondAsset } = blockAssets;

    const sliderRef = useRef<HTMLDivElement | null>(null);

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
        if (slot === SliderImageSlot.First && !firstAsset && (isEditing || secondAsset)) {
            return renderFirstSlotBlankSlate();
        }

        if (slot === SliderImageSlot.Second && !secondAsset && (isEditing || firstAsset)) {
            return renderSecondSlotBlankSlate();
        }

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
            </div>
        );
    };

    const renderFirstSlotBlankSlate = () => {
        return (
            <div
                slot={SliderImageSlot.First}
                className={`${blankSlateWidthStyleMap[blockSettings.height]} tw-bg-black-5`}
                style={renderBlankSlateInlineStyles()}
            >
                <div
                    className={joinClassNames([
                        `${blockSettings?.alignment === Alignment.Horizontal ? 'tw-w-[50%]' : 'tw-h-[50%]'}`,
                        'tw-h-full tw-flex tw-justify-center tw-items-center',
                    ])}
                >
                    Empty first
                </div>
            </div>
        );
    };

    const renderSecondSlotBlankSlate = () => {
        return (
            <div
                slot={SliderImageSlot.Second}
                className={`${blankSlateWidthStyleMap[blockSettings.height]} tw-bg-black-5`}
                style={renderBlankSlateInlineStyles()}
            >
                <div
                    className={joinClassNames([
                        `${
                            blockSettings?.alignment === Alignment.Horizontal
                                ? 'tw-w-[50%] tw-absolute tw-left-[50%]'
                                : 'tw-w-full tw-h-[50%] tw-absolute tw-top-[50%]'
                        }`,
                        'tw-h-full tw-flex tw-justify-center tw-items-center',
                    ])}
                >
                    Empty second
                </div>
            </div>
        );
    };

    const renderBlankSlateInlineStyles = () => {
        const height = getImageHeight() || heightMap[Height.Auto];

        return blockSettings.hasCustomHeight
            ? { height: `${height}px`, width: `${height * 1.6}px` }
            : { height: `${height}px` };
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

    const renderHandle = () => {
        if (blockSettings.handle === Handle.Circles) {
            return (
                <div
                    slot="handle"
                    className="tw-flex"
                    style={{ color: toRgbaString(blockSettings.sliderColor), gap: blockSettings.sliderWidth }}
                >
                    <div className="tw-h-[22px] tw-w-[22px] tw-flex tw-justify-center tw-items-center tw-pr-1 tw-bg-white/[.7] tw-rounded-full tw-mr-2">
                        <Icon icon={IconEnum.CaretLeft} size={IconSize.Size24} />
                    </div>
                    <div className="tw-h-[22px] tw-w-[22px] tw-flex tw-justify-center tw-items-center tw-pl-1 tw-bg-white/[.7] tw-rounded-full tw-ml-2">
                        <Icon icon={IconEnum.CaretRight} size={IconSize.Size24} />
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
                <Icon icon={IconEnum.CaretLeft} size={IconSize.Size32} />
                <Icon icon={IconEnum.CaretRight} size={IconSize.Size32} />
            </div>
        );
    };

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
                handle={true}
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
            >
                {renderSliderItem(SliderImageSlot.First)}
                {renderSliderItem(SliderImageSlot.Second)}
                {blockSettings.handle !== Handle.None ? renderHandle() : ''}
            </ImgComparisonSlider>
        </div>
    );
};
