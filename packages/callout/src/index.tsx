/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { FC, useEffect, useState } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    Alignment,
    alignmentMap,
    BlockSettings, CornerRadius,
    cornerRadiusMap, Padding,
    paddingMap,
    Type,
    typeMap,
    Width,
    widthMap
} from "./types";
import { RichTextEditor } from '@frontify/arcade';

type CustomPaddingStyles = {
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
};

type CustomCornerRadius = {
    borderRadius: string;
};

type CalloutBlockProps = {
    appBridge: AppBridgeNative;
};

const CalloutBlock: FC<CalloutBlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState();
    const {
        type = Type.Warning,
        alignment = Alignment.Left,
        iconSwitch,
        width = Width.FullWidth,
        customPaddingSwitch,
        customCornerRadiusSwitch,
        icon,
        padding = Padding.M,
        customPadding = [],
        cornerRadius = CornerRadius.None,
        customCornerRadius = [],
        textValue,
    } = blockSettings;
    const [customPaddingStyle, setCustomPaddingStyle] = useState<CustomPaddingStyles>();
    const [customCornerRadiusStyle, setCustomCornerRadiusStyle] = useState<CustomCornerRadius>();
    const [iconUrl, setIconUrl] = useState<string>();
    const [iconAltText, setIconAltText] = useState<string>();
    console.log('callout');

    useEffect(() => {
        const paddingStyle = customPaddingSwitch
            ? {
                  paddingTop: customPadding[0],
                  paddingRight: customPadding[2],
                  paddingBottom: customPadding[3],
                  paddingLeft: customPadding[1],
              }
            : undefined;
        const cornerRadiusStyle = customCornerRadiusSwitch
            ? {
                  borderRadius: `${customCornerRadius[0]} ${customCornerRadius[1]} ${customCornerRadius[3]} ${customCornerRadius[2]}`,
              }
            : undefined;
        setCustomPaddingStyle(paddingStyle);
        setCustomCornerRadiusStyle(cornerRadiusStyle);

        if (iconSwitch && icon) {
            appBridge.getAssetById(icon).then((iconAsset) => {
                setIconUrl(iconAsset.generic_url);
                setIconAltText(`Callout Block Icon: ${iconAsset.title}`);
            });
        }
    }, [blockSettings]);

    const onTextChange = (value: string): void => {
        setBlockSettings({ textValue: value });
    };

    const getClassName = () => {
        let className = `tw-text-white ${typeMap[type]} ${alignmentMap[alignment]} ${widthMap[width]} `;

        if (!customPaddingSwitch && padding) {
            className += `${paddingMap[padding]} `;
        }

        if (!customCornerRadiusSwitch && cornerRadius) {
            className += `${cornerRadiusMap[cornerRadius]} `;
        }

        return className;
    };

    return (
        <div className={getClassName()} style={{ ...customPaddingStyle, ...customCornerRadiusStyle }}>
            {iconSwitch && iconUrl && (
                <span className="tw-pr-3">
                    <img alt={iconAltText} src={iconUrl} className="tw-inline tw-w-6 tw-h-6" />
                </span>
            )}
            <div className={'tw-w-full'}>
                <RichTextEditor
                    onTextChange={onTextChange}
                    readonly={!isEditing}
                    value={textValue}
                    placeholder={'Type your text here'}
                />
            </div>
        </div>
    );
};

export default CalloutBlock;
