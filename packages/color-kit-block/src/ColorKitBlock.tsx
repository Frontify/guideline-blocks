/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useMemo } from 'react';
import { useBlockSettings, useColorPalettes, useEditorState } from '@frontify/app-bridge';
import { Badge, Button, ButtonEmphasis, IconArrowCircleDown, Text } from '@frontify/fondue';

import { EmptyView } from './EmptyView';
import { Palette } from './Palette';
import type { Settings } from './types';
import { BlockProps } from '@frontify/guideline-blocks-settings';

export const ColorKitBlock: FC<BlockProps> = ({ appBridge }) => {
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
        <div className="color-kit-block">
            <div data-test-id="color-kit-block" className="tw-p-8 tw-pt-7 tw-border tw-border-line tw-rounded">
                <div className="tw-flex tw-justify-between">
                    <div className="tw-flex tw-items-start">
                        <Text as="p" size="large" weight="x-strong">
                            Color Kit
                        </Text>

                        <div className="tw-space-x-1 tw-mt-0 tw-ml-3">
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
                        <Button
                            emphasis={ButtonEmphasis.Default}
                            icon={<IconArrowCircleDown />}
                            disabled={!isDownloadEnabled}
                        >
                            Download
                        </Button>
                    </a>
                </div>

                {colorPalettes.length > 0 ? (
                    colorPalettes.map((palette) => <Palette key={palette.id} palette={palette} isEditing={isEditing} />)
                ) : (
                    <EmptyView />
                )}
            </div>
        </div>
    );
};
