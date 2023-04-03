/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useMemo } from 'react';

import { parseRawValue, serializeRawToHtml } from '@frontify/fondue';

import { SerializedTextProps } from './types';

export const SerializedText = ({ value, designTokens, gap, columns }: SerializedTextProps) => {
    const rawValue = useMemo(() => JSON.stringify(parseRawValue({ raw: value ?? '' })), [value]);
    const html = useMemo(
        () => serializeRawToHtml(rawValue, designTokens, columns, gap),
        [rawValue, designTokens, columns, gap]
    );
    return value ? <div data-test-id="rte-content-html" dangerouslySetInnerHTML={{ __html: html }} /> : <></>;
};
