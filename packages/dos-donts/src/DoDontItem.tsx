/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { IconApprove, IconRejectCircle, IconSize } from '@frontify/arcade';
import { useEditorState } from '@frontify/app-bridge';
import { DoDontType, DoDontStyle, DoDontContent } from './types';

type ItemProps = {
    itemKey: number;
    type: DoDontType;
    style: DoDontStyle;
    doColor: string;
    dontColor: string;
    saveItem: (key: number, value: string, type: DoDontContent) => void;
    content: { title?: string; body?: string };
};

export const DoDontItem: FC<ItemProps> = ({
    itemKey,
    type,
    style,
    doColor,
    dontColor,
    saveItem,
    content = { title: '', body: '' },
}) => {
    const isEditing = useEditorState();

    const headingStyles: Record<DoDontType, object> = {
        [DoDontType.Do]: { color: doColor },
        [DoDontType.Dont]: { color: dontColor },
    };

    const dividerStyles: Record<DoDontType, object> = {
        [DoDontType.Do]: { backgroundColor: doColor },
        [DoDontType.Dont]: { backgroundColor: dontColor },
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
                            onChange={(event) => saveItem(itemKey, event.target.value, DoDontContent.Title)}
                            placeholder="Add a title"
                            rows={1}
                        >
                            {content.title}
                        </textarea>
                    ) : (
                        <p className="tw-text-current tw-text-m tw-font-bold">{content.title}</p>
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
                        onChange={(event) => saveItem(itemKey, event.target.value, DoDontContent.Body)}
                        placeholder="Add a description"
                    >
                        {content.body}
                    </textarea>
                ) : (
                    <p>{content.body}</p>
                )}
            </div>
        </div>
    );
};
