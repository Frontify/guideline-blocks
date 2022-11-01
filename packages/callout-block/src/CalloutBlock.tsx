/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { isDark, joinClassNames, radiusStyleMap, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { ICON_ASSET_ID } from './settings';
import { BlockSettings, CalloutBlockProps, Type, Width, alignmentMap, outerWidthMap, paddingMap } from './types';

export const CalloutBlock: FC<CalloutBlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const { designTokens } = useGuidelineDesignTokens();

    const containerDivClassNames = joinClassNames([
        outerWidthMap[blockSettings.width],
        blockSettings.width === Width.HugContents && alignmentMap[blockSettings.alignment],
    ]);

    const getBackgroundColor = (type: Type) => {
        switch (type) {
            case Type.Info:
                return { backgroundColor: designTokens?.callout?.info };
            case Type.Note:
                return { backgroundColor: designTokens?.callout?.note };
            case Type.Tip:
                return { backgroundColor: designTokens?.callout?.tip };
            case Type.Warning:
                return { backgroundColor: designTokens?.callout?.warning };
        }
    };

    const textDivClassNames = joinClassNames([
        'tw-flex tw-items-center',
        isDark(getBackgroundColor(blockSettings.type)) ? 'tw-text-white' : 'tw-text-black',
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

    const onTextChange = (value: string) => setBlockSettings({ textValue: value });

    return (
        <div data-test-id="callout-block" className={containerDivClassNames}>
            <div
                data-test-id="callout-wrapper"
                className={textDivClassNames}
                style={{ ...getBackgroundColor(blockSettings.type), ...customPaddingStyle, ...customCornerRadiusStyle }}
            >
                {blockSettings.iconSwitch && iconUrl && (
                    <span className="tw-mr-3 tw-flex-none tw-w-6 tw-h-6">
                        <img data-test-id="callout-icon" alt="Callout icon" src={iconUrl} />
                    </span>
                )}
                <RichTextEditor
                    onTextChange={onTextChange}
                    readonly={!isEditing}
                    value={blockSettings.textValue}
                    placeholder="Type your text here"
                    designTokens={designTokens ?? undefined}
                />
            </div>
        </div>
    );
};
