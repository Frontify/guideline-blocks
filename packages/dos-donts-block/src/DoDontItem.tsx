/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEditorState } from '@frontify/app-bridge';
import { Color, IconApprove, IconRejectCircle, IconSize, RichTextEditor } from '@frontify/arcade';
import { mapRgbaToString } from '@frontify/guideline-blocks-shared';
import { FC, CSSProperties } from 'react';
import { DoDontStyle, DoDontType } from './types';

export type ItemProps = {
    id: number;
    type: DoDontType;
    style: DoDontStyle;
    doColor: Color;
    dontColor: Color;
    saveItem: (id: number, value: string, type: 'title' | 'body') => void;
    title?: string;
    body?: string;
};

export const DoDontItem: FC<ItemProps> = ({ id, type, style, doColor, dontColor, saveItem, title = '', body = '' }) => {
    const isEditing = useEditorState();
    const doColorString = doColor.rgba && mapRgbaToString(doColor.rgba);
    const dontColorString = dontColor.rgba && mapRgbaToString(dontColor.rgba);

    const headingStyles: Record<DoDontType, CSSProperties> = {
        [DoDontType.Do]: { color: doColorString },
        [DoDontType.Dont]: { color: dontColorString },
    };

    const dividerStyles: Record<DoDontType, CSSProperties> = {
        [DoDontType.Do]: { backgroundColor: doColorString },
        [DoDontType.Dont]: { backgroundColor: dontColorString },
    };

    return (
        <div>
            <div style={headingStyles[type]} className="tw-flex tw-items-center tw-font-semibold tw-text-l">
                {style === DoDontStyle.Icons && (
                    <div className="tw-mr-2 tw-w-auto">
                        {type === DoDontType.Do && <IconApprove size={IconSize.Size24} />}
                        {type === DoDontType.Dont && <IconRejectCircle size={IconSize.Size24} />}
                    </div>
                )}
                <div className="tw-w-full">
                    <RichTextEditor
                        value={title}
                        onTextChange={(value) => saveItem(id, value, 'title')}
                        placeholder="Add a title"
                        readonly={!isEditing}
                    />
                </div>
            </div>
            {style === DoDontStyle.Underline && (
                <hr
                    style={dividerStyles[type]}
                    className="tw-w-full tw-mt-4 tw-mb-5 tw-h-1 tw-border-none tw-rounded tw-bg-black-40"
                />
            )}
            <div className="tw-mt-2">
                <RichTextEditor
                    value={body}
                    onTextChange={(value) => saveItem(id, value, 'body')}
                    placeholder="Add a description"
                    readonly={!isEditing}
                />
            </div>
        </div>
    );
};
