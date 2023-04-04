/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useDocumentPages } from '@frontify/app-bridge';
import React, { ReactElement } from 'react';

type PageLinksProps = {
    appBridge: AppBridgeBlock;
    documentId: number;
};

export const PageLinks = ({ appBridge, documentId }: PageLinksProps): ReactElement => {
    const { pages } = useDocumentPages(appBridge, documentId);
    const pagesArray = [...pages.values()];

    return (
        <>
            {pagesArray.map((page) => {
                return <div key={page.id}>{page.title}</div>;
            })}
        </>
    );
};
