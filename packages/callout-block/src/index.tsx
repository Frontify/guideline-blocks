/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/arcade/style';
import 'tailwindcss/tailwind.css';
import { createRef, CSSProperties, FC, useEffect, useState } from 'react';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { RichTextEditor } from '@frontify/arcade';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    Alignment,
    alignmentMap,
    BlockSettings,
    CalloutBlockProps,
    CornerRadius,
    cornerRadiusMap,
    CustomPaddingStyles,
    innerWidthMap,
    outerWidthMap,
    Padding,
    paddingMap,
    Type,
    typeMap,
    Width,
} from './types';

const getInnerDivClassName = (
    type: Type,
    width: Width,
    alignment: Alignment,
    customPaddingSwitch: boolean,
    padding: Padding,
    customCornerRadiusSwitch: boolean,
    cornerRadius: CornerRadius
): string => {
    return joinClassNames([
        `tw-text-white ${typeMap[type]} ${innerWidthMap[width]}`,
        width === Width.FullWidth && alignmentMap[alignment],
        !customPaddingSwitch && padding && paddingMap[padding],
        !customCornerRadiusSwitch && cornerRadius && cornerRadiusMap[cornerRadius],
    ]);
};

const getOuterDivClassName = (width: Width, alignment: Alignment): string => {
    return joinClassNames([outerWidthMap[width], width === Width.HugContents && alignmentMap[alignment]]);
};

const CalloutBlock: FC<CalloutBlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState();
    const {
        type = Type.Warning,
        alignment = Alignment.Left,
        iconSwitch = true,
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
    const [placeholderVisible, setPlaceholderVisible] = useState<boolean>(true);
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
                  borderRadius: `
                    ${customCornerRadius[0] ?? 0}
                    ${customCornerRadius[1] ?? 0}
                    ${customCornerRadius[3] ?? 0}
                    ${customCornerRadius[2] ?? 0}
                  `,
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

    return (
        <div className={getOuterDivClassName(width, alignment)}>
            <div
                className={getInnerDivClassName(
                    type,
                    width,
                    alignment,
                    customPaddingSwitch,
                    padding,
                    customCornerRadiusSwitch,
                    cornerRadius
                )}
                style={{ ...customPaddingStyle, ...customCornerRadiusStyle }}
                ref={blockRef}
            >
                {iconSwitch && iconUrl && (
                    <span className="tw-pr-3">
                        <img alt={iconAltText} src={iconUrl} className="tw-inline tw-w-6 tw-h-6" />
                    </span>
                )}
                {/* TODO replace hardcoded min-width with a solution integrated in RTE */}
                <div className={joinClassNames(['tw-inline-block', placeholderVisible && 'tw-min-w-[140px]'])}>
                    <RichTextEditor
                        onTextChange={onTextChange}
                        readonly={!isEditing}
                        value={textValue}
                        placeholder="Type your text here"
                    />
                </div>
            </div>
        </div>
    );
};

export default CalloutBlock;
