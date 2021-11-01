/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    StorybookBorderRadius,
    StorybookBorderStyle,
    StorybookStyle,
    StorybookHeight,
    StorybookPosition,
} from './types';

type StorybookBlockProps = {
    appBridge: AppBridgeNative;
};

type Settings = {
    style: StorybookStyle;
    url: string;
    height: boolean;
    heightChoice: StorybookHeight;
    heightValue: string;
    positioning: StorybookPosition;
    border: boolean;
    borderStyle: StorybookBorderStyle;
    borderWidth: string;
    borderColor: string;
    borderRadius: boolean;
    borderRadiusChoice: StorybookBorderRadius;
    borderRadiusValue: string;
};

const iframeStyles = (
    borderStyle: StorybookBorderStyle,
    borderWidth: string,
    borderColor: string,
    borderRadius: boolean,
    borderRadiusValue: string
) => {
    return {
        borderStyle: borderStyle,
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius ? borderRadiusValue : '',
    };
};

const borderRadiusClasses: Record<StorybookBorderRadius, string> = {
    [StorybookBorderRadius.None]: 'tw-rounded-none',
    [StorybookBorderRadius.Small]: 'tw-rounded',
    [StorybookBorderRadius.Medium]: 'tw-rounded-md',
    [StorybookBorderRadius.Large]: 'tw-rounded-lg',
};

const heights: Record<StorybookHeight, string> = {
    [StorybookHeight.Small]: '400px',
    [StorybookHeight.Medium]: '600px',
    [StorybookHeight.Large]: '800px',
};

const StorybookBlock: FC<StorybookBlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        style = StorybookStyle.Default,
        url = '',
        height = false,
        heightChoice = StorybookHeight.Medium,
        heightValue = '',
        positioning = StorybookPosition.Horizontal,
        border = false,
        borderStyle = StorybookBorderStyle.Solid,
        borderWidth = '1px',
        borderColor = '#CCCCCC',
        borderRadius = false,
        borderRadiusChoice = StorybookBorderRadius.None,
        borderRadiusValue = '',
    } = blockSettings;

    let iframeUrl = new URL(url);
    iframeUrl.searchParams.set('nav', 'false');
    if (style === StorybookStyle.WithoutAddons) {
        iframeUrl.searchParams.set('panel', 'false');
    } else if (positioning === StorybookPosition.Horizontal) {
        iframeUrl.searchParams.set('panel', 'right');
    } else {
        iframeUrl.searchParams.set('panel', 'bottom');
    }

    return (
        <div>
            <iframe
                className={`tw-w-full ${!borderRadius && borderRadiusClasses[borderRadiusChoice]}`}
                style={
                    border === true
                        ? iframeStyles(borderStyle, borderWidth, borderColor, borderRadius, borderRadiusValue)
                        : {}
                }
                height={height ? heightValue : heights[heightChoice]}
                src={iframeUrl.toString()}
                frameBorder="0"
            ></iframe>
        </div>
    );
};

export default StorybookBlock;
