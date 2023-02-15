import { Asset, useBlockAssets, useBlockSettings } from '@frontify/app-bridge';
import { Fragment, useEffect, useRef, useState } from 'react';

import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { CLEAR_SPACE_PERCENT_SIZE, CONTAINER_SIZE, LOGO_ID } from './constants';
import { LogoGrid } from './components/LogoGrid';
import { LogoSpacingSettings, LogoSpacingType, Property } from './types';

export const AnExampleBlock = ({ appBridge }: BlockProps) => {
    const blockContainer = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const [
        {
            clearSpaceBottom,
            clearSpaceChoice,
            clearSpaceLeft,
            clearSpacePropertyChoice,
            clearSpaceRight,
            clearSpaceTop,
            containerSizeChoice,
            hasCustomClearSpace,
            hasCustomOffset,
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

        setHeight(logoRef.current.offsetHeight + 2);
    }, [width, isLogoReady]);

    const convertToNumber = (value: string) => {
        return +value.replace(/px|%/, '');
    };

    const getContainerSizeByPercentage = (percent: number) => {
        const containerSize = clearSpacePropertyChoice === Property.Width ? width : height;
        return (containerSize * percent) / 100;
    };

    const getTempateSize = (custom: string) => {
        if (hasCustomClearSpace) {
            const customValue = convertToNumber(custom);
            return logoSpacingType === LogoSpacingType.Pixels ? customValue : getContainerSizeByPercentage(customValue);
        }

        const percent = clearSpaceChoice === 'none' ? 0 : CLEAR_SPACE_PERCENT_SIZE[clearSpaceChoice];

        // let offsetValue = 0;
        // if (hasCustomOffset) {
        //     offsetValue = convertToNumber(offset);
        // }

        return getContainerSizeByPercentage(percent);
    };

    const getTemplateColumn = () => {
        const firstColumn = getTempateSize(clearSpaceLeft) - convertToNumber(offsetLeft);
        const thirdColumn = getTempateSize(clearSpaceRight) - convertToNumber(offsetRight);

        // const secondColumn = width - firstColumn - thirdColumn;

        return `${firstColumn}px auto ${thirdColumn}px`;
    };

    const getTemplateRow = () => {
        const firstRow = getTempateSize(clearSpaceTop);
        const thirdRow = getTempateSize(clearSpaceBottom);

        const usedHeight = firstRow + thirdRow - convertToNumber(offsetTop) - convertToNumber(offsetBottom);

        return `${firstRow}px calc(100% - ${usedHeight}px) ${thirdRow}px`;
    };

    return (
        <div
            ref={blockContainer}
            className="tw-flex tw-relative tw-justify-center"
            data-test-id="example-asset-upload-block"
        >
            {blockAssets[LOGO_ID] ? (
                blockAssets[LOGO_ID].map((asset: Asset) => (
                    <Fragment key={asset.id}>
                        {isContainerReady && (
                            // <div
                            //     style={{
                            //         width: `${width}px`,
                            //         marginTop: `${convertToNumber(offsetTop)}px`,
                            //         marginRight: `${convertToNumber(offsetRight)}px`,
                            //         marginBottom: `${convertToNumber(offsetBottom)}px`,
                            //         marginLeft: `${convertToNumber(offsetLeft)}px`,
                            //     }}
                            // >
                            <div
                                style={{
                                    //         width: `${width}px`,
                                    marginTop: `${convertToNumber(offsetTop) * -1}px`,
                                    //         marginRight: `${convertToNumber(offsetRight)}px`,
                                    //         marginBottom: `${convertToNumber(offsetBottom)}px`,
                                    //         marginLeft: `${convertToNumber(offsetLeft)}px`,
                                }}
                            >
                                <LogoGrid
                                    asset={asset}
                                    containerHeight={height}
                                    containerWidth={width}
                                    gridTemplateColumns={getTemplateColumn()}
                                    gridTemplateRows={getTemplateRow()}
                                />
                            </div>
                        )}
                        <div className="tw-absolute tw-opacity-1 tw-w-full">
                            <div
                                ref={logoRef}
                                className="tw-absolute tw-left-1/2 tw-top-0 tw--translate-x-1/2"
                                style={{
                                    width: `${width}px`,
                                    paddingTop: `${getTempateSize(clearSpaceTop) + 2}px`,
                                    paddingRight: `${getTempateSize(clearSpaceRight) + 2}px`,
                                    paddingBottom: `${getTempateSize(clearSpaceBottom) + 2}px`,
                                    paddingLeft: `${getTempateSize(clearSpaceLeft) + 2}px`,
                                }}
                            >
                                <img className="tw-w-full" onLoad={updateDimensions} src={asset.previewUrl} />
                            </div>
                        </div>
                    </Fragment>
                ))
            ) : (
                <div className=" tw-bg-black-5 tw-w-full tw-flex tw-items-center">
                    <div className="tw-font-semibold">Add logo asset</div>
                    <div>or drop it here</div>
                </div>
            )}
        </div>
    );
};
