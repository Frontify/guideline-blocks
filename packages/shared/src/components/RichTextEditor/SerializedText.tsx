/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useMemo } from 'react';

import { serializeRawToHtml } from '@frontify/fondue';
import { SerializedTextProps } from './types';

export const SerializedText = ({ value = '', designTokens, gap, columns }: SerializedTextProps) => {
    const html = useMemo(
        () => serializeRawToHtml(value, designTokens, columns, gap),
        [value, designTokens, columns, gap]
    );

    return html !== '<br />' ? (
        <div data-test-id="rte-content-html" dangerouslySetInnerHTML={{ __html: html }} />
    ) : null;
};
