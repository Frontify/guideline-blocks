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
    content,
    gridTemplateColumns,
    gridTemplateRows,
    labelColor,
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
                        col="1"
                        position={GridElementPosition.TopLeft}
                        row="1"
                    />
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        col="2"
                        labelColor={labelColor}
                        position={GridElementPosition.Top}
                        row="1"
                    >
                        {content.top}
                    </GridElement>
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        col="3"
                        position={GridElementPosition.TopRight}
                        row="1"
                    />
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        col="3"
                        labelColor={labelColor}
                        position={GridElementPosition.Right}
                        row="2"
                    >
                        {content.right}
                    </GridElement>
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        col="1"
                        labelColor={labelColor}
                        position={GridElementPosition.Left}
                        row="2"
                    >
                        {content.left}
                    </GridElement>
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
                        col="1"
                        position={GridElementPosition.BottomLeft}
                        row="3"
                    />
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        col="2"
                        labelColor={labelColor}
                        position={GridElementPosition.Bottom}
                        row="3"
                    >
                        {content.bottom}
                    </GridElement>
                    <GridElement
                        bgColor={bgColor}
                        borderStyle={borderStyle}
                        borderWidth={lineWidth}
                        col="3"
                        position={GridElementPosition.BottomRight}
                        row="3"
                    />
                </div>
            )}
        </div>
    );
};
