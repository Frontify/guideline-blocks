import { GridElementPosition, LogoGridProps } from '../types';

import { GridElement } from './GridElement';

export const LogoGrid = ({
    asset,
    containerHeight,
    containerWidth,
    gridTemplateColumns,
    gridTemplateRows,
}: LogoGridProps) => {
    return (
        <div className="tw-w-full tw-flex tw-justify-center">
            {containerHeight > 0 && (
                <div
                    className="tw-grid-cols-3 tw-grid-rows-3 tw-grid"
                    style={{
                        gridTemplateColumns,
                        gridTemplateRows,
                        width: `${containerWidth}px`,
                        minHeight: `${containerHeight}px`,
                    }}
                >
                    <GridElement position={GridElementPosition.TopLeft} col="1" row="1" />
                    <GridElement position={GridElementPosition.Top} col="2" row="1" />
                    <GridElement position={GridElementPosition.TopRight} col="3" row="1" />
                    <GridElement position={GridElementPosition.Right} col="3" row="2" />
                    <GridElement position={GridElementPosition.Left} col="1" row="2" />
                    <div
                        id="middle"
                        className="tw-col-start-2 tw-row-start-2 tw-border tw-border-dashed"
                        style={{ borderColor: 'red' }}
                    >
                        <img
                            className="tw-w-full tw-opacity-0"
                            src={asset.previewUrl}
                            data-test-id="example-asset-upload-image"
                        />
                    </div>
                    <GridElement position={GridElementPosition.BottomLeft} col="1" row="3" />
                    <GridElement position={GridElementPosition.Bottom} col="2" row="3" />
                    <GridElement position={GridElementPosition.BottomRight} col="3" row="3" />
                </div>
            )}
        </div>
    );
};
