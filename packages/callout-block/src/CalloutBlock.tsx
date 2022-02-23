/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor } from '@frontify/arcade';
import { joinClassNames, Radius, radiusStyleMap } from '@frontify/guideline-blocks-shared';
import { createRef, CSSProperties, FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import {
    Alignment,
    alignmentMap,
    BlockSettings,
    CalloutBlockProps,
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
    isCustomPadding: boolean,
    padding: Padding,
    isCustomRadius: boolean,
    cornerRadius: Radius
): string =>
    joinClassNames([
        `tw-flex tw-items-center tw-text-white ${typeMap[type]}`,
        width === Width.FullWidth && alignmentMap[alignment],
        !isCustomPadding && padding && paddingMap[padding],
        !isCustomRadius && cornerRadius && radiusStyleMap[cornerRadius],
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
        paddingChoice = Padding.M,
        extendedRadiusChoice = Radius.None,
        extendedRadiusTopLeft = '0px',
        extendedRadiusTopRight = '0px',
        extendedRadiusBottomLeft = '0px',
        extendedRadiusBottomRight = '0px',
        paddingTop = '0px',
        paddingBottom = '0px',
        paddingLeft = '0px',
        paddingRight = '0px',
        hasCustomPadding,
        hasExtendedCustomRadius,
        icon,
        textValue,
    } = blockSettings;

    const [customPaddingStyle, setCustomPaddingStyle] = useState<CustomPaddingStyles>();
    const [customCornerRadiusStyle, setCustomCornerRadiusStyle] = useState<CSSProperties>();
    const [iconUrl, setIconUrl] = useState<string>();
    const [iconAltText, setIconAltText] = useState<string>();
    const blockRef = createRef<HTMLDivElement>();

    useEffect(() => {
        if (hasCustomPadding) {
            setCustomPaddingStyle({
                paddingTop,
                paddingRight,
                paddingBottom,
                paddingLeft,
            });
        }

        if (hasExtendedCustomRadius) {
            setCustomCornerRadiusStyle({
                borderRadius: [
                    extendedRadiusTopLeft,
                    extendedRadiusTopRight,
                    extendedRadiusBottomRight,
                    extendedRadiusBottomLeft,
                ].join(' '),
            });
        }

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
                    hasCustomPadding,
                    paddingChoice,
                    hasExtendedCustomRadius,
                    extendedRadiusChoice
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
