/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { RichTextEditor, IconApprove, IconRejectCircle, IconSize, Color } from '@frontify/arcade';
import { useEditorState } from '@frontify/app-bridge';
import { mapRgbaToString } from '@frontify/guideline-blocks-shared';
import { DoDontType, DoDontStyle, DoDontContent } from './types';

export type ItemProps = {
    id: number;
    type: DoDontType;
    style: DoDontStyle;
    doColor: Color;
    dontColor: Color;
    saveItem: (id: number, value: string, type: DoDontContent) => void;
    title?: string;
    body?: string;
};

export const DoDontItem: FC<ItemProps> = ({ id, type, style, doColor, dontColor, saveItem, title = '', body = '' }) => {
    const isEditing = useEditorState();
    const doColorString = mapRgbaToString(doColor.rgba);
    const dontColorString = mapRgbaToString(dontColor.rgba);

    const headingStyles: Record<DoDontType, object> = {
        [DoDontType.Do]: { color: doColorString },
        [DoDontType.Dont]: { color: dontColorString },
    };

    const dividerStyles: Record<DoDontType, object> = {
        [DoDontType.Do]: { backgroundColor: doColorString },
        [DoDontType.Dont]: { backgroundColor: dontColorString },
    };

    return (
        <div>
            <div style={headingStyles[type]} className="tw-flex tw-items-center">
                {style === DoDontStyle.Icons && (
                    <div className="tw-mr-2 tw-w-auto">
                        {type === DoDontType.Do && <IconApprove size={IconSize.Size24} />}
                        {type === DoDontType.Dont && <IconRejectCircle size={IconSize.Size24} />}
                    </div>
                )}
                <div className="tw-w-full">
                    <RichTextEditor
                        value={title}
                        onTextChange={(value) => saveItem(id, value, DoDontContent.Title)}
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
                    onTextChange={(value) => saveItem(id, value, DoDontContent.Body)}
                    placeholder="Add a description"
                    readonly={!isEditing}
                />
            </div>
        </div>
    );
};
