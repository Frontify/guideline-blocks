/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/arcade-tokens/styles';
import { useContainerQueries } from '@frontify/guideline-blocks-shared';
import { FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import tailwindConfig from '../tailwind.config.js';

type Font = {
    name: string;
};

export const FontsBlock: FC = () => {
    const { activeBreakpoint, containerRef } = useContainerQueries({
        tailwindConfig,
    });

    const [fonts, setFonts] = useState<[Font] | null>(null);

    const url = `${window.location.origin}/api/font-family`;

    useEffect(() => {
        (async () => {
            const response = await window.fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const json = await response.json();
            const arialFonts = json.data.filter((f: Font) => f.name && f.name.includes('Arial'));
            setFonts(arialFonts);
        })();
    }, []);

    return (
        <div ref={containerRef} data-test-id="fonts-block">
            {fonts && (
                <div className={`${activeBreakpoint === 'md' ? 'tw-grid tw-grid-cols-2 tw-gap-8' : ''}`}>
                    {fonts.map((font) => {
                        return (
                            <div className="tw-mb-11">
                                <h3 className="tw-text-neutral-300">
                                    {font.name}
                                    <span
                                        className="tw-p-1 tw-mx-3 tw-bg-black-10 tw-rounded-lg tw-text-black-80 tw-text-xxs"
                                        style={{ position: 'relative', bottom: '2px' }}
                                    >
                                        Web
                                    </span>
                                </h3>
                                <div className={`tw-grid tw-grid-cols-3 tw-gap-3`}>
                                    <div className={`${activeBreakpoint === 'sm' ? 'tw-col-span-2' : 'tw-col-span-3'}`}>
                                        <div className={`tw-grid tw-grid-cols-12 tw-gap-3`}>
                                            <div
                                                className={`${
                                                    activeBreakpoint === 'md' ? 'tw-col-span-12' : 'tw-col-span-2'
                                                }`}
                                            >
                                                <span
                                                    style={{ fontFamily: font.name }}
                                                    className={`tw-text-7xl tw-mb-4`}
                                                >
                                                    Aa
                                                </span>
                                            </div>
                                            <div
                                                className={`${
                                                    activeBreakpoint === 'sm' || activeBreakpoint === 'md'
                                                        ? 'tw-col-span-12'
                                                        : 'tw-col-span-6'
                                                } tw-mb-4 tw-text-l tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap`}
                                            >
                                                <span style={{ fontFamily: font.name }}>
                                                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                                                    <br />
                                                    abcdefghijklmnopqrstuvwxyz
                                                    <br />
                                                    1234567890(,.;:?!$&amp;*)
                                                </span>
                                            </div>
                                            {activeBreakpoint !== 'sm' && (
                                                <FontsInformation font={font} activeBreakpoint={activeBreakpoint} />
                                            )}
                                        </div>
                                    </div>
                                    {activeBreakpoint === 'sm' && (
                                        <FontsInformation font={font} activeBreakpoint={activeBreakpoint} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const FontsInformation: FC<{ font: Font; activeBreakpoint: string }> = ({ font, activeBreakpoint }) => {
    const getGrid = () => {
        if (activeBreakpoint === 'sm') {
            return 'tw-col-span-1 tw-border-l tw-pl-7';
        }
        if (activeBreakpoint === 'md') {
            return 'tw-col-span-12 tw-border-none';
        } else {
            return 'tw-col-span-4 tw-border-l tw-pl-7 tw-ml-6';
        }
    };
    return (
        <div className={getGrid()} style={{ borderColor: 'rgba(8, 8, 8, 0.1)', borderLeftWidth: '2px' }}>
            <div className={`${activeBreakpoint === 'md' ? 'tw-flex' : ''} `}>
                <div className="">{font.name}</div>
                <div className="font-weight">
                    <span className={`${activeBreakpoint === 'md' ? 'tw-pl-3' : ''}  tw-text-black-60`}>Weight:</span>{' '}
                    <span>0</span>
                </div>
                <div>
                    <span className={`${activeBreakpoint === 'md' ? 'tw-pl-3' : ''}  tw-text-black-60`}>Style:</span>{' '}
                    <span>normal</span>
                </div>
            </div>
            {activeBreakpoint === 'md' && (
                <div className="tw-py-4">
                    <div className="tw-w-full tw-border-t" style={{ borderColor: 'rgba(8, 8, 8, 0.1)' }}></div>
                </div>
            )}
        </div>
    );
};
