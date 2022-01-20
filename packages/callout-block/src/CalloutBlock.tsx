/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor } from '@frontify/arcade';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { createRef, CSSProperties, FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import {
    Alignment,
    alignmentMap,
    BlockSettings,
    CalloutBlockProps,
    CornerRadius,
    cornerRadiusMap,
    CustomPaddingStyles,
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
): string =>
    joinClassNames([
        `tw-flex tw-items-center tw-text-white ${typeMap[type]}`,
        width === Width.FullWidth && alignmentMap[alignment],
        !customPaddingSwitch && padding && paddingMap[padding],
        !customCornerRadiusSwitch && cornerRadius && cornerRadiusMap[cornerRadius],
    ]);

const getOuterDivClassName = (width: Width, alignment: Alignment): string =>
    joinClassNames([outerWidthMap[width], width === Width.HugContents && alignmentMap[alignment]]);

export const CalloutBlock: FC<CalloutBlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState(appBridge);
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
            appBridge.getAssetById(icon.value).then((iconAsset) => {
                setIconUrl(iconAsset.generic_url);
                setIconAltText(`Callout Block Icon: ${iconAsset.title}`);
            });
        }
    }, [blockSettings]);

    const onTextChange = (value: string): Promise<void> => setBlockSettings({ textValue: value });

    return (
        <div data-test-id="callout-block" className={getOuterDivClassName(width, alignment)}>
            <div
                data-test-id="callout-wrapper"
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
                    <span className="tw-mr-3 tw-flex-none tw-w-6 tw-h-6">
                        <img data-test-id="callout-icon" alt={iconAltText} src={iconUrl} />
                    </span>
                )}
                <RichTextEditor
                    onTextChange={onTextChange}
                    readonly={!isEditing}
                    value={textValue}
                    placeholder="Type your text here"
                />
            </div>
        </div>
    );
};
