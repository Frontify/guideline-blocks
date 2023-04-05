/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useDocuments } from '@frontify/app-bridge';
import React, { ReactElement, useEffect, useState } from 'react';
import { InitiallyExpandedItems } from '../InsertLinkModal/types';
import { DocumentLink } from './DocumentLink';

type DocumentLinksProps = {
    appBridge: AppBridgeBlock;
    selectedUrl: string;
    onSelectUrl: (url: string) => void;
};

export const DocumentLinks = ({ appBridge, selectedUrl, onSelectUrl }: DocumentLinksProps): ReactElement => {
    const { documents } = useDocuments(appBridge);
    const [itemsToExpandInitially, setItemsToExpandInitially] = useState<InitiallyExpandedItems>({
        documentId: undefined,
        pageId: undefined,
    });
    const documentArray = [...documents.values()];

    useEffect(() => {
        if (selectedUrl && documentArray.length > 0) {
            findLocationOfSelectedUrl().then((it) => {
                setItemsToExpandInitially(it);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [documentArray.length]);

    const findLocationOfSelectedUrl = async () => {
        const itemsToExpand: InitiallyExpandedItems = {
            documentId: undefined,
            pageId: undefined,
        };
        const selectedUrlIsDocument = documentArray.find((document) => document.permanentLink === selectedUrl);
        if (selectedUrlIsDocument) {
            return itemsToExpand;
        }
        for (const document of documentArray) {
            const pages = await appBridge.getDocumentPagesByDocumentId(document.id);
            const pagesArray = [...pages.values()];
            const selectedUrlIsPage = !!pagesArray.find((page) => page.permanentLink === selectedUrl);
            if (selectedUrlIsPage) {
                itemsToExpand.documentId = document.id;
                return itemsToExpand;
            }
            for (const page of pagesArray) {
                const sections = await appBridge.getDocumentSectionsByDocumentPageId(page.id);
                const sectionsArray = [...sections.values()];
                const selectedUrlIsSection = !!sectionsArray.find((section) => section.permanentLink === selectedUrl);
                if (selectedUrlIsSection) {
                    itemsToExpand.documentId = document.id;
                    itemsToExpand.pageId = page.id;
                    return itemsToExpand;
                }
            }
        }
        return itemsToExpand;
    };

    return (
        <>
            {documentArray.map((document) => {
                return (
                    <DocumentLink
                        key={document.id}
                        document={document}
                        appBridge={appBridge}
                        selectedUrl={selectedUrl}
                        onSelectUrl={onSelectUrl}
                        itemsToExpandInitially={itemsToExpandInitially}
                    />
                );
            })}
        </>
    );
};
