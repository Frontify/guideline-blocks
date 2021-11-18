/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { createRef, CSSProperties, FC, useEffect, useState } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    Alignment,
    alignmentMap,
    BlockSettings,
    CornerRadius,
    cornerRadiusMap,
    Padding,
    paddingMap,
    Type,
    typeMap,
    Width,
    widthMap,
} from './types';
import { RichTextEditor } from '@frontify/arcade';

type CustomPaddingStyles = {
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
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
    const [customCornerRadiusStyle, setCustomCornerRadiusStyle] = useState<CSSProperties>();
    const [iconUrl, setIconUrl] = useState<string>();
    const [iconAltText, setIconAltText] = useState<string>();
    const [placeholderVisible, setPlaceholderVisible] = useState<boolean>();
    const blockRef = createRef<HTMLDivElement>();

    useEffect(() => {
        const paddingStyle = customPaddingSwitch
            ? {
                  paddingTop: customPadding[0] ?? 0,
                  paddingRight: customPadding[2] ?? 0,
                  paddingBottom: customPadding[3] ?? 0,
                  paddingLeft: customPadding[1] ?? 0,
              }
            : undefined;
        const cornerRadiusStyle = customCornerRadiusSwitch
            ? {
                  borderRadius: `${customCornerRadius[0] ?? 0} ${customCornerRadius[1] ?? 0} ${
                      customCornerRadius[3] ?? 0
                  } ${customCornerRadius[2] ?? 0}`,
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

        setPlaceholderVisible(blockRef.current?.querySelector('[data-slate-placeholder="true"]') !== null);
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
        <div className={getClassName()} style={{ ...customPaddingStyle, ...customCornerRadiusStyle }} ref={blockRef}>
            {iconSwitch && iconUrl && (
                <span className="tw-pr-3">
                    <img alt={iconAltText} src={iconUrl} className="tw-inline tw-w-6 tw-h-6" />
                </span>
            )}
            <div style={placeholderVisible ? { minWidth: '130px' } : undefined}>
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
