/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { FC, ReactElement } from 'react';
import {
    Badge,
    Button,
    ButtonStyle,
    IconArrowCircleDown,
    Stack,
    Text,
    Tooltip,
    TooltipPosition,
    useCopy,
} from '@frontify/fondue';
import { useBlockSettings } from '@frontify/app-bridge';

import { useColorPalettes } from './useColorPalettes';
import { ColorKitBlockProps, Settings } from './types';
import { TooltipContent } from './TooltipContent';

type PaletteProps = {
    title: string;
    colors: string[];
};

const Palette = ({ title, colors }: PaletteProps) => {
    const { copy } = useCopy();

    const handleCopy = (color: string) => copy(color);

    return (
        <div className="tw-flex tw-flex-col tw-space-y-2">
            <Text color="x-weak">{title}</Text>
            <Stack padding="none" spacing="none">
                {colors.map((color, index) => {
                    return (
                        <Tooltip
                            key={color}
                            withArrow
                            position={TooltipPosition.Right}
                            hoverDelay={0}
                            content={<TooltipContent color={color} status={'STATUS'} />}
                            triggerElement={
                                <div
                                    onClick={() => handleCopy(color)}
                                    className="tw-w-6 tw-h-6 tw-inline-block"
                                    key={index}
                                    style={{ backgroundColor: color }}
                                />
                            }
                        />
                    );
                })}
            </Stack>
        </div>
    );
};

export const ColorKitBlock: FC<ColorKitBlockProps> = ({ appBridge }): ReactElement => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const palettes = useColorPalettes(blockSettings.colorPalettes);

    const handleDownload = () => {
        alert('downloading');
    };

    return (
        <div className="tw-p-8 tw-pt-7 tw-border tw-border-solid tw-border-line-strong tw-space-y-3">
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
                <Button icon={<IconArrowCircleDown />} onClick={handleDownload} style={ButtonStyle.Secondary}>
                    Download
                </Button>
            </div>
            {palettes.map((palette, index) => {
                return <Palette key={index} title={palette.name} colors={palette.colors} />;
            })}
        </div>
    );
};
