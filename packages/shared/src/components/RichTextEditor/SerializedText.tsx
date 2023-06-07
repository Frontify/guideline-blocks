/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import { SerializedTextProps } from './types';
import { serializeRawToHtmlAsync } from './serializer';

export const SerializedText = ({ value = '', gap, columns, show = true, plugins }: SerializedTextProps) => {
    const [html, setHtml] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setHtml(await serializeRawToHtmlAsync(value, columns, gap, plugins));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, columns, gap, plugins]);

    if (!show || html === '<br />') {
        return null;
    }

    return html !== null ? (
        <div className="tw-w-full" data-test-id="rte-content-html" dangerouslySetInnerHTML={{ __html: html }} />
    ) : (
        <div className="tw-rounded-sm tw-bg-base-alt tw-animate-pulse tw-h-full tw-min-h-[10px] tw-w-full" />
    );
};
