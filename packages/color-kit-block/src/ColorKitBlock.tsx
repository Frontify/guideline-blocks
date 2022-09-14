/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { FC, ReactElement } from 'react';
import { useBlockSettings, useColorPalettes } from '@frontify/app-bridge';
import { Badge, Button, ButtonStyle, IconArrowCircleDown, Text } from '@frontify/fondue';

import { Palette } from './Palette';
import type { ColorKitBlockProps, Settings } from './types';

export const ColorKitBlock: FC<ColorKitBlockProps> = ({ appBridge }): ReactElement => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const { colorPalettes, getDownloadColorKitLink } = useColorPalettes(appBridge, blockSettings.colorPalettes);
    const link = getDownloadColorKitLink(blockSettings.colorPalettes);

    return (
        <div
            data-test-id="color-kit-block"
            className="tw-p-8 tw-pt-7 tw-border tw-border-solid tw-border-line-strong tw-space-y-3"
        >
            <div className="tw-flex tw-justify-between">
                <div className="tw-flex tw-space-x-1 tw-h-fit tw-items-center">
                    <Text as="p" size="large" weight="x-strong">
                        Color Kit
                    </Text>
                    <Badge>ASE</Badge>
                    <Badge>LESS</Badge>
                    <Badge>OCO</Badge>
                    <Badge>SCSS</Badge>
                </div>
                <a
                    data-test-id="download-button"
                    download
                    target="_blank"
                    rel="noreferrer"
                    title="download color palettes"
                    href={link}
                >
                    <Button style={ButtonStyle.Secondary} icon={<IconArrowCircleDown />}>
                        Download
                    </Button>
                </a>
            </div>
            {colorPalettes.map((palette) => {
                return <Palette key={palette.id} palette={palette} />;
            })}
        </div>
    );
};
