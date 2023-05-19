/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    RichTextEditor,
    getDefaultPluginsWithLinkChooser,
    hasRichTextValue,
    isDark,
    joinClassNames,
    radiusStyleMap,
    setAlpha,
} from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { CalloutIcon } from './components/CalloutIcon';
import { ICON_ASSET_ID } from './settings';
import { Appearance, BlockSettings, Icon, Type, Width, alignmentMap, outerWidthMap, paddingMap } from './types';

export const CalloutBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);

    const containerDivClassNames = joinClassNames([
        outerWidthMap[blockSettings.width],
        blockSettings.width === Width.HugContents && alignmentMap[blockSettings.alignment],
    ]);

    const getAccentColor = (type: Type) => {
        const style = getComputedStyle(document.body);
        switch (type) {
            case Type.Info:
                return style.getPropertyValue('--f-theme-settings-accent-color-info-color');
            case Type.Note:
                return style.getPropertyValue('--f-theme-settings-accent-color-note-color');
            case Type.Tip:
                return style.getPropertyValue('--f-theme-settings-accent-color-tip-color');
            case Type.Warning:
                return style.getPropertyValue('--f-theme-settings-accent-color-warning-color');
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

    return (
        <div data-test-id="callout-block" className={containerDivClassNames}>
            <style>{`
                :root { 
                    --f-theme-settings-heading1-color: ${textColor};
                    --f-theme-settings-heading2-color: ${textColor};
                    --f-theme-settings-heading3-color: ${textColor};
                    --f-theme-settings-heading4-color: ${textColor};
                    --f-theme-settings-custom1-color: ${textColor};
                    --f-theme-settings-custom2-color: ${textColor};
                    --f-theme-settings-custom3-color: ${textColor};
                    --f-theme-settings-body-color: ${textColor};
                    --f-theme-settings-quote-color: ${textColor};
                    --f-theme-settings-link-color: ${textColor};
                    --f-theme-settings-link-text-decoration: underline;
                }
            `}</style>
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
                <RichTextEditor
                    id={appBridge.getBlockId().toString()}
                    isEditing={isEditing}
                    onBlur={onTextChange}
                    placeholder="Type your text here"
                    value={blockSettings.textValue}
                    plugins={getDefaultPluginsWithLinkChooser(appBridge)}
                />
            </div>
        </div>
    );
};
