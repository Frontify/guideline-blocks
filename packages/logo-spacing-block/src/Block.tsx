import { Asset, useBlockAssets, useBlockSettings } from '@frontify/app-bridge';
import { CLEAR_SPACE_PERCENT_SIZE, CONTAINER_SIZE, LOGO_ID } from './constants';
import { Fragment, useEffect, useRef, useState } from 'react';
import { LogoSpacingSettings, LogoSpacingType, Property } from './types';
import { convertToNumber } from './utils/strings';

import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { LogoGrid } from './components/LogoGrid';

export const AnExampleBlock = ({ appBridge }: BlockProps) => {
    const blockContainer = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const [
        {
            clearSpaceBgColor,
            clearSpaceBottom,
            clearSpaceChoice,
            clearSpaceLeft,
            clearSpacePropertyChoice,
            clearSpaceRight,
            clearSpaceTop,
            containerSizeChoice,
            hasCustomClearSpace,
            lineColor,
            lineStyle,
            lineWidth,
            labelColor,
            logoSpacingType,
            offsetBottom,
            offsetLeft,
            offsetRight,
            offsetTop,
        },
    ] = useBlockSettings<LogoSpacingSettings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [isLogoReady, setIsLogoReady] = useState(false);
    const [isContainerReady, setIsContainerReady] = useState(false);

    const updateDimensions = () => {
        setIsLogoReady(true);
    };

    useEffect(() => {
        if (!logoRef.current || !blockContainer.current || !isLogoReady) {
            return;
        }

        setWidth((blockContainer.current.offsetWidth * CONTAINER_SIZE[containerSizeChoice]) / 100);
        setIsContainerReady(true);
    }, [isLogoReady, blockContainer, containerSizeChoice]);

    useEffect(() => {
        if (!logoRef.current || !isLogoReady) {
            return;
        }

        setHeight(logoRef.current.offsetHeight + convertToNumber(lineWidth) * 2);
    }, [width, isLogoReady, lineWidth]);

    const getContainerSizeByPercentage = (percent: number) => {
        const containerSize = clearSpacePropertyChoice === Property.Width ? width : height;
        return (containerSize * percent) / 100;
    };

    const getTemplateSize = (custom: string) => {
        if (hasCustomClearSpace) {
            const customValue = convertToNumber(custom);
            return logoSpacingType === LogoSpacingType.Pixels ? customValue : getContainerSizeByPercentage(customValue);
        }

        const percent = clearSpaceChoice === 'none' ? 0 : CLEAR_SPACE_PERCENT_SIZE[clearSpaceChoice];

        return getContainerSizeByPercentage(percent);
    };

    // const getTemplateColumn = () => {
    //     const firstColumn = getTemplateSize(clearSpaceLeft) - convertToNumber(offsetLeft);
    //     const thirdColumn = getTemplateSize(clearSpaceRight) - convertToNumber(offsetRight);

    //     return `${firstColumn}px ${width}px ${thirdColumn}px`;
    // };

    const getUsedHeight = () => {
        const firstRow = getTemplateSize(clearSpaceTop);
        const thirdRow = getTemplateSize(clearSpaceBottom);

        const usedHeight = firstRow + thirdRow - convertToNumber(offsetTop) - convertToNumber(offsetBottom);

        return {
            firstRow,
            thirdRow,
            usedHeight,
            total: height + firstRow + thirdRow + convertToNumber(offsetTop) + convertToNumber(offsetBottom),
        };
    };

    // const getTemplateRow = () => {
    //     const heights = getUsedHeight();

    //     return `${heights.firstRow}px calc(100% - ${heights.usedHeight}px) ${heights.thirdRow}px`;
    // };

    const getClearSpaceContent = () => {
        if (hasCustomClearSpace) {
            return {
                bottom: clearSpaceBottom,
                left: clearSpaceLeft,
                right: clearSpaceRight,
                top: clearSpaceTop,
            };
        }
        const clearSpacePercentage =
            clearSpaceChoice === 'none' ? '0' : `${CLEAR_SPACE_PERCENT_SIZE[clearSpaceChoice]}%`;
        return {
            bottom: clearSpacePercentage,
            left: clearSpacePercentage,
            right: clearSpacePercentage,
            top: clearSpacePercentage,
        };
    };

    const getLogoWidth = () => {
        const percents = getClearSpaceContent();
        if (clearSpacePropertyChoice === Property.Height) {
            const percentTop = convertToNumber(percents.top);
            const percentBottom = convertToNumber(percents.bottom);
            const ratio = height / width;
            const percent = 100 - (percentTop + percentBottom) * ratio;

            return percent;
        }
        const percentLeft = convertToNumber(percents.left);
        const percentRight = convertToNumber(percents.right);

        return 100 - percentLeft - percentRight;
    };

    return (
        <div
            ref={blockContainer}
            className="tw-flex tw-relative tw-justify-center tw-border tw-pt-10 tw-pb-10"
            data-test-id="example-asset-upload-block"
            style={{ minHeight: `${getUsedHeight().total}px`, marginTop: `${convertToNumber(offsetTop)}px` }}
        >
            {blockAssets[LOGO_ID] ? (
                blockAssets[LOGO_ID].map((asset: Asset) => (
                    <Fragment key={asset.id}>
                        {isContainerReady && (
                            <div
                                className="tw-absolute tw-left-1/2 tw-top-10 tw--translate-x-1/2"
                                style={{ width: `${width}px` }}
                            >
                                <div
                                    style={{
                                        marginTop: `${convertToNumber(offsetTop) * -1}px`,
                                    }}
                                >
                                    <LogoGrid
                                        asset={asset}
                                        bgColor={clearSpaceBgColor}
                                        borderSettings={{
                                            lineColor,
                                            lineStyle,
                                            lineWidth,
                                        }}
                                        containerHeight={height}
                                        content={getClearSpaceContent()}
                                        labelColor={labelColor}
                                        logoWidth={getLogoWidth()}
                                    />
                                </div>
                            </div>
                        )}
                        <div
                            className=" tw-box-border"
                            ref={logoRef}
                            style={{
                                paddingTop: `${clearSpaceChoice === 'none' ? 0 : getTemplateSize(clearSpaceTop) + 2}px`,
                                paddingRight: `${
                                    clearSpaceChoice === 'none' ? 0 : getTemplateSize(clearSpaceRight) + 2
                                }px`,
                                paddingBottom: `${
                                    clearSpaceChoice === 'none' ? 0 : getTemplateSize(clearSpaceBottom) + 2
                                }px`,
                                paddingLeft: `${
                                    clearSpaceChoice === 'none' ? 0 : getTemplateSize(clearSpaceLeft) + 2
                                }px`,
                                width: `${width}px`,
                            }}
                        >
                            <img className="tw-w-full" onLoad={updateDimensions} src={asset.previewUrl} />
                        </div>
                    </Fragment>
                ))
            ) : (
                <div className="tw-bg-black-5 tw-w-full tw-flex tw-items-center">
                    <div className="tw-font-semibold">Add logo asset</div>
                    <div>or drop it here</div>
                </div>
            )}
        </div>
    );
};
