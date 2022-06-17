/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/arcade-tokens/styles';
import { QueryBreakpoints, useContainerQueries } from '@frontify/guideline-blocks-shared';
import { FC, useEffect, useState } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import 'tailwindcss/tailwind.css';
import tailwindConfig from '../tailwind.config.js';

type TailwindBreakpoints = { sm: string; md: string; lg: string; xl: string; '2xl': string };

const getTailwindBreakpoints = (): QueryBreakpoints => {
    const fullConfig = resolveConfig(tailwindConfig);
    const { sm, md, lg, xl } = fullConfig.theme.screens as TailwindBreakpoints;
    const parsedSm = parseInt(sm);
    const parsedMd = parseInt(md);
    const parsedLg = parseInt(lg);
    const parsedXl = parseInt(xl);

    return {
        sm: [0, parsedSm],
        md: [parsedSm + 1, parsedMd],
        lg: [parsedMd + 1, parsedLg],
        xl: [parsedLg + 1, parsedXl],
        '2xl': [parsedXl + 1],
    };
};

type Font = {
    name: string;
};

export const FontsBlock: FC = () => {
    const { active, ref } = useContainerQueries({
        breakpoints: getTailwindBreakpoints(),
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
        <div ref={ref} data-test-id="fonts-block">
            {fonts && (
                <div className={`${active === 'md' ? 'tw-grid tw-grid-cols-2 tw-gap-8' : ''}`}>
                    {fonts.map((font) => {
                        return (
                            <div className="tw-mb-11">
                                <h3 className="tw-text-neutral-300">
                                    {font.name}{' '}
                                    <span className="tw-p-1 tw-bg-black-50 tw-rounded tw-text-white tw-uppercase tw-text-xxs">
                                        Web
                                    </span>
                                </h3>
                                <div className={`tw-grid tw-grid-cols-3 tw-gap-3`}>
                                    <div className={`${active === 'sm' ? 'tw-col-span-2' : 'tw-col-span-3'}`}>
                                        <div className={`tw-grid tw-grid-cols-12 tw-gap-3`}>
                                            <div className={`${active === 'md' ? 'tw-col-span-12' : 'tw-col-span-2'}`}>
                                                <span
                                                    style={{ fontFamily: font.name }}
                                                    className={`tw-text-7xl tw-mb-4`}
                                                >
                                                    Aa
                                                </span>
                                            </div>
                                            <div
                                                className={`${
                                                    active === 'sm' || active === 'md'
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
                                            {active !== 'sm' && <FontsInformation font={font} active={active} />}
                                        </div>
                                    </div>
                                    {active === 'sm' && <FontsInformation font={font} active={active} />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const FontsInformation: FC<{ font: Font; active: string }> = ({ font, active }) => {
    const getGrid = () => {
        if (active === 'sm') {
            return 'tw-col-span-1 tw-border-l tw-border-black-40 tw-pl-7';
        }
        if (active === 'md') {
            return 'tw-col-span-12';
        } else {
            return 'tw-col-span-4 tw-border-l tw-border-black-40 tw-pl-7 tw-ml-6';
        }
    };
    return (
        <div className={getGrid()}>
            <div className={`${active === 'md' ? 'tw-flex' : ''} `}>
                <div className="">{font.name}</div>
                <div className="font-weight">
                    <span className={`${active === 'md' ? 'tw-pl-3' : ''}  tw-text-black-60`}>Weight:</span>{' '}
                    <span>0</span>
                </div>
                <div>
                    <span className={`${active === 'md' ? 'tw-pl-3' : ''}  tw-text-black-60`}>Style:</span>{' '}
                    <span>normal</span>
                </div>
            </div>
            {active === 'md' && (
                <div className="tw-py-4">
                    <div className="tw-w-full tw-border-t"></div>
                </div>
            )}
        </div>
    );
};
