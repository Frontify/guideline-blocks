import { CLEAR_SPACE_PERCENT_SIZE, CONTAINER_SIZE } from '../constants';
import { GridElementPosition, LogoGridProps, Property } from '../types';
import { useRef, useState } from 'react';

import { GridElement } from './GridElement';

export const LogoGrid = ({ asset, containerWidth, settings, showLogo }: LogoGridProps) => {
    const logoContainerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const {
        clearSpaceBottom,
        clearSpaceChoice,
        clearSpaceLeft,
        clearSpacePropertyChoice,
        clearSpaceRight,
        clearSpaceTop,
        containerSizeChoice,
        hasCustomClearSpace,
        hasCustomOffset,
        offsetBottom,
        offsetLeft,
        offsetRight,
        offsetTop,
    } = settings;

    const convertToNumber = (value: string) => {
        return +value.replace(/px|%/, '');
    };

    const getTempateSize = (custom: string, offset: string) => {
        if (hasCustomClearSpace) {
            return convertToNumber(custom);
        }

        if (clearSpaceChoice === 'none' || !logoContainerRef.current) {
            return 0;
        }

        const containerSize =
            clearSpacePropertyChoice === Property.Height
                ? logoContainerRef.current.offsetHeight
                : logoContainerRef.current.offsetWidth;

        const percent = CLEAR_SPACE_PERCENT_SIZE[clearSpaceChoice];

        let offsetValue = 0;
        if (hasCustomOffset && !showLogo) {
            offsetValue = convertToNumber(offset);
        }

        return (containerSize * percent) / 100 - offsetValue;
    };
    const width = (containerWidth * CONTAINER_SIZE[containerSizeChoice]) / 100;

    const getTemplateColumn = () => {
        console.log('Calculating column');
        const firstColumn = getTempateSize(clearSpaceLeft, offsetLeft);
        const thirdColumn = getTempateSize(clearSpaceRight, offsetRight);

        const secondColumn = width - firstColumn - thirdColumn;

        return `${firstColumn}px ${secondColumn}px ${thirdColumn}px`;
    };

    const getTemplateRow = () => {
        const firstRow = getTempateSize(clearSpaceTop, offsetTop);
        const thirdRow = getTempateSize(clearSpaceBottom, offsetBottom);

        const secondRow = height - firstRow - thirdRow;

        return `${firstRow}px ${secondRow}px ${thirdRow}px`;
    };

    const updateHeight = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setHeight(e.currentTarget.offsetHeight);
    };

    const borderStyle = showLogo ? 'tw-border-transparent' : 'tw-border-dashed';

    return (
        <div
            className={`tw-w-full tw-flex tw-justify-center ${
                showLogo ? 'tw-relative tw-z-10' : 'tw-absolute tw-z-20'
            }`}
        >
            {height > 0 && (
                <div
                    className={`tw-grid-cols-3 tw-grid-rows-3 tw-grid tw-border ${borderStyle}`}
                    ref={logoContainerRef}
                    style={{
                        gridTemplateColumns: getTemplateColumn(),
                        gridTemplateRows: getTemplateRow(),
                        width: `${width}px`,
                    }}
                >
                    <GridElement position={GridElementPosition.Top} col="2" row="1" showBorder={showLogo} />
                    <GridElement position={GridElementPosition.Right} col="3" row="2" showBorder={showLogo} />
                    <GridElement position={GridElementPosition.Bottom} col="2" row="3" showBorder={showLogo} />
                    <GridElement position={GridElementPosition.Left} col="1" row="2" showBorder={showLogo} />
                    <div
                        id="middle"
                        className={`tw-col-start-2 tw-row-start-2 tw-border ${
                            showLogo || clearSpaceChoice === 'none' ? 'tw-border-transparent' : 'tw-border-dashed'
                        }`}
                    >
                        {showLogo && (
                            <img
                                className="tw-w-full"
                                src={asset.previewUrl}
                                data-test-id="example-asset-upload-image"
                            />
                        )}
                    </div>
                </div>
            )}
            <div className="tw-absolute tw-opacity-0" style={{ width: `${width}px` }}>
                <img className="tw-w-full" onLoad={updateHeight} src={asset.previewUrl} />
            </div>
        </div>
    );
};
