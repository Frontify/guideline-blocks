/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { StorybookBorderRadius, StorybookBorderStyle, StorybookStyle } from './types';

type StorybookBlockProps = {
    appBridge: AppBridgeNative;
};

type Settings = {
    style: StorybookStyle;
    url: string;
    border: boolean;
    borderStyle: StorybookBorderStyle;
    borderWidth: string;
    borderColor: string;
    borderRadiusChoice: StorybookBorderRadius;
};

const iframeStyles = {
    border: '1px solid black',
};

const StorybookBlock: FC<StorybookBlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    console.log(blockSettings);

    const {
        style = StorybookStyle.Default,
        url = '',
        border = false,
        borderStyle = StorybookBorderStyle.Solid,
        borderWidth = '1px',
        borderColor = '#CCCCCC',
        borderRadiusChoice = StorybookBorderRadius.None,
    } = blockSettings;

    let iframeUrl = new URL(url);
    iframeUrl.searchParams.set('nav', 'false');
    iframeUrl.searchParams.set('theme', 'dark');

    if (style === StorybookStyle.WithoutAddons) {
        iframeUrl.searchParams.set('full', 'true');
    }

    var iFrameUrlString = iframeUrl.toString();

    const iframeStyles = (
        borderStyle: StorybookBorderStyle,
        borderWidth: string,
        borderColor: string,
        borderRadiusChoice: StorybookBorderRadius
    ) => {
        return {
            borderStyle: borderStyle,
            borderWidth: borderWidth,
            borderColor: borderColor,
        };
    };

    // https://arcade-components.frontify.com/?full=0&stories=0&nav=0&addons=1&panelRight=1&path=%2Fstory%2Fcomponents-color-picker--flyout

    return (
        <div>
            <iframe
                style={border === true ? iframeStyles(borderStyle, borderWidth, borderColor, borderRadiusChoice) : {}}
                width="100%"
                height="800"
                src={iFrameUrlString}
                frameBorder="0"
            ></iframe>
        </div>
    );
};

export default StorybookBlock;
