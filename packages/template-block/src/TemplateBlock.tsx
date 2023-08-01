/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Template, useBlockSettings, useBlockTemplates, useEditorState } from '@frontify/app-bridge';
// import '@frontify/fondue-tokens/styles';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    PreviewType,
    SETTING_ID,
    Settings,
    cardPaddingValues,
    cornerRadiusValues,
    textPositioningToFlexDirection,
} from './types';
import { Color, RichTextEditor, Text, merge } from '@frontify/fondue';
// import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { getRgbaString } from './utils';
import { Buttons } from './components/Buttons';
import { Preview } from './components/Preview';

const GAP = '32px';

export const TemplateBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, updateBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const isEditing = useEditorState(appBridge);
    const blockId = appBridge.getBlockId().toString();
    const { blockTemplates, updateTemplateIdsFromKey } = useBlockTemplates(appBridge);

    const {
        title,
        description,
        preview,
        isCardPaddingCustom,
        cardPaddingSimple,
        cardPaddingCustomTop,
        cardPaddingCustomLeft,
        cardPaddingCustomRight,
        cardPaddingCustomBottom,
        hasCardBackgroundColor,
        cardBackgroundColor,
        hasCardBorder,
        cardBorderColor,
        cardBorderStyle,
        cardBorderWidth,
        isCardCornerRadiusCustom,
        cardCornerRadiusSimple,
        cardCornerRadiusCustom,
        textPositioning,
        textRatio,
        textAnchoringHorizontal,
        textAnchoringVertical,
    } = blockSettings;

    const hasPreview = useCallback(() => preview !== PreviewType.None, [preview]);
    const flexDirection = hasPreview() ? textPositioningToFlexDirection[textPositioning] : 'row';
    const isRows = useCallback(
        () => hasPreview() && (flexDirection === 'row' || flexDirection === 'row-reverse'),
        [flexDirection, hasPreview]
    );
    const updateSelectedTemplate = useCallback(
        (templates: Template[]) => {
            templates.map((template) => setSelectedTemplate(template));
        },
        [setSelectedTemplate]
    );

    useEffect(() => {
        if (blockTemplates[SETTING_ID]) {
            updateSelectedTemplate(blockTemplates[SETTING_ID]);
        }
    }, [blockTemplates, updateSelectedTemplate]);

    const onChangeSetting = (key: string, value: string) => {
        updateBlockSettings({ ...blockSettings, [key]: value });
    };

    return (
        <div data-test-id="template-block">
            <div
                className="tw-border tw-border-black-20"
                style={{
                    backgroundColor: hasCardBackgroundColor ? getRgbaString(cardBackgroundColor as Color) : undefined,
                    borderRadius: isCardCornerRadiusCustom
                        ? cardCornerRadiusCustom
                        : cornerRadiusValues[cardCornerRadiusSimple],
                    border: hasCardBorder
                        ? `${cardBorderWidth} ${cardBorderStyle} ${getRgbaString(cardBorderColor as Color)}`
                        : 'none',
                    padding: isCardPaddingCustom
                        ? `${cardPaddingCustomTop} ${cardPaddingCustomRight} ${cardPaddingCustomBottom} ${cardPaddingCustomLeft}`
                        : cardPaddingValues[cardPaddingSimple],
                }}
            >
                <div
                    className="tw-flex"
                    style={{
                        flexDirection,
                        gap: GAP,
                        alignItems: isRows() ? textAnchoringHorizontal : textAnchoringVertical,
                    }}
                >
                    {hasPreview() && (
                        <Preview
                            appBridge={appBridge}
                            template={selectedTemplate}
                            onUpdateTemplate={updateTemplateIdsFromKey}
                        />
                    )}
                    <div
                        className={merge(['tw-flex', isRows() && hasPreview() ? 'tw-flex-col' : 'tw-flex-row'])}
                        style={{
                            width: isRows() && hasPreview() ? `${textRatio}%` : '100%',
                            gap: GAP,
                        }}
                    >
                        <div className="tw-grow tw-min-w-0">
                            <div className="tw-mb-2">
                                <RichTextEditor
                                    id={`${blockId}-title`}
                                    value={title}
                                    placeholder={isEditing ? 'Template Name' : undefined}
                                    onTextChange={(value) => onChangeSetting('title', value)}
                                    readonly={!isEditing}
                                />
                                <Text size={'small'}>0 pages</Text>
                            </div>
                            <RichTextEditor
                                id={`${blockId}-description`}
                                value={description}
                                placeholder={
                                    isEditing
                                        ? 'Use default Template description if available, add your own or leave it empty'
                                        : undefined
                                }
                                onTextChange={(value) => onChangeSetting('description', value)}
                                readonly={!isEditing}
                            />
                        </div>
                        <div className="tw-shrink-0">buttons placeholder</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
