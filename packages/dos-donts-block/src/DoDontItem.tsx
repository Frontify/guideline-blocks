/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { IconApprove, IconRejectCircle, IconSize, Color } from '@frontify/arcade';
import { useEditorState } from '@frontify/app-bridge';
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

    const headingStyles: Record<DoDontType, object> = {
        [DoDontType.Do]: { color: `rgba(${Object.values(doColor.rgba).join(', ')})` },
        [DoDontType.Dont]: { color: `rgba(${Object.values(dontColor.rgba).join(', ')})` },
    };

    const dividerStyles: Record<DoDontType, object> = {
        [DoDontType.Do]: { backgroundColor: `rgba(${Object.values(doColor.rgba).join(', ')})` },
        [DoDontType.Dont]: { backgroundColor: `rgba(${Object.values(dontColor.rgba).join(', ')})` },
    };

    return (
        <div>
            <div style={isEditing ? {} : headingStyles[type]} className="tw-flex">
                {style === DoDontStyle.Icons && (
                    <div className="tw-mr-2 tw-w-auto">
                        {type === DoDontType.Do && <IconApprove size={IconSize.Size24} />}
                        {type === DoDontType.Dont && <IconRejectCircle size={IconSize.Size24} />}
                    </div>
                )}
                <div className="tw-w-full">
                    {isEditing ? (
                        <textarea
                            className="tw-w-full tw-outline-none tw-resize-none tw-text-m tw-font-bold"
                            onChange={(event) => saveItem(id, event.target.value, DoDontContent.Title)}
                            placeholder="Add a title"
                            rows={1}
                        >
                            {title}
                        </textarea>
                    ) : (
                        <p className="tw-text-current tw-text-m tw-font-bold">{title}</p>
                    )}
                </div>
            </div>
            {style === DoDontStyle.Underline && (
                <hr
                    style={isEditing ? {} : dividerStyles[type]}
                    className="tw-w-full tw-mt-4 tw-mb-5 tw-h-1 tw-border-none tw-rounded tw-bg-black-40"
                />
            )}
            <div className="tw-mt-2">
                {isEditing ? (
                    <textarea
                        className="tw-w-full tw-outline-none tw-resize-y"
                        onChange={(event) => saveItem(id, event.target.value, DoDontContent.Body)}
                        placeholder="Add a description"
                    >
                        {body}
                    </textarea>
                ) : (
                    <p>{body}</p>
                )}
            </div>
        </div>
    );
};
