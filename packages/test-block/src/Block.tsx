import type { FC } from 'react';
import { Color, merge, RichTextEditor, Text } from '@frontify/fondue';
import { useBlockSettings, useBlockTemplates, useEditorState } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { useCallback, useEffect } from 'react';
import {
    PreviewType,
    type Settings,
    cardPaddingValues,
    cornerRadiusValues,
    textPositioningToFlexDirection,
} from './types';

const GAP = '32px';

export const AnExampleBlock: FC<BlockProps> = ({ appBridge }) => {
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

    //TODO: this is quick and dirty alternative for toRgbaString() function which causes the errors while building the block
    //TODO: should be investigated in more depth
    const getRgbaString = (color: Color): string => {
        const redChannel = color.red ?? 0;
        const greenChannel = color.green ?? 0;
        const blueChannel = color.blue ?? 0;
        const alphaChannel = color.alpha ?? 0.0;

        return `rgba(${redChannel}, ${greenChannel}, ${blueChannel}, ${alphaChannel})`;
    };

    // const { blockTemplates } = useBlockTemplates(appBridge);
    //
    // useEffect(() => {
    //     console.log(blockTemplates);
    // }, [blockTemplates]);

    useEffect(() => {
        console.log(hasCardBackgroundColor, cardBackgroundColor);
        // const colorRgba = toRgbaString(cardBackgroundColor);
        if (cardBackgroundColor) {
            console.log(getRgbaString(cardBackgroundColor));
        }
    }, [hasCardBackgroundColor, cardBackgroundColor]);

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
                    {hasPreview() && <span>PREVIEW</span>}
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
                    <div className="tw-shrink-0">
                        <span>BUTTONS</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
