/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useUncategorizedDocumentPages } from '@frontify/app-bridge';
import { LoadingCircle } from '@frontify/fondue';
import { ReactElement } from 'react';
import { PageLink } from './PageLink';
import { InitiallyExpandedItems } from './types';
import React from 'react';

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
    const { documentPages, isLoading } = useUncategorizedDocumentPages(appBridge, documentId);

    const pagesArray = [...documentPages.values()];
    const hasPages = !isLoading && pagesArray.length > 0;

    if (isLoading) {
        return (
            <div className="tw-flex tw-justify-center tw-p-4">
                <LoadingCircle />
            </div>
        );
    }

    return hasPages ? (
        <>
            {pagesArray.map((page) => {
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
            })}
        </>
    ) : (
        <div className="tw-py-2 tw-px-2.5 tw-pl-7 tw-leading-5 tw-text-s tw-text-text-weak">
            This document does not contain any pages.
        </div>
    );
};
