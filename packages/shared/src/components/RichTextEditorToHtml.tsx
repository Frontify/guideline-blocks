/* (c) Copyright Frontify Ltd., all rights reserved. */

import { parseRawValue, serializeRawToHtml } from '@frontify/fondue';
import React from 'react';
import { ReactElement } from 'react';
import { DesignTokenName, TokenValues } from '../hooks';

type RichTextEditorToHtmlProps = {
    columns?: number;
    columnGap?: string;
    designTokens?: Partial<Record<DesignTokenName, TokenValues>> | null;
    content?: string;
};
export const RichTextEditorToHtml = ({
    columns,
    columnGap,
    designTokens,
    content,
}: RichTextEditorToHtmlProps): ReactElement => {
    const rawValue = JSON.stringify(parseRawValue({ raw: content ?? '' }));
    const html = serializeRawToHtml(rawValue, designTokens ?? undefined);
    return (
        <div
            data-test-id="rte-content-html"
            className="tw-relative tw-w-full tw-break-words"
            style={{ columns, columnGap }}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};
