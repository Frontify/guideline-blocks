/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';

import {
    BlockProps,
    RichTextEditor,
    THEME_PREFIX,
    getDefaultPluginsWithLinkChooser,
    hasRichTextValue,
    joinClassNames,
    radiusStyleMap,
    setAlpha,
} from '@frontify/guideline-blocks-settings';
import { CSSProperties, ReactElement, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';
import { CalloutIcon } from './components/CalloutIcon';
import { getTextColor } from './helpers/getTextColor';
import { ICON_ASSET_ID } from './settings';
import { Appearance, BlockSettings, Icon, Type, Width, alignmentMap, outerWidthMap, paddingMap } from './types';

const getAccentColor = (type: Type): string => {
    const style = getComputedStyle(document.body);
    switch (type) {
        case Type.Info:
            return style.getPropertyValue(`${THEME_PREFIX}accent-color-info-color`);
        case Type.Note:
            return style.getPropertyValue(`${THEME_PREFIX}accent-color-note-color`);
        case Type.Tip:
            return style.getPropertyValue(`${THEME_PREFIX}accent-color-tip-color`);
        case Type.Warning:
            return style.getPropertyValue(`${THEME_PREFIX}accent-color-warning-color`);
    }
};

const computeStyles = (type: Type, appearance: Appearance) => {
    const accentColor = getAccentColor(type);
    const bgColor = appearance === Appearance.Strong ? accentColor : setAlpha(0.1, accentColor);
    const txtColor = getTextColor(appearance, accentColor, bgColor);
    return { bgColor, txtColor };
};

export const CalloutBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [backgroundColor, setBackgroundColor] = useState<string>('');
    const [textColor, setTextColor] = useState<string>('');
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { type, appearance } = blockSettings;
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

    useEffect(() => {
        const updateStyles = () => {
            const { bgColor, txtColor } = computeStyles(type, appearance);
            setBackgroundColor(bgColor);
            setTextColor(txtColor);
        };

        const styleElement = document.getElementById('design-settings');
        if (!styleElement) {
            return;
        }

        const observer = new MutationObserver(() => {
            updateStyles();
        });

        observer.observe(styleElement, { childList: true });
        updateStyles();
        return () => {
            observer.disconnect();
        };
    }, [appearance, type]);

    const textDivClassNames = joinClassNames([
        'tw-flex tw-items-center',
        '[&>div>*:first-child]:tw-mt-0', // Remove margin top from first child in view mode
        '[&>div>*:first-child>span]:!tw-mt-0',
        '[&>div>div>*:first-child]:tw-mt-0', // Remove margin top from first child in edit mode
        '[&>div>div>*:first-child>span]:!tw-mt-0',
        '[&>div>*:last-child]:tw-mb-0', // Remove margin bottom from last child in view mode
        '[&>div>*:last-child>span]:!tw-mb-0',
        '[&>div>div>*:last-child]:tw-mb-0', // Remove margin bottom from last child in edit mode
        '[&>div>div>*:last-child>span]:!tw-mb-0',
        blockSettings.width === Width.FullWidth && alignmentMap[blockSettings.alignment],
        !blockSettings.hasCustomPadding && paddingMap[blockSettings.paddingChoice],
    ]);

    const customPaddingStyle = {
        padding: blockSettings.hasCustomPadding
            ? `${blockSettings.paddingTop} ${blockSettings.paddingRight} ${blockSettings.paddingBottom} ${blockSettings.paddingLeft}`
            : '',
    };

    const customCornerRadiusStyle = {
        borderRadius: blockSettings.hasExtendedCustomRadius
            ? `${blockSettings.extendedRadiusTopLeft} ${blockSettings.extendedRadiusTopRight} ${blockSettings.extendedRadiusBottomRight} ${blockSettings.extendedRadiusBottomLeft}`
            : radiusStyleMap[blockSettings.extendedRadiusChoice],
    };

    const iconUrl = blockSettings.iconSwitch ? blockAssets?.[ICON_ASSET_ID]?.[0]?.genericUrl : '';
    const showIcon = blockSettings.iconSwitch ? !!iconUrl : blockSettings.iconType !== Icon.None;

    const overwrittenThemeSettings = {
        [`${THEME_PREFIX}heading1-color`]: textColor,
        [`${THEME_PREFIX}heading2-color`]: textColor,
        [`${THEME_PREFIX}heading3-color`]: textColor,
        [`${THEME_PREFIX}heading4-color`]: textColor,
        [`${THEME_PREFIX}custom1-color`]: textColor,
        [`${THEME_PREFIX}custom2-color`]: textColor,
        [`${THEME_PREFIX}custom3-color`]: textColor,
        [`${THEME_PREFIX}body-color`]: textColor,
        [`${THEME_PREFIX}quote-color`]: textColor,
        [`${THEME_PREFIX}link-color`]: textColor,
        [`${THEME_PREFIX}link-text-decoration`]: 'underline',
        color: textColor,
    } as CSSProperties;

    return (
        <div className="callout-block">
            <div data-test-id="callout-block" style={overwrittenThemeSettings} className={containerDivClassNames}>
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
                        onTextChange={(textValue) => setBlockSettings({ textValue })}
                        placeholder="Type your text here"
                        value={blockSettings.textValue}
                        plugins={getDefaultPluginsWithLinkChooser(appBridge)}
                    />
                </div>
            </div>
        </div>
    );
};
