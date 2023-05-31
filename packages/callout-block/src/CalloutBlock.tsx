/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    RichTextEditor,
    THEME_PREFIX,
    hasRichTextValue,
    isDark,
    joinClassNames,
    radiusStyleMap,
    setAlpha,
} from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { CalloutIcon } from './components/CalloutIcon';
import { getRtePlugins } from './helpers/RtePlugins';
import { ICON_ASSET_ID } from './settings';
import { Appearance, BlockSettings, Icon, Type, Width, alignmentMap, outerWidthMap, paddingMap } from './types';

export const CalloutBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);

    if (blockSettings.appearance !== Appearance.Strong && blockSettings.appearance !== Appearance.Light) {
        // workaround as the appearance could be hubAppearance
        setBlockSettings({ appearance: Appearance.Light });
    }

    const containerDivClassNames = joinClassNames([
        outerWidthMap[blockSettings.width],
        blockSettings.width === Width.HugContents && alignmentMap[blockSettings.alignment],
    ]);

    const getAccentColor = (type: Type) => {
        const style = getComputedStyle(document.head);
        switch (type) {
            case Type.Info:
                return style.getPropertyValue(`${THEME_PREFIX}accent-color-info-color`);
            case Type.Note:
                return style.getPropertyValue(`${THEME_PREFIX}accent-color-note-color`);
            case Type.Tip:
                return style.getPropertyValue(`${THEME_PREFIX}accent-color-tip-color`);
            case Type.Warning:
                return style.getPropertyValue(`${THEME_PREFIX}accent-color-warning-color`);
            default:
                return style.getPropertyValue(`${THEME_PREFIX}accent-color-info-color`);
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
    const showIcon = blockSettings.iconSwitch ? !!iconUrl : blockSettings.iconType !== Icon.None;

    const onTextChange = (value: string) => value !== blockSettings.textValue && setBlockSettings({ textValue: value });

    console.log(color);

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
                {showIcon && (
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
                    plugins={getRtePlugins(textColor, appBridge)}
                />
            </div>
        </div>
    );
};
