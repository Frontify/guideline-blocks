/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useDocumentPages } from '@frontify/app-bridge';
import React, { ReactElement } from 'react';
import { InitiallyExpandedItems } from '../../LinkPlugin/FloatingLink/InsertLinkModal/types';
import { PageLink } from './PageLink';

type PageLinksProps = {
    appBridge: AppBridgeBlock;
    documentId: number;
    selectedUrl: string;
    onSelectUrl: (url: string) => void;
    itemsToExpandInitially: InitiallyExpandedItems;
};

export const PageLinks = ({
    appBridge,
    documentId,
    selectedUrl,
    onSelectUrl,
    itemsToExpandInitially,
}: PageLinksProps): ReactElement => {
    const { pages, isLoading } = useDocumentPages(appBridge, documentId);
    const pagesArray = [...pages.values()];
    const hasPages = !isLoading && pagesArray.length > 0;

    if (isLoading) {
        return <></>;
    }

    return (
        <>
            {hasPages ? (
                pagesArray.map((page) => {
                    return (
                        <PageLink
                            key={page.id}
                            page={page}
                            appBridge={appBridge}
                            selectedUrl={selectedUrl}
                            onSelectUrl={onSelectUrl}
                            itemsToExpandInitially={itemsToExpandInitially}
                        />
                    );
                })
            ) : (
                <div className="tw-py-2 tw-px-2.5 tw-pl-7 tw-leading-5 tw-text-s tw-text-text-weak">
                    This document does not contain any pages.
                </div>
            )}
        </>
    );
};
