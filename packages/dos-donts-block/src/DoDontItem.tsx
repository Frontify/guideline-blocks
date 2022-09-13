/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMarkCircle, IconCrossCircle, IconSize, RichTextEditor } from '@frontify/fondue';
import { joinClassNames, toRgbaString, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { CSSProperties, FC, useMemo } from 'react';
import { DoDontItemProps, DoDontStyle, DoDontType, EditorChild, EditorElement } from './types';

export const DoDontItem: FC<DoDontItemProps> = ({
    id,
    type,
    style,
    doColor,
    dontColor,
    saveItem,
    title = '',
    body = '',
    editing = false,
}) => {
    const doColorString = toRgbaString(doColor);
    const dontColorString = toRgbaString(dontColor);

    const headingStyles: Record<DoDontType, CSSProperties> = {
        [DoDontType.Do]: { color: doColorString },
        [DoDontType.Dont]: { color: dontColorString },
    };

    const dividerStyles: Record<DoDontType, CSSProperties> = {
        [DoDontType.Do]: { backgroundColor: doColorString },
        [DoDontType.Dont]: { backgroundColor: dontColorString },
    };

    const isEmpty = (text: string): boolean => {
        if (text && text !== '') {
            return JSON.parse(text).every((element: EditorElement) => {
                const elementsWithText = element.children.filter((child: EditorChild) => child.text !== '');
                return elementsWithText.length === 0;
            });
        }
        return true;
    };

    const shouldBlurIcon = useMemo(() => isEmpty(title), [title]);

    const { designTokens } = useGuidelineDesignTokens();
    return (
        <div>
            <div
                data-test-id="dos-donts-heading"
                style={headingStyles[type]}
                className="tw-flex tw-items-center tw-font-semibold tw-text-l"
            >
                {style === DoDontStyle.Icons && (editing || !isEmpty(title) || !isEmpty(body)) && (
                    <div
                        data-test-id="dos-donts-icon"
                        className={joinClassNames(['tw-mr-2 tw-w-auto', shouldBlurIcon ? 'tw-opacity-30' : ''])}
                    >
                        {type === DoDontType.Do && <IconCheckMarkCircle size={IconSize.Size24} />}
                        {type === DoDontType.Dont && <IconCrossCircle size={IconSize.Size24} />}
                    </div>
                )}
                <div className="tw-w-full">
                    <RichTextEditor
                        designTokens={designTokens ?? undefined}
                        value={title}
                        onTextChange={(value) => saveItem(id, value, 'title')}
                        placeholder={editing ? 'Add a title' : ''}
                        readonly={!editing}
                    />
                </div>
            </div>
            {style === DoDontStyle.Underline && (
                <hr
                    style={dividerStyles[type]}
                    className="tw-w-full tw-mt-4 tw-mb-5 tw-h-1 tw-border-none tw-rounded tw-bg-black-40"
                />
            )}
            <div data-test-id="dos-donts-content" className={style === DoDontStyle.Icons ? 'tw-mt-3' : 'tw-mt-2'}>
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    value={body}
                    onTextChange={(value) => saveItem(id, value, 'body')}
                    placeholder={editing ? 'Add a description' : ''}
                    readonly={!editing}
                />
            </div>
        </div>
    );
};
