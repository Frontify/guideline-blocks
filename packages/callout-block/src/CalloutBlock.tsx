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
} from '@frontify/guideline-blocks-settings';
import { CSSProperties, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { CalloutIcon } from './components/CalloutIcon';
import { computeStyles } from './helpers/color';
import { Appearance, BlockSettings, Icon, Width, alignmentMap, outerWidthMap, paddingMap } from './types';

import '@frontify/fondue/style';
import '@frontify/guideline-blocks-settings/styles';
import 'tailwindcss/tailwind.css';
import { ICON_ASSET_ID } from './settings';

export const CalloutBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [backgroundColor, setBackgroundColor] = useState<string>('');
    const [textColor, setTextColor] = useState<string>('');
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { type, appearance } = blockSettings;
    const isEditing = useEditorState(appBridge);

    const { blockAssets, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const customIcon = blockAssets?.[ICON_ASSET_ID]?.[0];

    useEffect(() => {
        if (!blockSettings.iconSwitch && customIcon) {
            deleteAssetIdsFromKey(ICON_ASSET_ID, [customIcon.id]);
        }
    }, [blockSettings.iconSwitch, customIcon, deleteAssetIdsFromKey]);

    useEffect(() => {
        const updateStyles = () => {
            const { backgroundColor, textColor } = computeStyles(type, appearance);
            setBackgroundColor(backgroundColor);
            setTextColor(textColor);
        };

        window.emitter.on('HubAppearanceUpdated', updateStyles);

        updateStyles();

        return () => {
            window.emitter.off('HubAppearanceUpdated', updateStyles);
        };
    }, [appearance, type]);

    const handleTextChange = useCallback((textValue: string) => setBlockSettings({ textValue }), [setBlockSettings]);

    const plugins = useMemo(() => getDefaultPluginsWithLinkChooser(appBridge), [appBridge]);

    if (appearance !== Appearance.Strong && appearance !== Appearance.Light) {
        // workaround as the appearance could be hubAppearance
        setBlockSettings({ appearance: Appearance.Light });
    }

    const containerDivClassNames = joinClassNames([
        outerWidthMap[blockSettings.width],
        blockSettings.width === Width.HugContents && alignmentMap[blockSettings.alignment],
        !blockSettings.hasCustomPadding && paddingMap[blockSettings.paddingChoice],
    ]);

    const textDivClassNames = joinClassNames([
        'tw-flex tw-items-center tw-min-h-5',
        '[&>div>*:first-child]:tw-mt-0', // Remove margin top from first child in view mode
        '[&>div>*:first-child>span]:!tw-mt-0',
        '[&>div>div>*:first-child]:tw-mt-0', // Remove margin top from first child in edit mode
        '[&>div>div>*:first-child>span]:!tw-mt-0',
        '[&>div>*:last-child]:tw-mb-0', // Remove margin bottom from last child in view mode
        '[&>div>*:last-child>span]:!tw-mb-0',
        '[&>div>div>*:last-child]:tw-mb-0', // Remove margin bottom from last child in edit mode
        '[&>div>div>*:last-child>span]:!tw-mb-0',
        blockSettings.width === Width.HugContents && '[&>div]:!tw-@container-normal',
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

    const iconType = blockSettings.iconSwitch ? Icon.Custom : blockSettings.iconType;

    return (
        <div className="callout-block">
            <div
                data-test-id="callout-block"
                style={{
                    ...overwrittenThemeSettings,
                    backgroundColor,
                    ...customPaddingStyle,
                    ...customCornerRadiusStyle,
                }}
                className={containerDivClassNames}
            >
                <div data-test-id="callout-content" className={textDivClassNames}>
                    {iconType !== Icon.None && (
                        <CalloutIcon
                            isActive={hasRichTextValue(blockSettings.textValue)}
                            iconType={iconType}
                            customIcon={customIcon}
                            color={textColor}
                            type={type}
                        />
                    )}
                    <RichTextEditor
                        id={appBridge.getBlockId().toString()}
                        isEditing={isEditing}
                        onTextChange={handleTextChange}
                        placeholder="Type your text here"
                        value={blockSettings.textValue}
                        plugins={plugins}
                    />
                </div>
            </div>
        </div>
    );
};
