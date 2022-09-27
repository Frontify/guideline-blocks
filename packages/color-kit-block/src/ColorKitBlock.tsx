/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useMemo } from 'react';
import { useBlockSettings, useColorPalettes, useEditorState } from '@frontify/app-bridge';
import { Badge, Button, ButtonStyle, IconArrowCircleDown, Text } from '@frontify/fondue';

import { Palette } from './Palette';
import type { ColorKitBlockProps, Settings } from './types';

export const ColorKitBlock = ({ appBridge }: ColorKitBlockProps): ReactElement => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const memoizedColorPaletteIds = useMemo(
        () => (blockSettings.colorPaletteIds ?? []).map((id) => Number(id)),
        [blockSettings.colorPaletteIds]
    );

    const { colorPalettes, downloadColorKit } = useColorPalettes(appBridge, memoizedColorPaletteIds);
    const link = downloadColorKit(memoizedColorPaletteIds);
    const isDownloadEnabled = memoizedColorPaletteIds?.length > 0;

    return (
        <div data-test-id="color-kit-block" className="tw-space-y-3 tw-p-8 tw-pt-7 tw-border tw-border-line tw-rounded">
            <div className="tw-flex tw-justify-between">
                <div className="tw-flex tw-items-center">
                    <Text as="p" size="large" weight="x-strong">
                        Color Kit
                    </Text>

                    <div className="tw-space-x-1 tw-ml-3">
                        <Badge size="small">ASE</Badge>
                        <Badge size="small">LESS</Badge>
                        <Badge size="small">OCO</Badge>
                        <Badge size="small">SCSS</Badge>
                    </div>
                </div>

                <a
                    download
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    data-test-id="download-button"
                    title="download color palettes"
                    style={{ pointerEvents: isDownloadEnabled ? 'initial' : 'none' }}
                >
                    <Button style={ButtonStyle.Secondary} icon={<IconArrowCircleDown />} disabled={!isDownloadEnabled}>
                        Download
                    </Button>
                </a>
            </div>

            {colorPalettes.map((palette) => {
                return <Palette key={palette.id} palette={palette} isEditing={isEditing} />;
            })}
        </div>
    );
};
