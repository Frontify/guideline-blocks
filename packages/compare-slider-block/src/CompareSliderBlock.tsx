import type { FC } from 'react';
import { useRef } from 'react';
import { useBlockAssets, useBlockSettings } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { BlockSettings, Handle, Height, SliderImageSlot, heightStyleMap } from './types';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';
import { Icon, IconEnum, IconSize } from '@frontify/fondue';

export const CompareSliderBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const getFirstAssetPreviewUrl = (): string | undefined =>
        blockAssets?.firstAsset ? blockAssets?.firstAsset[0].previewUrl : undefined;

    const getFirstAssetTitle = (): string | undefined =>
        blockAssets?.firstAsset ? blockAssets?.firstAsset[0].title : undefined;

    const getSecondAssetPreviewUrl = (): string | undefined =>
        blockAssets?.secondAsset ? blockAssets?.secondAsset[0].previewUrl : undefined;

    const getSecondAssetTitle = (): string | undefined =>
        blockAssets?.secondAsset ? blockAssets?.secondAsset[0].title : undefined;

    const getImageHeight = (): number | undefined => {
        if (blockSettings.hasCustomHeight) {
            return blockSettings.customHeight;
        }

        if (blockSettings.height !== Height.Auto) {
            return heightStyleMap[blockSettings.height];
        }

        return calculateAutoImageHeight();
    };

    const calculateAutoImageHeight = (): number | undefined => {
        if (!blockAssets.firstAsset || !blockAssets.secondAsset) {
            return undefined;
        }

        const currentSliderWidth = sliderRef.current?.clientWidth;

        if (!currentSliderWidth) {
            return undefined;
        }

        const assetWithHigherAspectRatio =
            blockAssets.firstAsset[0].width / blockAssets.firstAsset[0].height >
            blockAssets.secondAsset[0].width / blockAssets.firstAsset[0].height
                ? blockAssets.firstAsset[0]
                : blockAssets.secondAsset[0];

        return Math.round((assetWithHigherAspectRatio.height * currentSliderWidth) / assetWithHigherAspectRatio.width);
    };

    const getBorderRadius = () => {
        if (blockSettings.hasCustomBorderRadius) {
            return blockSettings.customBorderRadius;
        }

        return radiusStyleMap[blockSettings.borderRadius];
    };

    const getSliderItem = (slot: SliderImageSlot) => {
        const hasLink =
            slot === SliderImageSlot.First ? blockSettings.firstAssetHasLink : blockSettings.secondAssetHasLink;
        const link = slot === SliderImageSlot.First ? blockSettings.firstAssetLink : blockSettings.secondAssetLink;

        if (hasLink && link?.link?.link) {
            return (
                <a slot={slot} target={`${link.openInNewTab ? '_blank' : '_self'}`} href={link?.link?.link}>
                    <img
                        src={slot === SliderImageSlot.First ? getFirstAssetPreviewUrl() : getSecondAssetPreviewUrl()}
                        alt={slot === SliderImageSlot.First ? getFirstAssetTitle() : getSecondAssetTitle()}
                        className={'tw-w-full tw-object-cover'}
                        style={{ height: getImageHeight() }}
                    />
                </a>
            );
        }

        return (
            <img
                slot={slot}
                src={slot === SliderImageSlot.First ? getFirstAssetPreviewUrl() : getSecondAssetPreviewUrl()}
                alt={slot === SliderImageSlot.First ? getFirstAssetTitle() : getSecondAssetTitle()}
                className={'tw-w-full tw-object-cover'}
                style={{ height: getImageHeight() }}
            />
        );
    };

    const getHandle = () => {
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
            <div slot="handle" className="tw-flex" style={{ color: toRgbaString(blockSettings.sliderColor) }}>
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
                className={!blockSettings.customHeight && blockSettings.height === Height.Auto ? 'tw-w-full' : ''}
                style={
                    {
                        'border-width': blockSettings.borderWidth,
                        'border-color': toRgbaString(blockSettings.borderColor),
                        'border-style': blockSettings.borderStyle,
                        'border-radius': getBorderRadius(),
                        '--divider-width': blockSettings.sliderWidth,
                        '--divider-color': toRgbaString(blockSettings.sliderColor),
                        '--default-handle-opacity': blockSettings.handle === Handle.None ? 0 : 1,
                    } as React.CSSProperties
                }
            >
                {getSliderItem(SliderImageSlot.First)}
                {getSliderItem(SliderImageSlot.Second)}
                {blockSettings.handle !== Handle.None ? getHandle() : ''}
            </ImgComparisonSlider>
        </div>
    );
};
