import { GridElementPosition, LogoGridProps } from '../types';

import { CSSProperties } from 'react';
import { GridElement } from './GridElement';
import { LINE_STYLE } from '../constants';
import { toRgbaString } from '@frontify/guideline-blocks-shared';

export const LogoGrid = ({
    asset,
    bgColor,
    borderSettings,
    containerHeight,
    content,
    labelColor,
    logoWidth,
}: LogoGridProps) => {
    const { lineColor, lineStyle, lineWidth } = borderSettings;
    const borderStyle = {
        borderStyle: LINE_STYLE[lineStyle],
        borderColor: toRgbaString(lineColor),
    } as unknown as CSSProperties;
    const gridProps = {
        bgColor,
        borderStyle,
        borderWidth: lineWidth,
    };

    const logoWidthPercentage = `${logoWidth}%`;
    const middleSpacePercentage = logoWidth === 100 ? '0%' : logoWidthPercentage;
    const spaceWidthPercentage = `${(100 - logoWidth) / 2}%`;
    return (
        <div className="tw-w-full tw-flex tw-justify-center">
            {containerHeight > 0 && (
                <div className="tw-flex tw-flex-col tw-flex-1">
                    <div className="tw-flex">
                        <GridElement
                            {...gridProps}
                            position={GridElementPosition.TopLeft}
                            width={spaceWidthPercentage}
                        />
                        <GridElement
                            {...gridProps}
                            labelColor={labelColor}
                            position={GridElementPosition.Top}
                            width={middleSpacePercentage}
                        >
                            {content.top}
                        </GridElement>
                        <GridElement
                            {...gridProps}
                            position={GridElementPosition.TopRight}
                            width={spaceWidthPercentage}
                        />
                    </div>
                    <div className="tw-flex tw-flex-1">
                        <GridElement
                            {...gridProps}
                            labelColor={labelColor}
                            position={GridElementPosition.Left}
                            width={spaceWidthPercentage}
                        >
                            {content.right}
                        </GridElement>
                        <div
                            id="middle"
                            className="tw-col-start-2 tw-row-start-2"
                            style={{ ...borderStyle, borderWidth: lineWidth, width: logoWidthPercentage }}
                        >
                            <img
                                className="tw-w-full tw-opacity-0"
                                src={asset.previewUrl}
                                data-test-id="example-asset-upload-image"
                            />
                        </div>
                        <GridElement
                            {...gridProps}
                            labelColor={labelColor}
                            position={GridElementPosition.Right}
                            width={spaceWidthPercentage}
                        >
                            {content.left}
                        </GridElement>
                    </div>
                    <div className="tw-flex tw-flex-1">
                        <GridElement
                            {...gridProps}
                            position={GridElementPosition.BottomLeft}
                            width={spaceWidthPercentage}
                        />
                        <GridElement
                            {...gridProps}
                            labelColor={labelColor}
                            position={GridElementPosition.Bottom}
                            width={middleSpacePercentage}
                        >
                            {content.bottom}
                        </GridElement>
                        <GridElement
                            {...gridProps}
                            position={GridElementPosition.BottomRight}
                            width={spaceWidthPercentage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
