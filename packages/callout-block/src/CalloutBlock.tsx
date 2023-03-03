/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor, parseRawValue, serializeRawToHtml } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    hasRichTextValue,
    isDark,
    joinClassNames,
    radiusStyleMap,
    setAlpha,
    useGuidelineDesignTokens,
} from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { CalloutIcon } from './components/CalloutIcon';
import { ICON_ASSET_ID } from './settings';
import { Appearance, BlockSettings, Icon, Type, Width, alignmentMap, outerWidthMap, paddingMap } from './types';
import { useCalloutColors } from './utils/useCalloutColors';

export const CalloutBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const { designTokens } = useGuidelineDesignTokens();

    const containerDivClassNames = joinClassNames([
        outerWidthMap[blockSettings.width],
        blockSettings.width === Width.HugContents && alignmentMap[blockSettings.alignment],
    ]);

    const getAccentColor = (type: Type) => {
        switch (type) {
            case Type.Info:
                return designTokens?.callout?.info;
            case Type.Note:
                return designTokens?.callout?.note;
            case Type.Tip:
                return designTokens?.callout?.tip;
            case Type.Warning:
                return designTokens?.callout?.warning;
        }
    };

    const customPaddingStyle = {
        padding: blockSettings.hasCustomPadding
            ? `${blockSettings.paddingTop} ${blockSettings.paddingRight} ${blockSettings.paddingBottom} ${blockSettings.paddingLeft}`
            : '',
    };

    const color = getAccentColor(blockSettings.type);
    const backgroundColor = blockSettings.appearance === Appearance.Strong ? color : setAlpha(0.1, color);

    const defaultTextColor = isDark(color) ? 'white' : 'black';
    const textColor = blockSettings.appearance === Appearance.Light ? color : defaultTextColor;
    const calloutDesignTokens = useCalloutColors(designTokens, textColor);

    const textDivClassNames = joinClassNames([
        'tw-flex tw-items-center',
        blockSettings.width === Width.FullWidth && alignmentMap[blockSettings.alignment],
        !blockSettings.hasCustomPadding && paddingMap[blockSettings.paddingChoice],
    ]);

    const customCornerRadiusStyle = {
        borderRadius: blockSettings.hasExtendedCustomRadius
            ? `${blockSettings.extendedRadiusTopLeft} ${blockSettings.extendedRadiusTopRight} ${blockSettings.extendedRadiusBottomRight} ${blockSettings.extendedRadiusBottomLeft}`
            : radiusStyleMap[blockSettings.extendedRadiusChoice],
    };

    const iconUrl = blockSettings.iconSwitch ? blockAssets?.[ICON_ASSET_ID]?.[0]?.genericUrl : '';

    const onTextChange = (value: string) => value !== blockSettings.textValue && setBlockSettings({ textValue: value });
    const rawValue = JSON.stringify(parseRawValue({ raw: blockSettings.textValue ?? '' }));
    const html = serializeRawToHtml(rawValue, calloutDesignTokens);

    return (
        <div data-test-id="callout-block" className={containerDivClassNames}>
            <div
                data-test-id="callout-wrapper"
                className={textDivClassNames}
                style={{
                    backgroundColor,
                    ...customPaddingStyle,
                    ...customCornerRadiusStyle,
                }}
            >
                {blockSettings.iconType === Icon.None || (blockSettings.iconSwitch && !iconUrl) ? null : (
                    <CalloutIcon
                        iconUrl={iconUrl}
                        isActive={hasRichTextValue(blockSettings.textValue)}
                        iconType={blockSettings.iconSwitch ? Icon.Custom : blockSettings.iconType}
                        color={textColor}
                    />
                )}
                {!isEditing ? (
                    <div data-test-id="rte-content-html" dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                    <RichTextEditor
                        id={appBridge.getBlockId().toString()}
                        designTokens={calloutDesignTokens}
                        value={blockSettings.textValue}
                        border={false}
                        placeholder="Type your text here"
                        onTextChange={onTextChange}
                        onBlur={onTextChange}
                    />
                )}
            </div>
        </div>
    );
};
