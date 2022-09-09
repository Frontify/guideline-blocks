/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { FC, ReactElement } from 'react';
import { useBlockSettings } from '@frontify/app-bridge';
import { Badge, Button, ButtonStyle, IconArrowCircleDown, Text } from '@frontify/fondue';

import { Palette } from './Palette';
import { useColorPalettes } from './useColorPalettes';
import type { ColorKitBlockProps, Settings } from './types';

export const ColorKitBlock: FC<ColorKitBlockProps> = ({ appBridge }): ReactElement => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const palettes = useColorPalettes(blockSettings.colorPalettes);

    const handleDownload = () => {
        alert('downloading');
    };

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
                <Button
                    onClick={handleDownload}
                    data-test-id="download-button"
                    style={ButtonStyle.Secondary}
                    icon={<IconArrowCircleDown />}
                >
                    Download
                </Button>
            </div>
            {palettes.map((palette) => {
                return <Palette key={palette.id} palette={palette} />;
            })}
        </div>
    );
};
