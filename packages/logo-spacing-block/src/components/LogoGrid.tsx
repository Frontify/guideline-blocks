import { CLEAR_SPACE_PERCENT_SIZE } from '../constants';
import { GridElementPosition, LogoGridProps, Property } from '../types';
import { useRef, useState } from 'react';

import { GridElement } from './GridElement';

export const LogoGrid = ({ asset, containerHeight, containerWidth, settings }: LogoGridProps) => {
    const logoContainerRef = useRef<HTMLDivElement>(null);
    const [logoRef, setLogoRef] = useState<HTMLImageElement | null>(null);

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
        if (hasCustomOffset) {
            offsetValue = convertToNumber(offset);
        }

        return (containerSize * percent) / 100 - offsetValue;
    };

    const getTemplateColumn = () => {
        const firstColumn = getTempateSize(clearSpaceLeft, offsetLeft);
        const thirdColumn = getTempateSize(clearSpaceRight, offsetRight);

        const secondColumn = containerWidth - firstColumn - thirdColumn;

        return `${firstColumn}px ${secondColumn}px ${thirdColumn}px`;
    };

    const getTemplateRow = () => {
        const firstRow = getTempateSize(clearSpaceTop, offsetTop);
        const thirdRow = getTempateSize(clearSpaceBottom, offsetBottom);

        const logoHeight = 'auto'; //logoRef?.offsetHeight || 0;

        return `${firstRow}px ${logoHeight} ${thirdRow}px`;
    };

    return (
        <div className="tw-w-full tw-flex tw-justify-center">
            {containerHeight > 0 && (
                <div
                    className="tw-grid-cols-3 tw-grid-rows-3 tw-grid tw-border tw-border-dashed"
                    ref={logoContainerRef}
                    style={{
                        gridTemplateColumns: getTemplateColumn(),
                        gridTemplateRows: getTemplateRow(),
                        width: `${containerWidth}px`,
                        minHeight: `${containerHeight}px`,
                    }}
                >
                    <GridElement position={GridElementPosition.Top} col="2" row="1" />
                    <GridElement position={GridElementPosition.Right} col="3" row="2" />
                    <GridElement position={GridElementPosition.Bottom} col="2" row="3" />
                    <GridElement position={GridElementPosition.Left} col="1" row="2" />
                    <div id="middle" className="tw-col-start-2 tw-row-start-2 tw-border tw-border-dashed">
                        <img
                            ref={setLogoRef}
                            className="tw-w-full tw-opacity-0"
                            src={asset.previewUrl}
                            data-test-id="example-asset-upload-image"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
