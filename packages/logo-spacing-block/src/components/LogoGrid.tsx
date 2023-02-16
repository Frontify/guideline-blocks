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
    containerWidth,
    gridTemplateColumns,
    gridTemplateRows,
}: LogoGridProps) => {
    const { lineColor, lineStyle, lineWidth } = borderSettings;
    const borderStyle = {
        borderStyle: LINE_STYLE[lineStyle],
        borderColor: toRgbaString(lineColor),
    } as unknown as CSSProperties;
    return (
        <div className="tw-w-full tw-flex tw-justify-center">
            {containerHeight > 0 && (
                <div
                    className="tw-grid-cols-3 tw-grid-rows-3 tw-grid"
                    style={{
                        gridTemplateColumns,
                        gridTemplateRows,
                        width: `${containerWidth}px`,
                        minHeight: '100%',
                    }}
                >
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        position={GridElementPosition.TopLeft}
                        col="1"
                        row="1"
                    />
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        position={GridElementPosition.Top}
                        col="2"
                        row="1"
                    />
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        position={GridElementPosition.TopRight}
                        col="3"
                        row="1"
                    />
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        position={GridElementPosition.Right}
                        col="3"
                        row="2"
                    />
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        position={GridElementPosition.Left}
                        col="1"
                        row="2"
                    />
                    <div
                        id="middle"
                        className="tw-col-start-2 tw-row-start-2"
                        style={{ ...borderStyle, borderWidth: lineWidth }}
                    >
                        <img
                            className="tw-w-full tw-opacity-0"
                            src={asset.previewUrl}
                            data-test-id="example-asset-upload-image"
                        />
                    </div>
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        position={GridElementPosition.BottomLeft}
                        col="1"
                        row="3"
                    />
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        position={GridElementPosition.Bottom}
                        col="2"
                        row="3"
                    />
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        position={GridElementPosition.BottomRight}
                        col="3"
                        row="3"
                    />
                </div>
            )}
        </div>
    );
};
