/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, ReactElement } from 'react';
import { useBlockSettings, useColorPalettes } from '@frontify/app-bridge';
import { Badge, Button, ButtonStyle, IconArrowCircleDown, Text } from '@frontify/fondue';
import { Palette } from './Palette';
import type { ColorKitBlockProps, Settings } from './types';

export const ColorKitBlock: FC<ColorKitBlockProps> = ({ appBridge }): ReactElement => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const { colorPalettes, downloadColorKit } = useColorPalettes(appBridge, blockSettings.colorPalettes);
    const link = downloadColorKit(blockSettings.colorPalettes);
    const isDownloadDisabled = blockSettings.colorPalettes.length === 0;

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
                    download
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    data-test-id="download-button"
                    title="download color palettes"
                    style={{ pointerEvents: isDownloadDisabled ? 'none' : 'initial' }}
                >
                    <Button style={ButtonStyle.Secondary} icon={<IconArrowCircleDown />} disabled={isDownloadDisabled}>
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
