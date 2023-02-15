import { CLEAR_SPACE_PERCENT_SIZE, CONTAINER_SIZE } from '../constants';
import { LogoGridProps, Property } from '../types';

import { useRef } from 'react';

export const LogoGrid = ({ asset, containerWidth, settings, showLogo }: LogoGridProps) => {
    const logoContainerRef = useRef<HTMLDivElement>(null);
    const {
        clearSpaceBottom,
        clearSpaceChoice,
        clearSpaceLeft,
        clearSpacePropertyChoice,
        clearSpaceRight,
        clearSpaceTop,
        containerSizeChoice,
        hasCustomClearSpace,
        // hasCustomOffset,
        // offsetBottom,
        // offsetLeft,
        // offsetRight,
        // offsetTop,
    } = settings;

    const getClearSpace = (custom: string) => {
        if (hasCustomClearSpace) {
            return custom;
        }

        if (clearSpaceChoice === 'none' || !logoContainerRef.current) {
            return 0;
        }

        const size =
            clearSpacePropertyChoice === Property.Height
                ? logoContainerRef.current.offsetHeight
                : logoContainerRef.current.offsetWidth;

        const percent = CLEAR_SPACE_PERCENT_SIZE[clearSpaceChoice];

        return `${(size * percent) / 100}px`;
    };

    const width = `${(containerWidth * CONTAINER_SIZE[containerSizeChoice]) / 100}px`;

    return (
        <div
            className={`tw-w-full tw-flex tw-justify-center ${
                showLogo ? 'tw-relative tw-z-10' : 'tw-absolute tw-z-20'
            }`}
        >
            <div
                className={`tw-grid-cols-3 tw-grid-rows-3 tw-grid tw-border ${
                    showLogo ? 'tw-border-transparent' : 'tw-border-dashed'
                }`}
                ref={logoContainerRef}
                style={{
                    gridTemplateColumns: `${getClearSpace(clearSpaceLeft)} auto ${getClearSpace(clearSpaceRight)}`,
                    gridTemplateRows: `${getClearSpace(clearSpaceTop)} auto ${getClearSpace(clearSpaceBottom)}`,
                    width,
                }}
            >
                <span
                    id="top"
                    className={`tw-col-start-2 tw-row-start-1 tw-border-l tw-border-r ${
                        showLogo ? 'tw-border-transparent' : 'tw-border-dashed'
                    }`}
                ></span>
                <span
                    id="right"
                    className={`tw-col-start-3 tw-row-start-2 tw-border-t tw-border-b ${
                        showLogo ? 'tw-border-transparent' : 'tw-border-dashed'
                    }`}
                ></span>
                <span
                    id="left"
                    className={`tw-col-start-1 tw-row-start-2 tw-border-t tw-border-b ${
                        showLogo ? 'tw-border-transparent' : 'tw-border-dashed'
                    }`}
                ></span>
                <span
                    id="bottom"
                    className={`tw-col-start-2 tw-row-start-3 tw-border-l tw-border-r ${
                        showLogo ? 'tw-border-transparent' : 'tw-border-dashed'
                    }`}
                ></span>
                <div
                    id="middle"
                    className={`tw-col-start-2 tw-row-start-2 tw-border ${
                        showLogo || clearSpaceChoice === 'none' ? 'tw-border-transparent' : 'tw-border-dashed'
                    }`}
                >
                    <img
                        className={showLogo ? 'tw-opacity-1' : 'tw-opacity-0'}
                        src={asset.previewUrl}
                        data-test-id="example-asset-upload-image"
                    />
                </div>
            </div>
        </div>
    );
};
