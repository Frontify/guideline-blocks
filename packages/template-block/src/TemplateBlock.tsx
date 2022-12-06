/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { ReactElement, useCallback } from 'react';
import 'tailwindcss/tailwind.css';
import {
    BlockProps,
    PreviewType,
    Settings,
    cardPaddingValues,
    cornerRadiusValues,
    textPositioningToFlexDirection,
} from './types';
import { EditorActions, RichTextEditor, Text, merge } from '@frontify/fondue';
import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { Buttons } from './components/Buttons';
import { Preview } from './components/Preview';

const TITLE_ACTIONS = [[EditorActions.TEXT_STYLES], [EditorActions.BOLD, EditorActions.ITALIC]];
const DESCRIPTION_ACTIONS = [
    [EditorActions.TEXT_STYLES],
    [EditorActions.BOLD, EditorActions.ITALIC, EditorActions.UNDERLINE, EditorActions.LINK],
    [
        EditorActions.ALIGN_LEFT,
        EditorActions.ALIGN_CENTER,
        EditorActions.ALIGN_RIGHT,
        EditorActions.ALIGN_JUSTIFY,
        EditorActions.UNORDERED_LIST,
        EditorActions.ORDERED_LIST,
    ],
];

const GAP = '32px';

export const TemplateBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, updateBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const blockId = appBridge.getBlockId().toString();

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

    const onChangeSetting = (key: string, value: string) => {
        updateBlockSettings({ ...blockSettings, [key]: value });
    };

    return (
        <div data-test-id="template-block">
            <div
                className="tw-border tw-border-black-20"
                style={{
                    backgroundColor: hasCardBackgroundColor ? toRgbaString(cardBackgroundColor as Color) : undefined,
                    borderRadius: isCardCornerRadiusCustom
                        ? cardCornerRadiusCustom
                        : cornerRadiusValues[cardCornerRadiusSimple],
                    border: hasCardBorder
                        ? `${cardBorderWidth} ${cardBorderStyle} ${toRgbaString(cardBorderColor as Color)}`
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
                    {hasPreview() && <Preview appBridge={appBridge} />}
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
                                    actions={TITLE_ACTIONS}
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
                                actions={DESCRIPTION_ACTIONS}
                                readonly={!isEditing}
                            />
                        </div>
                        <div className="tw-shrink-0">
                            <Buttons appBridge={appBridge} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
