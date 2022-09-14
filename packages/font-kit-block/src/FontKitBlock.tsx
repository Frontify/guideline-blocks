/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { FC, ReactElement } from 'react';
import { useBlockSettings } from '@frontify/app-bridge';
import { Badge, Button, ButtonStyle, IconArrowCircleDown, Text } from '@frontify/fondue';

import { Font } from './Font';
import { useFonts } from './useFonts';
import type { FontKitBlockProps, FontType, Settings } from './types';

const defaultFont = { id: null, name: 'Select fonts for them to appear here' };

export const FontKitBlock: FC<FontKitBlockProps> = ({ appBridge }): ReactElement => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const fonts = useFonts(appBridge);

    const link = 'DOWNLOAD FONTS LINK';

    const { withExampleText, withFontFileFormat, withFontStyles, exampleText } = blockSettings;

    return (
        <div
            data-test-id="font-kit-block"
            className="tw-p-8 tw-pt-7 tw-border tw-border-solid tw-border-line-strong tw-space-y-3"
        >
            <div className="tw-flex tw-justify-between">
                <div className="tw-flex tw-space-x-1 tw-h-fit tw-items-center">
                    <Text as="p" size="large" weight="x-strong">
                        Font Kit
                    </Text>
                    {withFontFileFormat && (
                        <>
                            <Badge size="s">OTF</Badge>
                            <Badge size="s">TTF</Badge>
                        </>
                    )}
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
            {fonts.length === 0 && <Font font={defaultFont as unknown as FontType} placeholder={exampleText} />}
            {fonts.map((font, index) => {
                return (
                    <Font
                        key={index}
                        font={font}
                        placeholder={exampleText}
                        withStyles={withFontStyles}
                        withExampleText={withExampleText}
                    />
                );
            })}
        </div>
    );
};
