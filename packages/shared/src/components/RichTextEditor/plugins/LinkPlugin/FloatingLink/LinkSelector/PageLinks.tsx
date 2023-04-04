/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useDocumentPages } from '@frontify/app-bridge';
import React, { ReactElement } from 'react';
import { PageLink } from './PageLink';

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
                return <PageLink key={page.id} page={page} appBridge={appBridge} />;
            })}
        </>
    );
};
